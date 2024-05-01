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
          list: [
            {
              name: "demo.html",
            },
            {
              name: "code.js",
            },
            {
              name: "code2.css",
            },
            {
              name: "test-dir",
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
  };
};
