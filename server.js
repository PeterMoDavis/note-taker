// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//gets the landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//gets the notes page after pushing the landing page button
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uniqid();
  console.log(newNote);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    var json = JSON.parse(data);
    json.push(newNote);
    json.forEach((note) => {
      console.log(note);
      console.log(uniqid());
    });
    fs.writeFile("./db/db.json", JSON.stringify(json), (err, result) => {
      if (err) {
        throw err;
      }
    });
  });
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    var json = JSON.parse(data);
    console.log(json);
    let newArr = json.filter((note) => {
      return note.id !== id;
    });
    console.log(newArr);
    fs.writeFile("./db/db.json", JSON.stringify(newArr), (err, results) => {
      if (err) {
        throw err;
      }
    });
  });
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
