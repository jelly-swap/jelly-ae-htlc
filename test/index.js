const Deployer = require("aeproject-lib").Deployer;
const EXAMPLE_CONTRACT_PATH = "./contracts/ExampleContract.aes";

describe("Example Contract", () => {
  let deployer;
  let instance;
  let hamsterName;

  before(async () => {
    deployer = new Deployer(
      "testnet",
      "fb65e4673da53618d7ef4d28d8a2b06f1bf52f979ac1a1e9cc47e90713c751356635f86662a34aa89f95eeddada748b3cb930634e8122f0b01997aea9d63d893",
      "https://compiler.aepps.com"
    );
  });

  it("Deploying Example Contract", async () => {
    const deployedPromise = deployer.deploy(EXAMPLE_CONTRACT_PATH); // Deploy it

    await assert.isFulfilled(
      deployedPromise,
      "Could not deploy the ExampleContract Smart Contract"
    ); // Check whether it's deployed
    instance = await Promise.resolve(deployedPromise);
  });

  it("Should check if hamster has been created", async () => {
    hamsterName = "C.Hamster";
    await instance.createHamster(hamsterName);

    let exists = (await instance.nameExists(hamsterName)).decodedResult;

    assert.isTrue(exists, "hamster has not been created");
  });

  it("Should REVERT if hamster already exists", async () => {
    await assert.isRejected(instance.createHamster("C.Hamster"));
  });

  it("Should return false if name does not exist", async () => {
    hamsterName = "DoesHamsterExists";
    let exists = (await instance.nameExists(hamsterName)).decodedResult;

    assert.isOk(!exists);
  });

  it("Should return true if the name exists", async () => {
    hamsterName = "DoesHamsterExists";

    await instance.createHamster(hamsterName);

    let exists = (await instance.nameExists(hamsterName)).decodedResult;

    assert.isOk(exists);
  });
});
