const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");

const { PORT, NODE_ENV } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}.`);
});