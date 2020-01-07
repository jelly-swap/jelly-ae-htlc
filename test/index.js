const Deployer = require("aeproject-lib").Deployer;
const CONTRACT_PATH = "./contracts/HashTimeLock.aes";
const MOCK_CONTRACT_PATH = "./mocks/HashTimeLock.aes";

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
const { timeout } = require("./helpers");
// Unit tests wrapper
describe("HashTimeLock", () => {
  let deployer;
  let instance;

  before(async () => {
    deployer = new Deployer(TESTNET, SECRET_KEY, COMPILER_URL);
  });

  beforeEach(async () => {
    const deployedPromise = deployer.deploy(CONTRACT_PATH);
    instance = await Promise.resolve(deployedPromise);
  });

  // // Deploy contract
  // it("should deploy contract", async () => {
  //   assert(
  //     instance.address !== "",
  //     `Expected valid hash for address, got ${instance.address} instead`
  //   );
  // });

  // // New contract
  // it("should create new contract", async () => {
  //   const newContract = await instance.new_contract(
  //     ...Object.values(mockNewContract),
  //     { amount: 1000000 }
  //   );
  //   assert(
  //     newContract,
  //     `Expected new contract object, got ${newContract} instead`
  //   );
  // });

  // // Get one status
  // it("should get one status", async () => {
  //   await instance.new_contract(...Object.values(mockNewContract), {
  //     amount: 1000000
  //   });

  //   const getOneStatus = await instance.get_one_status(id);
  //   const status = getOneStatus.decodedResult;
  //   assert(status === ACTIVE, `Expected ACTIVE, got ${status} instead`);
  // });

  // // Unsuccessful new_contract (invalid expiration time)
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
  //       { amount: 1000000 }
  //     );
  //   } catch (err) {
  //     error = err;
  //   }
  //   assert(
  //     error,
  //     `Expected to revert, function new_contract executed successfully instead`
  //   );
  // });

  // // Successful withdraw
  // it("should withdraw", async () => {
  //   await instance.new_contract(...Object.values(mockNewContract), {
  //     amount: 1000000
  //   });

  //   await instance.withdraw(id, secret);

  //   const getOneStatus = await instance.get_one_status(id);
  //   const status = getOneStatus.decodedResult;
  //   assert(status === WITHDRAWN, `Expected WITHDRAWN, got ${status} instead`);
  // });

  // // Unsuccessful withdraw (invalid secret)
  // it("should revert withdraw, because secret is invalid", async () => {
  //   let error;

  //   await instance.new_contract(...Object.values(mockNewContract), {
  //     amount: 1000000
  //   });

  //   try {
  //     await instance.withdraw(id, invalidSecret);
  //   } catch (err) {
  //     error = err;
  //   }
  //   assert(
  //     error,
  //     `Expected to revert, function withdraw executed successfully instead`
  //   );
  // });

  // // Unsuccessful refund (expiration time hasn't passed)
  // it("should revert refund, because expiration time hasn't passed yet", async () => {
  //   let error;

  //   await instance.new_contract(...Object.values(mockNewContract), {
  //     amount: 1000000
  //   });

  //   try {
  //     await instance.refund(id);
  //   } catch (err) {
  //     error = err;
  //   }
  //   assert(
  //     error,
  //     `Expected to revert, function refund executed successfully instead`
  //   );
  // });
});

// Mock unit tests wrapper
describe("MockHTL", () => {
  let deployer;
  let instance;

  before(async () => {
    deployer = new Deployer(TESTNET, SECRET_KEY, COMPILER_URL);
  });

  beforeEach(async () => {
    const deployedPromise = deployer.deploy(MOCK_CONTRACT_PATH);
    instance = await Promise.resolve(deployedPromise);
  });

  // Successful refund
  it("should refund", async () => {
    const res = await instance.get_timestamp();
    const timestamp = res.decodedResult;

    const {
      outputAmount,
      hashLock,
      receiverAddress,
      outputNetwork,
      outputAddress
    } = mockNewContract;
    const nc = await instance.new_contract(
      outputAmount,
      timestamp + 10000,
      hashLock,
      receiverAddress,
      outputNetwork,
      outputAddress,
      { amount: 1000000 }
    );

    const contractId = nc.decodedResult.id;

    await timeout(10000);
    await instance.refund(contractId);
    const getOneStatus = await instance.get_one_status(contractId);
    const status = getOneStatus.decodedResult;
    assert(status === REFUNDED, `Expected REFUNDED, got ${status} instead`);
  });
});
