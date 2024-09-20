const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("deBBS Tests", function () {
  async function deployContractFixture() {
    const [owner, addr1, addr2, frontendOwner] = await ethers.getSigners();
    const deBBS = await ethers.deployContract("deBBS");

    const boardTitle = "Test Board";
    const threadTitle = "Test thread";
    const postTitle = "Test post";
    const boardCreationFee = ethers.parseEther("0.01");
    const threadCreationFee = ethers.parseEther("0.001");
    const postCreationFee = ethers.parseEther("0.0001");

    await deBBS.connect(addr1).createBoard("Test board 1", frontendOwner.address, { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test board 2", frontendOwner.address, { value: boardCreationFee });
    await deBBS.connect(addr1).createBoard("Test board 3", frontendOwner.address, { value: boardCreationFee });
    await deBBS.connect(addr1).createThread("Test thread 1", frontendOwner.address, { value: threadCreationFee });
    await deBBS.connect(addr1).createThread("Test thread 2", frontendOwner.address, { value: threadCreationFee });
    await deBBS.connect(addr1).createThread("Test thread 3", frontendOwner.address, { value: threadCreationFee });
    await deBBS.connect(addr1).createPost("Test post 1", frontendOwner.address, { value: postCreationFee });
    await deBBS.connect(addr1).createPost("Test post 2", frontendOwner.address, { value: postCreationFee });
    await deBBS.connect(addr1).createPost("Test post 3", frontendOwner.address, { value: postCreationFee });

    return { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee };
  }

  describe("Board Creation Test", function () {
    it("Should create a board with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await deBBS.connect(addr1).createBoard(boardTitle, frontendOwner.address, { value: boardCreationFee });

      const board = await deBBS.getBoard(3);
      expect(board[1]).to.equal(addr1.address);
      expect(board[2]).to.equal(boardTitle);
    });

    it("Should revert when incorrect fee is sent for creating a board", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const incorrectBoardCreationFee = ethers.parseEther("0.02");
      await expect(deBBS.connect(addr1).createBoard(boardTitle, frontendOwner.address, { value: incorrectBoardCreationFee }))
        .to.be.revertedWith("You should pay correct fee to create a board.");
    });

    it("Should distribute fee to create a board to the frontendOwner if provided", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createBoard(boardTitle, frontendOwner.address, { value: boardCreationFee })
            ).to.changeEtherBalances(
                [addr1, frontendOwner, deBBS],
                [boardCreationFee * -1n, boardCreationFee / 4n, boardCreationFee * 3n / 4n]
            );    
    });

    it("Should not distribute fee to create a board to the frontendOwner if the address is zero", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createBoard(boardTitle, ethers.ZeroAddress, { value: boardCreationFee })
            ).to.changeEtherBalances(
                [addr1, frontendOwner, deBBS],
                [boardCreationFee * -1n, 0n, boardCreationFee]
            );
    });
  });

  describe("Thread Creation Tests", function () {
    it("Should create a thread with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await deBBS.connect(addr1).createThread(threadTitle, frontendOwner.address, { value: threadCreationFee });

      const thread = await deBBS.getThread(3);
      expect(thread[1]).to.equal(addr1.address);
      expect(thread[2]).to.equal(threadTitle);
    });

    it("Should revert when incorrect fee is sent for creating a thread", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const incorrectThreadCreationFee = ethers.parseEther("0.002");
      await expect(deBBS.connect(addr1).createThread(threadTitle, frontendOwner.address, { value: incorrectThreadCreationFee }))
        .to.be.revertedWith("You should pay correct fee to create a thread.");
    });
  });

  describe("Post Creation Tests", function () {
    it("Should create a post with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await deBBS.connect(addr1).createPost(postTitle, frontendOwner.address, { value: postCreationFee });

      const post = await deBBS.getPost(3);
      expect(post[1]).to.equal(addr1.address);
      expect(post[2]).to.equal(postTitle);
    });

    it("Should revert when incorrect fee is sent for creating a post", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const incorrectPostCreationFee = ethers.parseEther("0.0002");
      await expect(deBBS.connect(addr1).createPost(postTitle, frontendOwner.address, { value: incorrectPostCreationFee }))
        .to.be.revertedWith("You should pay correct fee to create a post.");
    });

  });

});