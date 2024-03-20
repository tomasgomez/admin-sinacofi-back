export function replaceEmptyStrings(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] =
      typeof obj[key] === "string" && obj[key] === "" ? "-" : obj[key];
  });
  return newObj;
}
