export const type = $.COMP;

export const temp = "./o-code-temp.html";

const testlist = [
  {
    name: "o-code",
    path: "o-code",
    folder: 1,
    list: [
      {
        name: "demo.html",
        path: "o-code/demo.html",
      },
      {
        name: "code.js",
        path: "o-code/code.js",
      },
      {
        name: "code2.css",
        path: "o-code/code2.css",
      },
      {
        name: "test-dir",
        folder: 1,
        list: [
          {
            name: "code3.json",
            path: "o-code/test-dir/code3.json",
          },
          {
            name: "code4.md",
            path: "o-code/test-dir/code4.md",
          },
        ],
      },
    ],
  },
];

export default async ({ load }) => {
  return {
    tag: "o-code",
    data: {
      activeName: "Files",
      list: [...testlist],
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
    },
  };
};
