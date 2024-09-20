const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("deBBS Tests", function () {
  async function deployContractFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const deBBS = await ethers.deployContract("deBBS");

    const boardCreationFee = ethers.parseEther("0.01");
    const threadCreationFee = ethers.parseEther("0.001");
    const postCreationFee = ethers.parseEther("0.0001");

    await deBBS.connect(addr1).createBoard("Test board 1", { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test board 2", { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test board 3", { value: boardCreationFee });
    await deBBS.connect(addr1).createThread("Test thread 1", { value: threadCreationFee });
    await deBBS.connect(addr1).createThread("Test thread 2", { value: threadCreationFee });
    await deBBS.connect(addr1).createThread("Test thread 3", { value: threadCreationFee });
    await deBBS.connect(addr1).createPost("Test post 1", { value: postCreationFee });
    await deBBS.connect(addr1).createPost("Test post 2", { value: postCreationFee });
    await deBBS.connect(addr1).createPost("Test post 3", { value: postCreationFee });

    return { deBBS, owner, addr1, addr2, boardCreationFee, threadCreationFee, postCreationFee };
  }

  describe("Board Creation Test", function () {
    it("Should create a board with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const boardTitle = "Test Board";
      await deBBS.connect(addr1).createBoard(boardTitle, { value: boardCreationFee });

      const board = await deBBS.getBoard(3);
      expect(board[1]).to.equal(addr1.address);
      expect(board[2]).to.equal(boardTitle);
    });

    it("Should revert when incorrect fee is sent for creating a board", async function () {
      const { deBBS, owner, addr1, addr2, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const boardTitle = "Test Board";
      const incorrectBoardCreationFee = ethers.parseEther("0.02");
      await expect(deBBS.connect(addr1).createBoard(boardTitle, { value: incorrectBoardCreationFee }))
        .to.be.revertedWith("You should pay correct fee to create a board.");
    });
  });

  describe("Thread Creation Tests", function () {
    it("Should create a thread with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const threadTitle = "Test thread";
      await deBBS.connect(addr1).createThread(threadTitle, { value: threadCreationFee });

      const thread = await deBBS.getThread(3);
      expect(thread[1]).to.equal(addr1.address);
      expect(thread[2]).to.equal(threadTitle);
    });

    it("Should revert when incorrect fee is sent for creating a thread", async function () {
      const { deBBS, owner, addr1, addr2, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const threadTitle = "Test thread";
      const incorrectThreadCreationFee = ethers.parseEther("0.002");
      await expect(deBBS.connect(addr1).createThread(threadTitle, { value: incorrectThreadCreationFee }))
        .to.be.revertedWith("You should pay correct fee to create a thread.");
    });
  });

  describe("Post Creation Tests", function () {
    it("Should create a post with correct fee and correct data", async function () {
      
    });

    it("Should revert when incorrect fee is sent for creating a post", async function () {

    });

  });

});