const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3001;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Send out the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

// Send out the home page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);