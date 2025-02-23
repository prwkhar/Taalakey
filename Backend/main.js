//version main
require('dotenv').config();
const cors = require("cors");

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const dbName = 'tallakey';
const url = process.env.MONGOURI;
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}
connectDB();

// Get all stored passwords
app.get('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

// Save a new password
app.post('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const newPassword = req.body;

    await collection.insertOne(newPassword);

    res.json({ message: "Password saved successfully!", data: newPassword });
  } catch (error) {
    res.status(500).json({ error: "Failed to save password" });
  }
});

//delet a password
app.delete('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const { id } = req.body;
    const result = await collection.deleteOne({ _id: id });

    res.json({ message: "Password deleted successfully!"});
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
