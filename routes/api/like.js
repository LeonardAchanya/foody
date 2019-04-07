const express = require("express");
const route = express.Router();

const LikeController = require("../../controllers/like");

route.get("/", LikeController.getLikes);
route.post("/:id", LikeController.postLike);

module.exports = route;