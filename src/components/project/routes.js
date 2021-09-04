const express = require("express");
const ProjectController = require("../project/controller");
const api = express.Router();

api.post("/project/add-project", ProjectController.addProjectController);
api.get("/project/get-all", ProjectController.getAllProjectsController);
api.post("/project/get-project", ProjectController.getProjectController);

module.exports = api;
