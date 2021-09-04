const ContractorModel = require("./model");

function addContractorController(req, res) {
  const data = req.body;

  console.log(data);
  ContractorModel.addContractor(data, (result) => {
    res.status(result.status).send(result);
  });
}

function getAllContractorsController(req, res) {
  ContractorModel.getAllContractors((result) => {
    res.status(result.status).send(result);
  });
}

function getContractorController(req, res) {
  const data = req.body;

  console.log(data);

  ContractorModel.getContractor(data, (result) => {
    res.status(result.status).send(result);
  });
}

module.exports = {
  addContractorController,
  getAllContractorsController,
  getContractorController,
};
