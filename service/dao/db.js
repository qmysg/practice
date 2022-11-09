const sequelize = require("./dbConnect");
const todoListModel = require("./model/todoListModel");
//初始化数据库
(async () => {
  await sequelize.sync({ alter: true });
  console.log("数据库准备完成");
})();
