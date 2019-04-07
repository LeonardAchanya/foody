require("dotenv").config();  // allows our project read variables from .env files

const express = require("express");

// Enables Cross Origin Resource Sharing for our Project
const cors = require("cors");

// Database ORM for NodeJS
const sequelize = require("./config/database");

const likeRoutes = require("./routes/api/like");
const userRoutes = require("./routes/api/user");
const authRoute = require("./routes/api/auth");


app = express();

// This middleware always runs for all request
// and this present setting allows and domain to 
// access resources (our api) from our site.
app.use(cors());

// This parses all json request so we can access
// its contents via 'req.body' object
app.use(express.json());

app.use("/api/likes", likeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);

// Gets the PORT from the Node env and if it
// does not exists there, set it to 5000
const PORT = process.env.PORT || 5000;


// This activates the db connection and runs any
// initial query required eg Model to db table creation
// sequelize.sync({force:true})
sequelize.sync()
    .then((result) => {
        // this creates a http server and listens for incoming requests
        app.listen(PORT, () => console.log("Started on " + PORT));
    })
    .catch((err) => console.log(err));

