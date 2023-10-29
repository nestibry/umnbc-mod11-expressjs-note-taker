const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const databasePath = "db/db.json";

const PORT = 3001;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Send out the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));


// Send out the notes data
app.get('/api/notes', (req, res) => {

    // Read notes from database and send data to requester
    fs.readFile(path.join(__dirname, databasePath), 'utf8', (err, data) => {
        if( err ) return res.status(500).json({status: "error", body: 'Error reading database'});
        const database = JSON.parse(data);
        res.json(database);
    });
});


// Request to add new note to database
app.post("/api/notes", (req, res) => {   
    // Log that a POST request was received
    console.info(`${req.method} request received to add a new note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        const newNote = {
            id: uuidv4(),  // unique string id
            title,
            text,
        };
        
        // Read notes from database and Write newNote to database
        fs.readFile(path.join(__dirname, databasePath), 'utf8', (err, data) => {
            if( err ) return res.status(500).json({status: "error", body: 'Error reading database'});
            let database = JSON.parse(data);
            
            // Write newNote to database
            database.push(newNote);
            fs.writeFile(path.join(__dirname, databasePath), JSON.stringify(database), (err) => {
                if( err ) return res.status(500).json({status: "error", body: 'Error writing to database'} );
                console.log(newNote);
                res.status(200).json({ status: "success", body: newNote});
            });
        });
    } else {
        res.status(500).json({status: "error", body: 'Error posting title and text'});
    }
});


// Send out the home page for all other GET requests
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);