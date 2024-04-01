//server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;

//importing user model
const User = require('./models/user');

// MongoDB connection
// I haven't hidden password because it's a free account. Also, I do not want to spend too much time on backend :)
mongoose.connect('mongodb+srv://khatrishivani96:p9Nd3Wlxor1dzZcX@cluster0.h7ldigz.mongodb.net/notesdb').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB:', err);
})

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/users', async(req, res) => {
    try{
        // Retrieve all users
        const users = await User.find();
        // Send the users as JSON response
        res.json(users);
    } catch {
        res.status(500).json({"error" : "Error fetching users"});
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})