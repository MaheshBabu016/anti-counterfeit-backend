const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const verifyRoute = require("./routes/verify");
const registerRoute = require("./routes/register");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", verifyRoute);
app.use("/", registerRoute);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
