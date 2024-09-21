const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const deBBSModule = buildModule("deBBSModule", (m) => {
  const deBBS = m.contract("deBBS");

  m.call(deBBS, "createBoard", ["Ethereum", "Let's talk about Ethereum", "#000000", "#FFFFFF", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.01"), id:"a01_CreateBoard" });
  m.call(deBBS, "createBoard", ["DeFi", "DeFi is the future.", "#00FF00", "#FF00FF", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.01"), id:"a02_CreateBoard" });
  m.call(deBBS, "createBoard", ["Trading", "Degen is the next human", "#0000FF", "#00FFFF", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.01"), id:"a03_CreateBoard" });
  
  m.call(deBBS, "createThread", [0, "I made a special anti-fraud wallet, Pizza Wallet", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.001"), id:"a04_CreateThread" });
  m.call(deBBS, "createThread", [0, "Where can I get WBTC at better price?", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.001"), id:"a06_CreateThread" });
  m.call(deBBS, "createThread", [2, "I'm crypto bilionaire living with my mom", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.001"), id:"a07_CreateThread" });
  m.call(deBBS, "createThread", [1, "Still Remember EtherDelta?", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.001"), id:"a08_CreateThread" });

  m.call(deBBS, "createPost", [0, 0, "Ethereum is so dead", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a09_CreatePost"});
  m.call(deBBS, "createPost", [0, 1, "I'll buy as much as ETH has you have", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a10_CreatePost"});
  m.call(deBBS, "createPost", [0, 2, "To the moon!", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a11_CreatePost"});
  m.call(deBBS, "createPost", [2, 3, "I made 200k buying vegetable tokens last year.", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a12_CreatePost"});
  m.call(deBBS, "createPost", [3, 4, "Does anyone still remember EtherDelta? I’ve been feeling nostalgic lately and realized it was one of the first decentralized exchanges I used. It wasn’t pretty—orders constantly stuck, and the UI was a nightmare, but it was a huge step forward at the time. Hard to believe how far DeFi has come since then!", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a12_CreatePost"});
  m.call(deBBS, "createPost", [3, 4, "Ah, EtherDelta! The good old days of decentralized trading before DEXs became all shiny and user-friendly. It was like the wild west—slow transactions, clunky interface, and if you weren’t careful, you could easily send your tokens into the abyss.", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a13_CreatePost"});
  m.call(deBBS, "createPost", [1, 6, "Uniswap.", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a14_CreatePost"});
  m.call(deBBS, "createPost", [1, 7, "You can use DEX aggregators like 1inch.", "0x391EDb04A93549fAf95BeeD8244B7DD494003c80"], {value: ethers.parseEther("0.0001"), id:"a15_CreatePost"});

  return { deBBS };
});

module.exports = deBBSModule;

