export const getListData = async (handle) => {
  const list = [];

  for await (let [name, childHandle] of handle.entries()) {
    if (childHandle.kind === "directory") {
      // const subList = await getListData(childHandle);

      list.push({
        name,
        path: childHandle.path,
        // list: subList,
        list: [],
        folder: "close",
        loaded: false, // 是否读取过这个目录
        _handle: childHandle,
      });
    } else {
      list.push({
        name,
        path: childHandle.path,
        _handle: childHandle,
      });
    }
  }

  return list;
};
