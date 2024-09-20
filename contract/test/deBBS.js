const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("deBBS Tests", function () {
  async function deployContractFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const deBBS = await ethers.deployContract("deBBS");
    return { deBBS, owner, addr1, addr2 };
  }

  async function deployContractFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const deBBS = await ethers.deployContract("deBBS");
    await deBBS.connect(addr1).createBoard("Test board 1", { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test board 2", { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test board 3", { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test thread 1", { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test thread 2", { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test thread 3", { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test post 1", { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test post 2", { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test post 3", { value: boardCreationFee });

    return { deBBS, owner, addr1, addr2 };
  }

  async function deployContractFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const deBBS = await ethers.deployContract("deBBS");
    return { deBBS, owner, addr1, addr2 };
  }

  describe("Board Creation Test", function () {
    it("Should create a board with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2 } = await loadFixture(deployContractFixture);

      const boardTitle = "Test Board";
      const boardCreationFee = ethers.parseEther("0.01");

      await deBBS.connect(addr1).createBoard(boardTitle, { value: boardCreationFee });

      const board = await deBBS.getBoard(1);
      expect(board[1]).to.equal(addr1.address);
      expect(board[2]).to.equal(boardTitle);
    });

    it("Should revert when incorrect fee is sent for creating a board", async function () {

    });
  });

  describe("Thread Creation Tests", function () {
    it("Should create a thread with correct fee and correct data", async function () {

    });

    it("Should revert when incorrect fee is sent for creating a thread", async function () {
        
    });
  });

  describe("Post Creation Tests", function () {
    it("Should create a post with correct fee and correct data", async function () {
      
    });

    it("Should revert when incorrect fee is sent for creating a post", async function () {

    });

  });

});