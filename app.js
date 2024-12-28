
const express = require("express");
const app = express();

const multer = require("multer");
const cors = require("cors");
const filupload = require('express-fileupload')

const { testDBConnection } = require("./config/db.config");
const fileUpload = require("express-fileupload");

// Define the port number
const PORT = process.env.PORT || 6002;

app.use(express.json()); 
app.use(filupload());
app.use(cors())







// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

app.use("/user", require("./routes/user.route"));

app.use("/blog", require("./routes/userblog.route"));
testDBConnection();


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
