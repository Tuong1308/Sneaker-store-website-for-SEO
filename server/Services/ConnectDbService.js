const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connect database succeeded");
  } catch (error) {
    console.log("connect database failed", error);
  }
}

module.exports = connectDatabase;
