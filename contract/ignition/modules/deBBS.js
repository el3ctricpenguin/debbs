const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const deBBSModule = buildModule("deBBSModule", (m) => {
  const deBBS = m.contract("deBBS");

  m.call(deBBS, "createBoard", ["Ethereum", "Let's talk about Ethereum", "#000000", "#FFFFFF", "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"], {value: ethers.parseEther("0.01"), id:"a01_CreateBoard" });
  m.call(deBBS, "createBoard", ["DeFi", "DeFi is the future. Please share your alpha.", "#00FF00", "#FF00FF", "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"], {value: ethers.parseEther("0.01"), id:"a02_CreateBoard" });
  m.call(deBBS, "createBoard", ["Trading", "Share alpha plz.", "#0000FF", "#00FFFF", "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"], {value: ethers.parseEther("0.01"), id:"a03_CreateBoard" });
  
  m.call(deBBS, "createThread", [0, "I made a special anti-fraud wallet, Pizza Wallet", "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"], {value: ethers.parseEther("0.001"), id:"a04_CreateThread" });
  m.call(deBBS, "createThread", [0, "Where can I get WBTC at better price?", "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"], {value: ethers.parseEther("0.001"), id:"a05_CreateThread" });  
  m.call(deBBS, "createThread", [1, "I'm crypto bilionaire living with my mom", "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"], {value: ethers.parseEther("0.001"), id:"a06_CreateThread" });

  m.call(deBBS, "createPost", [0, 0, "I'll buy as much as WBTC has you have", "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"], {value: ethers.parseEther("0.0001"), id:"a07_CreatePost"});
  m.call(deBBS, "createPost", [0, 1, "Solana is so dead", "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"], {value: ethers.parseEther("0.0001"), id:"a08_CreatePost"});
  m.call(deBBS, "createPost", [1, 2, "To the moon!", "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"], {value: ethers.parseEther("0.0001"), id:"a09_CreatePost"});

  return { deBBS };
});

module.exports = deBBSModule;

