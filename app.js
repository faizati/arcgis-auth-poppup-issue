const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use((req, res, next) => {
      res.append("Access-Control-Allow-Origin", ["*"]);
        res.append("Access-Control-Allow-Headers", ["Content-Length", "Range"]);
        res.append('Cross-Origin-Opener-Policy', "same-origin");
        res.append('Cross-Origin-Embedder-Policy', "credentialless ");
        res.append('Cross-Origin-Resource-Policy', "cross-origin");
        next();
});

// var corsCallback = function(req, res, next){
//   res.header('Access-Control-Allow-Origin', '*'); 
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Length, Range, Content-Type, Authorization, Content-Length, X-Requested-With');
//   res.header('Cross-Origin-Opener-Policy', 'same-origin');
//   res.header('Cross-Origin-Embedder-Policy', 'require-corp');
//   res.header('Cross-Origin-Resource-Policy', 'cross-origin');
//   next();
// }

// router.options("*", corsCallback);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(express.static('public'));

app.listen(8888);
