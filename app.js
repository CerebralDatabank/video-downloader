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

app.get("/manifest.webmanifest", (request, response) => {
  response.sendFile("./manifest.webmanifest", {root: __dirname});
});

app.get("/downloader", (request, response) => {
  if (!request.query["video_url"] || !request.query["file_format"] || !request.query["resolution"]) {
    response.status(400).sendFile("./http-400.html", {root: __dirname});
  }
  else {
    let url = request.query["video_url"];
    let fileformat = request.query["file_format"];
    let resolution = request.query["resolution"];
    response.header("Content-Disposition", `attachment; filename="downloaded-video.${fileformat}"`);
    if (resolution == "any") {
      ytdl(url, {quality: "highest", filter: format => (format.container == fileformat)}).pipe(response);
    }
    else {
      ytdl(url, {quality: "highest", filter: format => (format.container == fileformat && format.qualityLabel.startsWith(resolution))}).pipe(response);
    }
  }
});

app.get("/getinfo", (request, response) => {
  if (!request.query["video_url"]) {
    response.status(400).sendFile("./http-400.html", {root: __dirname});
  }
  else {
    ytdl.getInfo(request.query["video_url"], (err, info) => {
      if (err) {
        console.error(err);
      }
      else {
        response.json(info);
      }
    });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is listening at process.env.PORT (${process.env.PORT || "unknown"}) or port 4000`);
});