// deep copy function copied from: https://javascript.plainenglish.io/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
export const deepCopy = (obj) => {
  let result;

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  result = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    let value = obj[key];
    result[key] = deepCopy(value);
  }

  return result;
};
