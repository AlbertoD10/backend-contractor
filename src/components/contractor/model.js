const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractorSchema = Schema({
  companyName: String,
  contratado: Number,
  pagado: Number,
  porPagar: Number,
});

const ContractorModel = mongoose.model("Contractor", ContractorSchema);

function addContractor(data, callback) {
  let Contractor = new ContractorModel(data);

  Contractor.save((err, userData) => {
    if (err) {
      if (err.code === 11000) {
        callback({
          message: "Campo ya registrado",
          status: 409,
        });
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
        callback({ message: "Agregado correctamente", status: 200 });
      }
    }
  });
}

function getAllContractors(callback) {
  ContractorModel.find({})
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
            message: "No se ha encontrado la información",
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

function getContractor(project, callback) {
  ContractorModel.find(project, (err, projectStored) => {
    console.log(project);
    if (err) {
      console.log(err);
      callback({ message: "Ha ocurrido un error", status: 500 });
    } else {
      if (!projectStored) {
        callback({ message: "Información no encontrada", status: 404 });
      } else {
        callback({ projectStored, status: 200 });
      }
    }
  });
}

module.exports = {
  addContractor,
  getAllContractors,
  getContractor,
};
