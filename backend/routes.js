// routes.js
const express = require('express');
const router = express.Router();

// Get a collection from the database
const getCollection = () => db.collection('username'); // Replace 'users' with your collection name

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const result = await getCollection().insertOne(req.body);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Read all users
router.get('/users', async (req, res) => {
  try {
    const users = await getCollection().find({}).toArray();
    console.log("Users :",users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Read a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await getCollection().findOne({ _id: new MongoClient.ObjectId(req.params.id) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const result = await getCollection().updateOne(
      { _id: new MongoClient.ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'User updated' });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const result = await getCollection().deleteOne({ _id: new MongoClient.ObjectId(req.params.id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
