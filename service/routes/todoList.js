var express = require("express");
var router = express.Router();

const {
  todoListServices,
  newTodoServices,
  updateTodoServices,
  deleteTodoServices,
  deleteCompletedTodoServices,
  updateTodoStateServices,
} = require("../services/todoListServices");
//根据分类获取便签
router.get("/", async (req, res, next) => {
  res.send(await todoListServices(req.query.type));
});
//添加便签
router.post("/", async (req, res, next) => {
  res.send(await newTodoServices(req.body));
});

//修改便签
router.put("/:id", async (req, res, next) => {
  res.send(await updateTodoServices(req.params.id, req.body));
});

//修改所有便签的完成状态便签
router.put("/", async (req, res, next) => {
  res.send(await updateTodoStateServices(req.query.type));
});

//删除一个便签
router.delete("/:id", async (req, res, next) => {
  res.send(await deleteTodoServices(req.params.id));
});

//删除已完成的便签
router.delete("/", async (req, res, next) => {
  res.send(await deleteCompletedTodoServices());
});

module.exports = router;
