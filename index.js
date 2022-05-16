const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const matchRoute = require("./routes/index");
const cors = require("cors");
const sqlConection = require("./connectSql/connection");
sqlConection.connect();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
matchRoute(app);
const host = "0.0.0.0";
const port = process.env.PORT || 5000;
app.listen(port, host, () => {
  console.log(`listening on port : ${port}`);
});
// ,,
