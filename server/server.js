const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5002;
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});