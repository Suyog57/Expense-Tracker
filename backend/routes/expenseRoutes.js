const express = require("express");
const expenseRouter = express.Router();
const { getall, add } = require("../controllers/expenseController");

expenseRouter.get("/", getall);
expenseRouter.post("/add", add);

module.exports = expenseRouter;
