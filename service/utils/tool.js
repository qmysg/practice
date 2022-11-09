//处理数组
module.exports.handleDataPattern = function (dataArr) {
  const arr = [];
  for (const item of dataArr) {
    arr.push(item.dataValues);
  }
  return arr;
};

module.exports.formatResponse = function (data, code = 0, msg = "") {
  return {
    code,
    msg,
    data,
  };
};
