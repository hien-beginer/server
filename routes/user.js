const express = require("express");
const route = express.Router();
const userController = require("../controller/userController");
const checkToken = require("../middleware/checkToken");

route.post("/register", userController.register);
route.post("/login", userController.login);
route.get("/", checkToken, userController.verifyAuth);

module.exports = route;
