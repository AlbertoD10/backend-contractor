const express = require("express");
const ContractorController = require("../contractor/controller");
const api = express.Router();

api.post(
  "/contractor/add-contractor",
  ContractorController.addContractorController
);
api.get(
  "/contractor/get-all",
  ContractorController.getAllContractorsController
);
api.post(
  "/contractor/get-contractor",
  ContractorController.getContractorController
);

module.exports = api;
