// src/util/get-result-map.ts
function getResultMap(list) {
  return list.reduce((acc, item) => {
    acc[item.taskName] = item;
    return acc;
  }, {});
}

export {
  getResultMap
};
