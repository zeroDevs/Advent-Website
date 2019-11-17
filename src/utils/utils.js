export const parseUrlParams = search => {
  let s = search.replace("?", "").split("&");
  s = typeof s === "string" ? [s] : s;
  return s.reduce((acc, item) => {
    const [name, val] = item.split("=");
    acc[name] = val;
    return acc;
  }, {});
};
