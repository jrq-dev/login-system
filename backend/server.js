const express = require("express");
const path = require("path");
const app = express();

const frontendDir = path.join(__dirname, "../frontend");

app.use(express.static(frontendDir));

app.get(/(.*)/, (req, res) => {
  res.status(404);
  res.sendFile(path.join(frontendDir, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running in ${PORT}`);
});
