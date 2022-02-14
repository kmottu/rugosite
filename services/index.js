const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const db = require("./models");

const PORT = process.env.PORT;

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(cors());

db.mongoose
  .connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connectted to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to rugosite application." });
});

// routes
require("./routes/auth.routes")(app);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`App is listening on ${server.address().port}`);
});