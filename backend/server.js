// import
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
// app.use(
//   cors({
//     origin: "*", // Allow all origins, you can configure this based on your needs
//   })
// );
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
    const name = (req.params.name).toLocaleLowerCase();
    const collection = client.db("GameWord").collection("username");
    const document = await collection.findOne({
      user: name,
    });
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).send("Document not found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving document");
  }
});

// app.post("/api/users/auth", async (req, res) => {
//   try {
//     const nameCheck = req.body.name.toLowerCase();
//     const pin = req.body.pin;
//     const collection = client.db("GameWord").collection("username");
//     const findeName = await collection.find({ name: nameCheck }).toArray();
//     console.log("findeName :", findeName);
//     console.log("pin :", pin);
//     console.log("findeName.pin :", findeName[0].pin);
//     console.log(findeName[0].pin == pin);

//     if (!findeName[0].pin) {
//       console.log("New Account");
//       await collection.updateOne({ name: nameCheck }, { $set: { pin: pin } });
//       res.status(200).send("NewAccount success");
//     } else {
//       if (findeName[0].pin == pin) {
//         console.log("Old Account");
//         res.status(200).send("success");
//       } else {
//         console.log("Wrong");
//         res.status(200).send("wrong");
//       }
//     }
//   } catch (error) {
//     res.status(500).send("Error retrieving document");
//   }
// });

// // Create a new document
// app.post("/api/create", async (req, res) => {
//   try {
//     const newUser = req.body.name;
//     const nameCheck = req.body.name.toLowerCase();
//     const collection = client.db("GameWord").collection("username");
//     const findeName = await collection.find().toArray();
//     const nameList = [];
//     findeName.forEach((user) => {
//       nameList.push(user.name.toLowerCase());
//     });
//     const check = nameList.includes(nameCheck);
//     if (!check) {
//       await collection.insertOne(newUser);
//       res.status(200).json("Created");
//     } else {
//       res.status(200).json("Username is already");
//     }
//   } catch (error) {
//     res.status(500).send("Error creating username :",error.message);
//   }
// });

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
