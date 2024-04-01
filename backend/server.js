//server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})