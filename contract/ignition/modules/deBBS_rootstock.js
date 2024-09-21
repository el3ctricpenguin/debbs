const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const deBBSrskModule = buildModule("deBBSrskModule", (m) => {
  const deBBS = m.contract("deBBS_rootstock");

  // m.call(deBBS, "createBoard", ["Linea", "Let's talk about Linea", "#000000", "#FFFFFF", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"],
  //   {value: ethers.parseEther("0.01"), id:"a01_CreateBoard" });
  // m.call(deBBS, "createBoard", ["MetaMask", "Discussion about MetaMask.", "#00FF00", "#FF00FF", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], 
  //   {value: ethers.parseEther("0.01"), id:"a02_CreateBoard" });
  // m.call(deBBS, "createBoard", ["Consensys", "The tech-giant in crypto industry", "#0000FF", "#00FFFF", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"],
  //   {value: ethers.parseEther("0.01"), id:"a03_CreateBoard" });
  
  // m.call(deBBS, "createThread", [0, "Looking for Ideas of Dapps on Linea!", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.001"), id:"a04_CreateThread" });
  // m.call(deBBS, "createThread", [1, "Let’s Predict MetaMask’s Next Upgrade", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.001"), id:"a06_CreateThread" });
  
  // m.call(deBBS, "createPost", [0, 0, "More DeFi", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a09_CreatePost"});
  // m.call(deBBS, "createPost", [0, 0, "How about building a multi-signature wallet on Linea to provide secure fund management with low gas fees?", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a09_CreatePost"});
  // m.call(deBBS, "createPost", [0, 0, "Maybe a platform for renting and lending NFTs on Linea, promoting the sharing and lending of in-game assets?", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a09_CreatePost"});
  // m.call(deBBS, "createPost", [1, 0, "Wouldn’t it be cool if they added more NFT management features?", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a11_CreatePost"});
  // m.call(deBBS, "createPost", [1, 0, "On the network selection screen, I would like to be able to add testnets other than Sepolia and Linea Sepolia to the testnet slots. Is such a feature already available?", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a12_CreatePost"});

  return { deBBS };
});

module.exports = deBBSrskModule;

