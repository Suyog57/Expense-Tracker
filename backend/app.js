const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", router);
app.use("/expense", expenseRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
