const Notary = artifacts.require("../contracts/Notary.sol");

module.exports = async deployer => {
  try {
    deployer.deploy(Notary);
    const notary = await Notary.deployed()
    console.log('notary contract address: ', notary.address)
  } catch(err) {
    console.log(err)
  }
  
};
