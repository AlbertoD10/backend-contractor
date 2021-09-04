const ProjectModel = require("./model");

function addProjectController(req, res) {
  const project = req.body;

  console.log(project);
  ProjectModel.addProject(project, (result) => {
    res.status(result.status).send(result);
  });
}

function getAllProjectsController(req, res) {
  ProjectModel.getAllProjects((result) => {
    res.status(result.status).send(result);
  });
}

function getProjectController(req, res) {
  const data = req.body;

  console.log(data);

  ProjectModel.getProject(data, (result) => {
    res.status(result.status).send(result);
  });
}

module.exports = {
  addProjectController,
  getAllProjectsController,
  getProjectController,
};
