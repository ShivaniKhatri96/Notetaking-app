//server.js
const express = require("express");
const mongoose = require("mongoose");
//Body-parser is a middleware for Express.js that simplifies handling of HTTP request bodies
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
//importing user model
const User = require("./models/user");
const Note = require("./models/note");

const app = express();
const port = process.env.PORT || 8000;
// hardcoded secret key used for this project
const SECRET_KEY = "notetaking_app_key";

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
const extractToken = (authHeader) => {
  if (authHeader && authHeader.startsWith("Bearer")) {
    // Remove the "Bearer" prefix and return the token
    return authHeader.substring(7);
  } else {
    // Handle the case where the header doesn't start with "Bearer"
    return null;
  }
};
//Authentication middleware: to verify jwt token
const authenticateToken = (req, res, next) => {
  const token = extractToken(req.headers.authorization);
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).json({
        message: "Forbidden",
      });
    req.user = user;
    next();
  });
};

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
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // username is unique
    const user = await User.findOne({ username });
    if (!user || !password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Generating a JWT token for a user
    const payload = {
      username: user.username,
      password: user.password,
      userId: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

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
app.post("/api/notes", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    // getting the user ID from 'req'
    const userId = req.user.userId;
    const newNote = new Note({ title, content, user: userId });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating note", error });
  }
});

// Get notes for user that's logged in
app.get("/api/usernotes", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const notes = await Note.find({ user: userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: "Error retrieving notes", error });
  }
});

// Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// Delete a note by ID
app.delete("/api/notes/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const noteId = req.params.id;
    //'Note': MondoDB model
    // findOneAndDelete: Mongoose method to find a single document (note) based on the specified conditions and then deletes it
    // In this case, only the note owner can delete the note
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      user: userId,
    });
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
app.put("/api/notes/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const noteId = req.params.id;
    const { title, content } = req.body;
    // Updating the note if it belongs to the user (note's owner)
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { title, content },
      // this ensures that updated document is returned
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Error updating note" });
  }
});
