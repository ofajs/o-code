export const type = $.COMP;

export const temp = "./o-code-temp.html";

export default async ({ load }) => {
  return {
    tag: "o-code",
    data: {
      activeName: "Files",
      list: [
        {
          name: "o-code",
          folder: 1,
          list: [
            {
              name: "demo.html",
            },
            {
              name: "code.js",
            },
            {
              name: "code2.css",
              selected: 1,
            },
            {
              name: "test-dir",
              folder: 1,
              list: [
                {
                  name: "code3.json",
                },
                {
                  name: "code4.md",
                },
              ],
            },
          ],
        },
      ],
    },
    proto: {
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

        if (data.selected) {
          return;
        }

        // 将原来激活的项目都清空
        this.shadow
          .all("ocode-file-item[selected]")
          .forEach(($el) => ($el.__item.$data.selected = null));

        data.selected = 1;
      },
    },
  };
};
