const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
  id: {
    unique: true,
    type: String,
  },
  projectName: String,
  institution: String,
  direction: String,
  totalInvertion: Number,
  startDate: Date,
  finishDate: Date,
  projectCode: String,
  province: String,
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

function addProject(data, callback) {
  let Project = new ProjectModel(data);

  Project.save((err, userData) => {
    if (err) {
      if (err.code === 11000) {
        callback({ message: "Este proyecto ya está registrado", status: 409 });
      } else {
        console.log(err.code);
        callback({ message: "Ha ocurrido un error", status: 500 });
      }
    } else {
      if (!userData) {
        callback({
          message: "Error, intente nuevamente",
          status: 404,
        });
      } else {
        callback({ message: "Proyecto agregado correctamente", status: 200 });
      }
    }
  });
}

function getAllProjects(callback) {
  ProjectModel.find({})
    .sort({ order: "asc" })
    .exec((err, allProjects) => {
      if (err) {
        callback({
          message: "Ha ocurrido un error en el servidor",
          status: 500,
        });
      } else {
        if (!allProjects) {
          callback({
            message: "No se han encontrado proyectos",
            status: 404,
          });
        } else {
          callback({
            projects: allProjects,
            status: 200,
          });
        }
      }
    });
}

function getProject(project, callback) {
  ProjectModel.find(project, (err, projectStored) => {
    console.log(project);
    if (err) {
      console.log(err);
      callback({ message: "Ha ocurrido un error", status: 500 });
    } else {
      if (!projectStored) {
        callback({ message: "Proyecto no encontrado", status: 404 });
      } else {
        callback({ projectStored, status: 200 });
      }
    }
  });
}

module.exports = {
  addProject,
  getAllProjects,
  getProject,
};
