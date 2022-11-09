const {
  todoListDao,
  newTodoDao,
  updateTodoDao,
  deleteTodoDao,
  deleteCompletedTodoDao,
  updateTodoStateDao,
} = require("../dao/todoListDao");
const { handleDataPattern, formatResponse } = require("../utils/tool");
const validate = require("validate.js");

//关于添加数据的判断逻辑
const addBlur = {
  title: {
    presence: {
      allowEmpty: false,
    },
  },
  completed: {
    presence: {
      allowEmpty: false,
    },
    type: "boolean",
  },
};

//根据类型获取不同的便签
module.exports.todoListServices = async function (type) {
  return formatResponse(handleDataPattern(await todoListDao(type)));
};

//添加便签
module.exports.newTodoServices = async function (body) {
  body.completed = body.completed || false;
  const validateResult = validate.validate(body, addBlur);
  if (!validateResult) {
    return formatResponse(await newTodoDao(body));
  } else {
    return formatResponse(validateResult);
  }
};

//修改便签
module.exports.updateTodoServices = async function (id, body) {
  return formatResponse(await updateTodoDao(id, body));
};

//修改所有便签的完成状态便签
module.exports.updateTodoStateServices = async function (type) {
  if (type == null) return;
  return formatResponse(await updateTodoStateDao(type));
};

//删除一个便签
module.exports.deleteTodoServices = async function (id) {
  await deleteTodoDao(id);
  return formatResponse(true);
};

//删除已完成的便签
module.exports.deleteCompletedTodoServices = async function (id) {
  await deleteCompletedTodoDao(id);
  return formatResponse(true);
};
