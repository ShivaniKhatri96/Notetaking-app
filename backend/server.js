//server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;


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

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})