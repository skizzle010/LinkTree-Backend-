const express = require("express")
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})
