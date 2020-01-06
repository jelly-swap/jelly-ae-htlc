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
  EXPIRED,
  SECONDS_IN_ONE_MINUTE
} = require("./constants.js");
const {
  id,
  secret,
  invalidSecret,
  mockNewContract,
  invalidTimestamp
} = require("./mockData.js");

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
  //   assert(newContract, `Expected new contract object, got ${newContract} instead`);
  // });

  // Get one status
  // it("should get one status", async () => {
  //  await instance.new_contract(
  //     ...Object.values(mockNewContract),
  //     { amount: 1000000 }
  //   );

  //   const getOneStatus = await instance.get_one_status(id);
  //   const status = getOneStatus.decodedResult;
  //   assert(
  //     status === ACTIVE,
  //     `Expected ACTIVE, got ${status} instead`
  //   );
  // });

  // Unsuccessful new_contract (invalid expiration time)
  // it("should revert new_contract, because expiration is invalid", async () => {
  //   let error;
  //   const {
  //     outputAmount,
  //     hashLock,
  //     receiverAddress,
  //     outputNetwork,
  //     outputAddress
  //   } = mockNewContract;

  //   try {
  //     await instance.new_contract(
  //       outputAmount,
  //       invalidTimestamp,
  //       hashLock,
  //       receiverAddress,
  //       outputNetwork,
  //       outputAddress,
  //       { value: 1 }
  //     );
  //   } catch (err) {
  //     error = err;
  //   }
  //   assert(
  //     error,
  //     `Expected to revert, function new_contract executed successfully instead`
  //   );
  // });

  // Successful withdraw
  // it("should withdraw", async () => {
  //   await instance.new_contract(...Object.values(mockNewContract), {
  //     amount: 1000000
  //   });

  //   await instance.withdraw(id, secret);

  //   const getOneStatus = await instance.get_one_status(id);
  //   const status = getOneStatus.decodedResult;
  //   assert(status === WITHDRAWN, `Expected WITHDRAWN, got ${status} instead`);
  // });

  // Unsuccessful withdraw (invalid secret)
  it("should revert withdraw, because secret is invalid", async () => {
    let error;

    await instance.new_contract(...Object.values(mockNewContract), {
      amount: 1000000
    });

    try {
      await instance.withdraw(id, invalidSecret);
    } catch (err) {
      error = err;
    }
    assert(
      error,
      `Expected to revert, function withdraw executed successfully instead`
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
