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

    await deBBS.connect(owner).createBoard("Test board 1", frontendOwner.address, { value: boardCreationFee });
    await deBBS.connect(owner).createThread(0, "Test thread 1", frontendOwner.address, { value: threadCreationFee });
    await deBBS.connect(owner).createPost(0, "Test post 1", frontendOwner.address, { value: postCreationFee });

    return { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee };
  }

  describe("Board Creation Test", function () {
    it("Should create a board with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await deBBS.connect(addr1).createBoard(boardTitle, frontendOwner.address, { value: boardCreationFee });

      const board = await deBBS.getBoard(1);
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

      await deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee });

      const thread = await deBBS.getThread(1);
      expect(thread[1]).to.equal(addr1.address);
      expect(thread[2]).to.equal(threadTitle);
    });

    it("Should revert when incorrect fee is sent for creating a thread", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const incorrectThreadCreationFee = ethers.parseEther("0.002");
      await expect(deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: incorrectThreadCreationFee }))
        .to.be.revertedWith("You should pay correct fee to create a thread.");
    });

    it("Should distribute fee to create a thread to the frontendOwner if provided", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee })
        ).to.changeEtherBalances(
          [addr1, owner, frontendOwner, deBBS],
          [threadCreationFee * -1n, threadCreationFee / 2n, threadCreationFee / 4n, threadCreationFee / 4n]
        );
    });

    it("Should not distribute fee to create a thread to the frontendOwner if the address is zero", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createThread(0, threadTitle, ethers.ZeroAddress, { value: threadCreationFee })
        ).to.changeEtherBalances(
          [addr1, owner, frontendOwner, deBBS],
          [threadCreationFee * -1n, threadCreationFee / 2n, 0n, threadCreationFee / 2n]
        );
    });
  });

  describe("Post Creation Tests", function () {
    it("Should create a post with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await deBBS.connect(addr1).createPost(0, postTitle, frontendOwner.address, { value: postCreationFee });

      const post = await deBBS.getPost(1);
      expect(post[1]).to.equal(addr1.address);
      expect(post[2]).to.equal(postTitle);
    });

    it("Should revert when incorrect fee is sent for creating a post", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const incorrectPostCreationFee = ethers.parseEther("0.0002");
      await expect(deBBS.connect(addr1).createPost(0, postTitle, frontendOwner.address, { value: incorrectPostCreationFee }))
        .to.be.revertedWith("You should pay correct fee to create a post.");
    });

    it("Should distribute fee to create a post to the frontendOwner if provided", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);
      
      //boardOwner = owner, threadOwner = addr1
      await deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee });
      await expect(deBBS.connect(addr2).createPost(1, postTitle, frontendOwner.address, { value: postCreationFee })
        ).to.changeEtherBalances(
          [addr2, owner, addr1, frontendOwner, deBBS],
          [postCreationFee * -1n, postCreationFee / 4n, postCreationFee / 4n, postCreationFee / 4n, postCreationFee / 4n]
        );
    });

    it("Should not distribute fee to create a thread to the frontendOwner if the address is zero", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postTitle, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      //boardOwner = owner, threadOwner = addr1
      await deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee });
      await expect(deBBS.connect(addr2).createPost(1, postTitle, ethers.ZeroAddress, { value: postCreationFee })
        ).to.changeEtherBalances(
          [addr2, owner, addr1, frontendOwner, deBBS],
          [postCreationFee * -1n, postCreationFee / 4n, postCreationFee / 4n, 0n, postCreationFee / 2n]
        );
    });

  });

});