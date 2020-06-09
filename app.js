const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();

app.get("/", (request, response) => {
  response.sendFile("./index.html", {root: __dirname});
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is listening at process.env.port (${process.env.PORT || "unknown"}) or port 4000`);
});