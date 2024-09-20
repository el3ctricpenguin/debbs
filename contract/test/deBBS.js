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

    it("Should check a new board is created with the correct data", async function () {
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should revert when incorrect fee is sent for creating a board", async function () {
      const { lock, lockedAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await ethers.provider.getBalance(lock.target)).to.equal(
        lockedAmount
      );
    });

  });

  describe("Thread Creation Tests", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe("Post Creation Tests", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });
});
