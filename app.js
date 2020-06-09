const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();

app.get("/", (request, response) => {
  response.sendFile("./index.html", {root: __dirname});
});

app.get("/downloader", (request, response) => {
  response.send(JSON.stringify(request));
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is listening at process.env.PORT (${process.env.PORT || "unknown"}) or port 4000`);
});