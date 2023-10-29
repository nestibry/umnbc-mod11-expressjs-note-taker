const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const notesData = require('./db/db.json');

const PORT = 3001;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Send out the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

// Send out the notes data
app.get('/api/notes', (req, res) => res.json(notesData));

// Send out the home page for all other GET requests
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);