require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./connect");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const restaurantRoute = require("./routes/restaurant");
const foodRoute = require("./routes/food");
const orderRoute = require("./routes/order");

const app = express();
const PORT = process.env.PORT || 8000;

connectToDb();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/food", foodRoute);
app.use("/api/order", orderRoute);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to the Food Service API project<h1>");
});

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
