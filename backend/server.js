//server.js
const express = require("express");
const mongoose = require("mongoose");
//Body-parser is a middleware for Express.js that simplifies handling of HTTP request bodies
const bodyParser = require("body-parser");
//importing user model
const User = require("./models/user");
const Note = require("./models/note");

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
// I haven't hidden password because it's a free account. Also, I do not want to spend too much time on backend :)
mongoose
  .connect(
    "mongodb+srv://khatrishivani96:p9Nd3Wlxor1dzZcX@cluster0.h7ldigz.mongodb.net/notesdb"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Define routes
// Get all users
app.get("/api/users", async (req, res) => {
  try {
    // Retrieve all users
    const users = await User.find();
    // Send the users as JSON response
    res.json(users);
  } catch {
    res.status(500).json({ error: "Error fetching users" });
  }
});
// Create a new note for a user
app.post("/api/notes", async (req, res) => {
  try {
    console.log(req.body);
    const { title, content } = req.body;
    const userId = "660aed826c6834d27ffb35d5";
    const newNote = new Note({ title, content, user: userId });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating note", error });
  }
});
// Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
