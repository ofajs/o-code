export const type = $.COMP;

export const temp = "./o-code-temp.html";

export default async ({ load }) => {
  return {
    tag: "o-code",
    data: {
      activeName: "Files",
    },
  };
};
