const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();

app.listen(process.env.PORT || 4000, () => {
  console.log("Server works (port is 4000)");
});
