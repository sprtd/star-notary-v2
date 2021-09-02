const Notary = artifacts.require("../contracts/Notary.sol");

module.exports = deployer => {
  deployer.deploy(Notary);
};
