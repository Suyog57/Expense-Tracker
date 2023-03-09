const express = require("express");
const expenseRouter = express.Router();
const { getall, add, deleteExpense,updateExpense, getbyId } = require("../controllers/expenseController");

expenseRouter.get("/", getall);
expenseRouter.get("/:id",getbyId);
expenseRouter.post("/add", add);
expenseRouter.delete("/:id",deleteExpense);
expenseRouter.put("/:id", updateExpense);

module.exports = expenseRouter;
