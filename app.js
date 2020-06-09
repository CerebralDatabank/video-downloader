const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const fs = require("fs");

const app = express();
app.disable("x-powered-by");
app.use(cors());

app.get("/", (request, response) => {
  response.sendFile("./index.html", {root: __dirname});
});

app.get("/gogo.css", (request, response) => {
  response.sendFile("./gogo.css", {root: __dirname});
});

app.get("/downloader", (request, response) => {
  if (!request.query["video_url"] || !request.query["file_format"]) {
    response.status(400).send("400 Bad Request");
  }
  else {
    let url = request.query["video_url"];
    let fileformat = request.query["file_format"];
    response.header("Content-Disposition", `attachment; filename="downloaded-video.${fileformat}"`);
    ytdl(url, {format: fileformat}).pipe(response);
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is listening at process.env.PORT (${process.env.PORT || "unknown"}) or port 4000`);
});