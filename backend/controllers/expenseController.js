const Expense = require("../models/expenseModel");
const jwt = require("jsonwebtoken");

const getall = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  //console.log(token)
  const decoded = jwt.verify(token, "123");
  try {
    console.log(decoded);
    const expenses = await Expense.find({ user: decoded.userId });
    return res.json(expenses);
  } catch (err) {
    return res.status(401).json({ error: "Authentication required" });
  }
};

const add = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const { amount, category, description } = req.body;

  const decoded = jwt.verify(token, "123");

  try {
    const expense = new Expense({
      amount,
      category,
      description,
      user: decoded.userId,
    });

    await expense.save();
 
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { getall, add };
