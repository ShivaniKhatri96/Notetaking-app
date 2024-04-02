//server.js
const express = require("express");
const mongoose = require("mongoose");
//Body-parser is a middleware for Express.js that simplifies handling of HTTP request bodies
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
//importing user model
const User = require("./models/user");
const Note = require("./models/note");

const app = express();
const port = process.env.PORT || 8000;
// hardcoded secret key used for this project
const SECRET_KEY = 'notetaking_app_key';

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
    // Start the server after connecting to MongoDB
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Define routes
// Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

// Login route to generate token
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if( !user || !password ){
            return res.status(401).json({message: "Invalid username or password"});
        }
        // Generating a JWT token for a user
        const token = jwt.sign({ username: user.username, password: user.password});
        res.json({ token });
    } catch (error) {
        res.status(500).json({message: "Internal server error", error});
    }
})

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
// Get all notes for specific user => add later...

// Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// Delete a note by ID
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      // status code 404 means: not found!!!
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting note" });
  }
});

// update a note by ID
app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;
    // Find the note by ID and update its properties
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true } //Return the updated note
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Error updating note" });
  }
});
