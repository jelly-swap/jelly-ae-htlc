const { MAXIMUM_UNIX_TIMESTAMP } = require("./constants.js");

// Example mock data
const mockData = {
  id: "f43f26b534f581f46b5a0bd59b6dadf8223719baa9ee03459e31ac9270c49d01",
  secret: "3853485acd2bfc3c632026ee365279743af107a30492e3ceaa7aefc30c2a048a",
  invalidSecret:
    "0x2240404393f4dd5d8757eeb71447c8c675b57ddb2e20edcfc8f6f13857f35a15",
  invalidTimestamp: "1578316539",

  mockNewContract: {
    outputAmount: 5939679548,
    timestamp: 1773653015196,
    hashLock:
      "3c335ba7f06a8b01d0596589f73c19069e21c81e5013b91f408165d1bf623d32",
    receiverAddress: "ak_2mwRmUeYmfuW93ti9HMSUJzCk1EYcQEfikVSzgo6k2VghsWhgU",
    outputNetwork: "TRX",
    outputAddress: "0x9cc7a534cf742cdb9ee16fbf6b5f48a09e485c52"
  }
};

module.exports = mockData;
