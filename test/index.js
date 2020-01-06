const Deployer = require("aeproject-lib").Deployer;
const EXAMPLE_CONTRACT_PATH = "./contracts/HashTimeLock.aes";
const { TESTNET, SECRET_KEY, COMPILER_URL } = require("./constants.js");
const { id, secret, invalidSecret, mockNewContract } = require("./mockData.js");

// Unit tests wrapper
describe("HashTimeLock", () => {
  let deployer;
  let instance;

  before(async () => {
    deployer = new Deployer(TESTNET, SECRET_KEY, COMPILER_URL);
  });

  beforeEach(async () => {
    const deployedPromise = deployer.deploy(EXAMPLE_CONTRACT_PATH);
    instance = await Promise.resolve(deployedPromise);
  });

  // Deploy contract
  it("should deploy contract", async () => {
    assert(
      instance.address !== "",
      `Expected valid hash for address, got ${instance.address} instead`
    );
  });

  // New contract
  it("should create new contract", async () => {
    const newContract = await instance.new_contract(
      ...Object.values(mockNewContract),
      { amount: 1000000 }
    );

    // txHash = newContract.logs[0].transactionHash;

    // const contractId = newContract.logs[0].args.id;
    // const contractExists = await contractInstance.contractExists(contractId);
    // assert(contractExists, `Expected true, got ${contractExists} instead`);
  });

  // it("Should check if hamster has been created", async () => {
  //   hamsterName = "C.Hamster";
  //   await instance.createHamster(hamsterName);

  //   let exists = (await instance.nameExists(hamsterName)).decodedResult;

  //   assert.isTrue(exists, "hamster has not been created");
  // });

  // it("Should REVERT if hamster already exists", async () => {
  //   await assert.isRejected(instance.createHamster("C.Hamster"));
  // });

  // it("Should return false if name does not exist", async () => {
  //   hamsterName = "DoesHamsterExists";
  //   let exists = (await instance.nameExists(hamsterName)).decodedResult;

  //   assert.isOk(!exists);
  // });

  // it("Should return true if the name exists", async () => {
  //   hamsterName = "DoesHamsterExists";

  //   await instance.createHamster(hamsterName);

  //   let exists = (await instance.nameExists(hamsterName)).decodedResult;

  //   assert.isOk(exists);
  // });
});
