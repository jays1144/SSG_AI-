const express = require("express");
const app = express();
const router = require("./router/router");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);
app.listen(3001);
