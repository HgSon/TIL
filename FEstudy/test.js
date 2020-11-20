const testa = { a: 12, b: 21315, c: 324 };
function stringCss(object) {
  let result = "";
  Object.keys(object).map((key) => {
    result += `${key}:`;
    result += `${object[key]}`;
    return result;
  });
}
