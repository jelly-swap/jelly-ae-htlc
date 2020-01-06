const Deployer = require("aeproject-lib").Deployer;
const EXAMPLE_CONTRACT_PATH = "./contracts/HashTimeLock.aes";
const {
  TESTNET,
  SECRET_KEY,
  COMPILER_URL,
  INVALID,
  ACTIVE,
  WITHDRAWN,
  REFUNDED,
  EXPIRED
} = require("./constants.js");
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
  // it("should deploy contract", async () => {
  //   assert(
  //     instance.address !== "",
  //     `Expected valid hash for address, got ${instance.address} instead`
  //   );
  // });

  // New contract
  // it("should create new contract", async () => {
  //   await instance.new_contract(
  //     ...Object.values(mockNewContract),
  //     { amount: 1000000 }
  //   );

  //   txHash = newContract.hash;
  //   assert(newContract, `Expected new contract object, got ${newContract} instead`);
  // });

  // Get one status
  it("should get one status", async () => {
   await instance.new_contract(
      ...Object.values(mockNewContract),
      { amount: 1000000 }
    );

    const getOneStatus = await instance.get_one_status(id);
    const status = getOneStatus.decodedResult;
    assert(
      status === ACTIVE,
      `Expected ACTIVE, got ${status} instead`
    );
  });

  // Old Stuff

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
