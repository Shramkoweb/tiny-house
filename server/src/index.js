const express = require("express");

const PORT = 9000;

const app = express();

app.get("/", ((req, res) => {
  return res.send("Hello world!");
}));

app.listen(PORT, () => console.log(`app: http://localhost:${PORT}`));
