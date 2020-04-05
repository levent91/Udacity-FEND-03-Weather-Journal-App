// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require("express"); //dependencies
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
//Body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("website"));

const port = 8080;

app.get("/api/project", (req, res) => {
  //get and post requests
  res.send(projectData);
});

app.post("/api/project", (req, res) => {
  const { date, temp, content } = req.body;
  projectData[date] = {
    temp,
    content,
  };
  res.send();
});

app.listen(port, () => {
  console.log("Running server on port " + port);
});
