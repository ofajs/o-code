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

        // 将原来激活的项目都清空
        this.shadow
          .all("ocode-file-item[selected]")
          .forEach(($el) => ($el.__item.$data.selected = null));

        data.selected = 1;
      },
      clickItem(data, event) {
        event.stopPropagation();

        data.selected = 1;

        if (!data.list) {
          this.selectedFilePath = data.path;

          // 不在tabs上就直接添加
          if (!this.tabs.find((e) => e.path === this.selectedFilePath)) {
            this.tabs.push({
              name: data.name,
              path: data.path,
            });
          }
        }
      },
    },
  };
};
