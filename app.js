const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();

app.get("/", (request, response) => {
  response.sendFile("index.html");
});