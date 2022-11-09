//链接数据库
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pracitce_memo-project", "root", "@9527", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
