const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("deBBS Tests", function () {
  async function deployContractFixture() {
    const [owner, addr1, addr2, frontendOwner] = await ethers.getSigners();
    const deBBS = await ethers.deployContract("deBBS");

    const boardTitle = "Test Board";
    const threadTitle = "Test thread";
    const postContent = "Test post";
    const description = "Test Description";
    const primaryColor = "#000000";
    const bgColor = "#FFFFFF";
    const boardCreationFee = ethers.parseEther("0.01");
    const threadCreationFee = ethers.parseEther("0.001");
    const postCreationFee = ethers.parseEther("0.0001");

    console.log(await deBBS.getPostsCount());

    await deBBS.connect(owner).createBoard("Test board 1", description, primaryColor, bgColor, frontendOwner.address, { value: boardCreationFee });
    await deBBS.connect(owner).createThread(0, "Test thread 1", frontendOwner.address, { value: threadCreationFee });
    await deBBS.connect(owner).createPost(0, await deBBS.getPostsCount(), "Test post 1", frontendOwner.address, { value: postCreationFee });


    console.log(await deBBS.getPostsCount());


    return { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee };
  }

  describe("Board Creation Test", function () {
    it("Should create a board with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await deBBS.connect(addr1).createBoard(boardTitle, description, primaryColor, bgColor, frontendOwner.address, { value: boardCreationFee });

      const board = await deBBS.getBoard(1);
      expect(board[1]).to.equal(addr1.address);
      expect(board[2]).to.equal(boardTitle);
    });

    it("Should revert when incorrect fee is sent for creating a board", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const incorrectBoardCreationFee = ethers.parseEther("0.02");
      await expect(deBBS.connect(addr1).createBoard(boardTitle, description, primaryColor, bgColor, frontendOwner.address, { value: incorrectBoardCreationFee }))
        .to.be.revertedWith("You should pay correct fee to create a board.");
    });

    it("Should distribute fee to create a board to the frontendOwner if provided", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createBoard(boardTitle, description, primaryColor, bgColor, frontendOwner.address, { value: boardCreationFee })
            ).to.changeEtherBalances(
                [addr1, frontendOwner, deBBS],
                [boardCreationFee * -1n, boardCreationFee / 4n, boardCreationFee * 3n / 4n]
            );    
    });

    it("Should not distribute fee to create a board to the frontendOwner if the address is zero", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createBoard(boardTitle, description, primaryColor, bgColor, ethers.ZeroAddress, { value: boardCreationFee })
            ).to.changeEtherBalances(
                [addr1, frontendOwner, deBBS],
                [boardCreationFee * -1n, 0n, boardCreationFee]
            );
    });
  });

  describe("Thread Creation Tests", function () {
    it("Should create a thread with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee });

      const thread = await deBBS.getThread(1);
      expect(thread[2]).to.equal(addr1.address);
      expect(thread[3]).to.equal(threadTitle);
    });

    it("Should revert when incorrect fee is sent for creating a thread", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const incorrectThreadCreationFee = ethers.parseEther("0.002");
      await expect(deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: incorrectThreadCreationFee }))
        .to.be.revertedWith("You should pay correct fee to create a thread.");
    });

    it("Should distribute fee to create a thread to the frontendOwner if provided", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee })
        ).to.changeEtherBalances(
          [addr1, owner, frontendOwner, deBBS],
          [threadCreationFee * -1n, threadCreationFee / 2n, threadCreationFee / 4n, threadCreationFee / 4n]
        );
    });

    it("Should not distribute fee to create a thread to the frontendOwner if the address is zero", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createThread(0, threadTitle, ethers.ZeroAddress, { value: threadCreationFee })
        ).to.changeEtherBalances(
          [addr1, owner, frontendOwner, deBBS],
          [threadCreationFee * -1n, threadCreationFee / 2n, 0n, threadCreationFee / 2n]
        );
    });
  });

  describe("Post Creation Tests", function () {
    it("Should create a post with correct fee and correct data", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await deBBS.connect(addr1).createPost(0, await deBBS.getPostsCount(), postContent, frontendOwner.address, { value: postCreationFee });

      const post = await deBBS.getPost(await deBBS.getPostsCount() - 1n);
      expect(post[2]).to.equal(addr1.address);
      expect(post[3]).to.equal(postContent);
    });

    it("Should revert when incorrect fee is sent for creating a post", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      const incorrectPostCreationFee = ethers.parseEther("0.0002");
      await expect(deBBS.connect(addr1).createPost(0, deBBS.getPostsCount(), postContent, frontendOwner.address, { value: incorrectPostCreationFee }))
        .to.be.revertedWith("You should pay correct fee to create a post.");
    });

    it("Should distribute fee to create a post to the frontendOwner if provided", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      //boardOwner = owner, threadOwner = addr1, postOwner = addr2
      await deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee });
      await expect(deBBS.connect(addr2).createPost(1, deBBS.getPostsCount(), postContent, frontendOwner.address, { value: postCreationFee })
        ).to.changeEtherBalances(
          [addr2, owner, addr1, frontendOwner, deBBS],
          [postCreationFee * -1n, postCreationFee / 4n, postCreationFee / 4n, postCreationFee / 4n, postCreationFee / 4n]
        );
    });
  });

  describe("Post Deletion Tests", function () {
    it("Should allow post deletion by the post owner", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee });
      await deBBS.connect(addr2).createPost(1, deBBS.getPostsCount(), postContent, frontendOwner.address, { value: postCreationFee });

      expect(await deBBS.connect(addr2).deletePost(await deBBS.getPostsCount()-1n));

      const post = await deBBS.getPost(await deBBS.getPostsCount()-1n);
      expect(post[5]).to.equal(true);
    });

    it("Should allow post deletion by the thread owner", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);
      
      await deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee });
      await deBBS.connect(addr2).createPost(1, await deBBS.getPostsCount(), postContent, frontendOwner.address, { value: postCreationFee });
      
      expect(await deBBS.connect(addr1).deletePost(await deBBS.getPostsCount()-1n));

      const post = await deBBS.getPost(await deBBS.getPostsCount() - 1n);
      expect(post[5]).to.equal(true);
    });    

  });

  describe("Mention Post Tests", function () {
    it("should revert when a user tries to mention a future post", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createPost(0, await deBBS.getPostsCount() + 1n, postContent, frontendOwner.address, { value: postCreationFee }))
      .to.be.revertedWith("You can't mention future posts.");
    });
  });

  describe("View Function Tests", function () {
    it("should work getThreadsByBoard", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      //There is one thread in board No.0.
      expect((await deBBS.getThreadsByBoard(0)).length).to.equal(1);

      //There is two thread in board No.0.
      await deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee });
      expect((await deBBS.getThreadsByBoard(0)).length).to.equal(2);

      //There is no thread in board No.1.
      await deBBS.connect(addr1).createBoard(boardTitle, description, primaryColor, bgColor, frontendOwner.address, { value: boardCreationFee });
      expect((await deBBS.getThreadsByBoard(1)).length).to.equal(0);

    });

    it("should work getPostsByThread", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      //There is one post in thread No.0.
      expect((await deBBS.getPostsByThread(0)).length).to.equal(1);

      //There is two post in thread No.0.
      await deBBS.connect(addr1).createPost(0, await deBBS.getPostsCount(), postContent, frontendOwner.address, { value: postCreationFee });
      expect((await deBBS.getPostsByThread(0)).length).to.equal(2);

      //There is no thread in thread No.1.
      await deBBS.connect(addr1).createBoard(boardTitle, description, primaryColor, bgColor, frontendOwner.address, { value: boardCreationFee });
      await deBBS.connect(addr1).createThread(1, threadTitle, frontendOwner.address, { value: threadCreationFee });
      expect((await deBBS.getPostsByThread(1)).length).to.equal(0);

    });

    it("should work isAddressBanned", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      //false case
      expect(await deBBS.connect(owner).isAddressBanned(0, addr1)).to.equal(false);

      //true case
      await deBBS.connect(owner).banUser(0, addr1);
      expect(await deBBS.connect(owner).isAddressBanned(0, addr1)).to.equal(true);
    });

  });

  describe("Event Emission Tests", function () {
    it("should emit BoardCreated event", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createBoard(boardTitle, description, primaryColor, bgColor, frontendOwner.address, { value: boardCreationFee }))
        .to.emit(deBBS, "BoardCreated");

    });

    it("should emit ThreadCreated event", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createThread(0, threadTitle, frontendOwner.address, { value: threadCreationFee }))
      .to.emit(deBBS, "ThreadCreated");

    });

    it("should emit PostCreated event", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createPost(0, await deBBS.getPostsCount(), postContent, frontendOwner.address, { value: postCreationFee }))
      .to.emit(deBBS, "PostCreated");

    });

    it("should emit mention event", async function () {
      const { deBBS, owner, addr1, addr2, frontendOwner, boardTitle, threadTitle, postContent, description, primaryColor, bgColor, boardCreationFee, threadCreationFee, postCreationFee } = await loadFixture(deployContractFixture);

      await expect(deBBS.connect(addr1).createPost(0, await deBBS.getPostsCount() - 1n, postContent, frontendOwner.address, { value: postCreationFee }))
        .to.emit(deBBS, "Mention");

    });

  });
});