const express = require("express");
const app = express();
const path = require("path");

// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Headers", ["Content-Length", "Range"]);
//   res.append("Cross-Origin-Opener-Policy", "same-origin");
//   res.append("Cross-Origin-Embedder-Policy", "credentialless");
//   res.append("Cross-Origin-Resource-Policy", "cross-origin");
//   next();
// });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.use(express.static("public"));

app.listen(8888);
