const mongoose = require("mongoose");
const url =
  "mongodb+srv://white:NO7XrS3PuyIfohm5@cluster0.zxzpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
    console.log("connecting...");
    await mongoose.connect(url, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("connect success !");
  } catch (error) {
    console.log("Will Error");
    console.log("Error ! :", error.message);
  }
};

module.exports = connectDB;
