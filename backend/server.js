// import
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors"); // Import the cors middleware
const passHash = require("./passwordHash");
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins, you can configure this based on your needs
  })
);
// MongoDB URI and client
const uri =
  "mongodb+srv://nantakornthidee:BsmYumujmmRRrCwd@gameword.zxzpg.mongodb.net/?retryWrites=true&w=majority&appName=GameWord";

// Connect MongoDB With mongodb Lib
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);

// Get all users
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
    res.status(500).send("Error retrieving users :", error);
  }
});

// // Get a single document by ID
app.get("/api/users/:name", async (req, res) => {
  try {
    const users = req.params.name.toLocaleLowerCase();
    const collection = client.db("GameWord").collection("username");
    const username = await collection.findOne({
      name: { $regex: `^${users}$`, $options: "i" },
    });
    if (username) {
      res.status(200).json(username);
    } else {
      res.status(404).send("username not found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving username");
  }
});

// Create user
app.post("/api/create", async (req, res) => {
  try {
    const newUser = req.body;
    const lowerCaseName = req.body.name.toLowerCase();
    const collection = client.db("GameWord").collection("username");
    const username = await collection.findOne({
      name: { $regex: `^${lowerCaseName}$`, $options: "i" },
    });
    if (!username) {
      await collection.insertOne(newUser);
      res.status(200).json("Created");
    } else {
      res.status(200).json(username.name);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error creating username: ${error.message}` });
  }
});

app.post("/api/users/auth", async (req, res) => {
  try {
    const hash = req.body.hash;
    const user = req.body.name;
    const userLower = req.body.name.toLowerCase();
    const pin = req.body.pin;
    const pinHash = await passHash.hashPassword(pin); // Hash password
    const collection = client.db("GameWord").collection("username");
    const username = await collection.findOne({
      name: { $regex: `^${userLower}$`, $options: "i" },
    });

    if (hash) {
      console.log("Have hash");

      res.status(200).send("Check Token");
    } else {
      if (!username.pin) {
        await collection.updateOne({ name: user }, { $set: { pin: pinHash } });
        const username = await collection.findOne({
          name: { $regex: `^${userLower}$`, $options: "i" },
        });
        console.log("New Account :",username);
        res.status(200).send({"token":`${pinHash}`,"message":"NewAccount success"});
      }
      else {
        const userPassword = await collection.findOne({
          name: { $regex: `^${userLower}$`, $options: "i" },
        });
        const verify = await passHash.verifyPassword(userPassword.pin,pin)
        
        if (verify) {
          console.log("Old Account");
          res.status(200).json({"token":`${userPassword.pin}`,"message":"success"});
        } else {
          console.log("Wrong");
          res.status(200).send("wrong");
        }
      }
    }
  } catch (error) {
    res.status(500).send("Error retrieving document");
  }
});

// // Update a username by ID
// app.put("/api/users/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updatedUsername = req.body;
//     const collection = client.db("GameWord").collection("username");
//     const result = await collection.updateOne(
//       { _id: new MongoClient.ObjectId(id) },
//       { $set: updatedUsername }
//     );
//     if (result.modifiedCount > 0) {
//       res.status(200).send("Username updated");
//     } else {
//       res.status(404).send("Username not found");
//     }
//   } catch (error) {
//     res.status(500).send("Error updating username");
//   }
// });

// // Delete a username by ID
// app.delete("/api/users/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const collection = client.db("GameWord").collection("username");
//     const result = await collection.deleteOne({
//       _id: new MongoClient.ObjectId(id),
//     });
//     if (result.deletedCount > 0) {
//       res.status(200).send("Username deleted");
//     } else {
//       res.status(404).send("Username not found");
//     }
//   } catch (error) {
//     res.status(500).send("Error deleting username");
//   }
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
