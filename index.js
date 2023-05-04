const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const cookieParser = require("cookie-parser");
const dashRoute = require('./routes/dashboard')
const handleRoute = require('./routes/[handle]')

dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use("/api", authRoute);
app.use("/data/",dashRoute);
app.use("/get/",handleRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
