const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
// const uri =
//   "mongodb+srv://nantakornthidee:RULu0pjtRFSg9KAl@gameword.zxzpg.mongodb.net/?retryWrites=true&w=majority&appName=GameWord";
const uri =
  "mongodb+srv://nantakornthidee:BsmYumujmmRRrCwd@gameword.zxzpg.mongodb.net/?retryWrites=true&w=majority&appName=GameWord";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  try {
    res.status(200).send("api connected");
  } catch (error) {
    res.status(500).send("Error :", error);
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const collection = client.db("GameWord").collection("username");
    const users = await collection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error retrieving users :", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
