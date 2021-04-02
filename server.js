const express = require("express");
const path = require("path");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hey there bad dog");
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
