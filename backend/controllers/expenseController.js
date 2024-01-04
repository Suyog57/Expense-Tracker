const Expense = require("../models/expenseModel");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const getall = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const query = req.query;
  const search = new RegExp(query, "i");
  console.log(search + "wtf");

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  const decoded = jwt.verify(token, jwtSecret);
  try {
    const expenses = await Expense.find(
      { user: decoded.user },
      $or[({ category: search }, { amount: search }, { description: search })]
    );
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

  const decoded = jwt.verify(token, jwtSecret);

  try {
    const expense = new Expense({
      amount,
      category,
      description,
      user: decoded.user,
    });

    await expense.save();

    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteExpense = async (req, res) => {
  const id = req.params.id;

  let expense;
  try {
    expense = await Expense.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!expense) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};

const updateExpense = async (req, res) => {
  const id = req.params.id;
  const { amount, description, category } = req.body;

  let expense;
  try {
    expense = await Expense.findByIdAndUpdate(id, {
      amount,
      description,
      category,
    });
  } catch (err) {
    console.log(err);
  }

  if (!expense) {
    return res.status(500).json({ message: "Unable To Update The Blog" });
  }
  return res.status(200).json({ expense });
};

const getbyId = async (req, res) => {
  const id = req.params.id;
  let expense;
  try {
    expense = await Expense.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!expense) {
    return res.status(500).json({ message: "Unable to find" });
  }

  return res.status(200).json({ expense });
};

module.exports = { getall, add, deleteExpense, updateExpense, getbyId };
