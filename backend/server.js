const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
let client;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const uri = process.env.MONGODB_CONNECT_URL;

async function connectToDatabase() {
  try {
    client = new MongoClient(uri, {
      serverApi: ServerApiVersion.v1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsInsecure: false,
    });
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
}

app.get("/", async (req, res) => {
  try {
    res.status(200).send("API connected");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const collection = client.db("GameWord").collection("username");
    const users = await collection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(`Error retrieving users: ${error.message}`);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const collection = client.db("GameWord").collection("username");
    const document = await collection.findOne({ _id: new ObjectId(id) });
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).send("Document not found");
    }
  } catch (error) {
    res.status(500).send(`Error retrieving document: ${error.message}`);
  }
});

app.post("/api/users/auth", async (req, res) => {
  try {
    const nameCheck = req.body.name.toLowerCase();
    const pin = req.body.pin;
    const collection = client.db("GameWord").collection("username");
    const findeName = await collection.find({ name: nameCheck }).toArray();
    
    if (!findeName[0]?.pin) {
      await collection.updateOne({ name: nameCheck }, { $set: { pin: pin } });
      res.status(200).send("NewAccount success");
    } else {
      if (findeName[0].pin === pin) {
        res.status(200).send("Success");
      } else {
        res.status(400).send("Wrong PIN");
      }
    }
  } catch (error) {
    res.status(500).send(`Error authenticating: ${error.message}`);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = req.body;
    const nameCheck = req.body.name.toLowerCase();
    const collection = client.db("GameWord").collection("username");
    const findeName = await collection.find().toArray();
    const nameList = findeName.map(user => user.name.toLowerCase());
    
    if (!nameList.includes(nameCheck)) {
      await collection.insertOne(newUser);
      res.status(201).json("Created");
    } else {
      res.status(409).json("Username already exists");
    }
  } catch (error) {
    res.status(500).send(`Error creating username: ${error.message}`);
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUsername = req.body;
    const collection = client.db("GameWord").collection("username");
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedUsername });
    
    if (result.modifiedCount > 0) {
      res.status(200).send("Username updated");
    } else {
      res.status(404).send("Username not found");
    }
  } catch (error) {
    res.status(500).send(`Error updating username: ${error.message}`);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const collection = client.db("GameWord").collection("username");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount > 0) {
      res.status(200).send("Username deleted");
    } else {
      res.status(404).send("Username not found");
    }
  } catch (error) {
    res.status(500).send(`Error deleting username: ${error.message}`);
  }
});

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(console.error);
