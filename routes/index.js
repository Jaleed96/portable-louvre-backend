const express = require("express");
const BigQuery = require("../controllers/bigquery.js");

const routes = express.Router();
const artRoute = express.Router();

module.exports = routes