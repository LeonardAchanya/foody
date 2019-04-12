require("dotenv").config(); // allows our project read variables from .env files
const path = require("path");
const express = require("express");

// Enables Cross Origin Resource Sharing for our Project
const cors = require("cors");

// Database ORM for NodeJS
const sequelize = require("./config/database");

const likeRoutes = require("./routes/api/like");
const categoryRoute = require("./routes/api/category");
const recipeRoute = require("./routes/api/recipe");
const userRoutes = require("./routes/api/user");
const authRoute = require("./routes/api/auth");


// Models
const Recipe = require("./models/recipe");
const Category = require("./models/category");
const User = require("./models/users");

app = express();

// This middleware always runs for all request
// and this present setting allows and domain to 
// access resources (our api) from our site.
app.use(cors());

// Create a static directory for our uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// This parses all json request so we can access
// its contents via 'req.body' object
app.use(express.json());

app.use("/api/likes", likeRoutes);
app.use("/api/category", categoryRoute);
app.use("/api/recipe", recipeRoute);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);

// Gets the PORT from the Node env and if it
// does not exists there, set it to 5000
const PORT = process.env.PORT || 5000;


// Associations for our models
User.hasMany(Recipe, { foreignKey: "userId" });
Recipe.belongsTo(User, { as: "user", onDelete: "CASCADE" });
Recipe.belongsTo(Category, { as: "category", onDelete: "CASCADE" });


// This activates the db connection and runs any
// initial query required eg Model to db table creation
// sequelize.sync({force:true})
sequelize.sync()
    .then((result) => {
        // this creates a http server and listens for incoming requests
        app.listen(PORT, () => console.log("Started on " + PORT));
    })
    .catch((err) => console.log(err));