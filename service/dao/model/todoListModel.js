const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

module.exports = sequelize.define(
  "todoList",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);
