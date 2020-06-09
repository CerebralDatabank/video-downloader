const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();

app.get("/", (request, response) => {
  response.sendFile("index.html");
});

app.listen(process.env.port || 4000, () => {
  console.log("Server is listening at default port or port 4000");
});