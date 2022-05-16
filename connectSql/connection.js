require("dotenv").config();
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gkzod.mongodb.net/doan?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("success");
  } catch (error) {
    console.log("error");
  }
}

module.exports = { connect };
