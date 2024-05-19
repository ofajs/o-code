export const type = $.COMP;

import { getListData } from "./util.js";

export default async ({ load }) => {
  const { get } = await load("@nos/core/fs/local/main.js");

  return {
    tag: "o-code",
    data: {
      activeName: "Files",
      list: [],
      tabs: [],
      selectedFilePath: "",
    },
    proto: {
      clickTab(data) {
        this.selectedFilePath = data.path;
      },
      dblclickItem(data, event) {
        event.stopPropagation();

        if (!data.list) {
          this.selectedFilePath = data.path;

          const exitedTab = this.tabs.find(
            (e) => e.path === this.selectedFilePath
          );

          // 不在tabs上就直接添加
          if (!exitedTab) {
            this.tabs.push({
              name: data.name,
              path: data.path,
            });
          } else {
            exitedTab.notResident = null;
          }
        }
      },
      clickTabClose(event) {
        const index = this.tabs.findIndex((e) => e.path === event.data.path);

        if (index > -1) {
          this.tabs.splice(index, 1);

          if (this.tabs[index]) {
            this.selectedFilePath = this.tabs[index].path;
          } else if (this.tabs.length) {
            this.selectedFilePath = this.tabs.slice(-1)[0].path;
          } else {
            this.selectedFilePath = "";
          }
        }
      },
      clickItem(data, event) {
        event.stopPropagation();

        if (!data.list) {
          this.selectedFilePath = data.path;

          const exitedTab = this.tabs.find(
            (e) => e.path === this.selectedFilePath
          );

          if (!exitedTab) {
            // 查看是否有未常驻的，有的哈修改未常驻
            const notResTab = this.tabs.find((e) => e.notResident);
            if (notResTab) {
              notResTab.name = data.name;
              notResTab.path = data.path;
            } else {
              this.tabs.push({
                name: data.name,
                path: data.path,
                notResident: 1, // 未常驻的状态
              });
            }
          }
        }
      },
      // 初始化项目
      initProject(packageData) {
        this.list = packageData.list;

        let targetItem = null;

        const findItem = (list, path) => {
          return list.find((e) => {
            if (e.list) {
              return findItem(e.list, path);
            }

            if (e.path === path) {
              targetItem = e;
              return true;
            }

            return false;
          });
        };

        findItem(packageData.list, packageData.defaultSelectedPath);

        if (targetItem) {
          this.tabs.push({
            name: targetItem.name,
            path: targetItem.path,
          });

          this.selectedFilePath = packageData.defaultSelectedPath;
        }
      },
    },
    async ready() {
      // 读取目标目录
      const searchParams = new URLSearchParams(location.search);

      const needOpen = searchParams.get("open");

      if (needOpen) {
        // 打开本地目录
        const targetFolder = await get(needOpen);

        const list = await getListData(targetFolder);

        this.initProject({
          defaultSelectedPath: "",
          list: [
            {
              name: targetFolder.name,
              path: targetFolder.name,
              loaded: true,
              folder: "open",
              list,
            },
          ],
        });
        return;
      }

      // this.initProject(testPackageData);
      this.initProject({
        defaultSelectedPath: "",
        list: [],
      });
    },
  };
};
