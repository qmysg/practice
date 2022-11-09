const todoListModel = require("./model/todoListModel");
//根据类型获取不同的便签
module.exports.todoListDao = async function (type) {
  if (type === "active") {
    return await todoListModel.findAll({
      where: {
        completed: false,
      },
    });
  } else if (type === "completed") {
    return await todoListModel.findAll({
      where: {
        completed: true,
      },
    });
  } else {
    return await todoListModel.findAll();
  }
};

//添加便签
module.exports.newTodoDao = async function (body) {
  const { dataValues } = await todoListModel.create(body);
  return dataValues;
};

//修改便签
module.exports.updateTodoDao = async function (id, body) {
  await todoListModel.update(body, {
    where: {
      id,
    },
  });
  const data = await todoListModel.findByPk(id);
  if (data && data.dataValues) {
    return dataValues;
  }
  return "没有该便签的信息";
};

//修改所有便签的完成状态便签
module.exports.updateTodoStateDao = async function (type) {
  await todoListModel.update(
    {
      completed: type,
    },
    {
      where: {},
    }
  );
  return await todoListModel.findAll();
};

//删除一个便签
module.exports.deleteTodoDao = async function (id) {
  await todoListModel.destroy({
    where: {
      id,
    },
  });
};

//删除已完成的便签
module.exports.deleteCompletedTodoDao = async function () {
  await todoListModel.destroy({
    where: {
      completed: true,
    },
  });
};
