# deBBS
deBBS is an on-chain BBS(Bulletin Board System) that builds self-sustaining communities by charging small fees for posts and thread creation to prevent spam in anonymous networks. These fees are distributed as rewards to moderators and frontend providers, creating an incentive structure that supports community maintenance.

<img width="1440" alt="debbs_image" src="https://github.com/user-attachments/assets/55805b31-7712-41b2-b1bd-37c09bcfc44b">

## Demo App
https://debbs.vercel.app/

## Description
Decentralized onchain BBS owned and maintained by users. 
Blockchain communities are already thriving, with DAOs actively operating.
So why not take the conversation on-chain?

deBBS functions as a tool for building a self-sustaining community by charging a small fee for posting and thread creation as a spam prevention measure in highly anonymous networks, and distributing the collected fees as rewards to moderators and frontend providers who contribute to maintaining the community through an incentive structure.

## How it's made
At deBBS, we have developed a fully on-chain BBS system that operates entirely on the EVM through its payment and data storage functionalities.

To enhance immediacy in the frontend and foster stronger interrelationships between communities (Boards), we created SubGraphs on The Graph. This allows us to organize and retrieve data independently of the data structure within smart contracts.

However, recognizing the practical challenge of writing large amounts of data to the blockchain on Ethereum Mainnet due to high gas fees, we opted to build the application on various L2 blockchains, where transaction fees are relatively lower.

## Deployed contracts for deBBS Application
deBBS is deployed in these blockchain networks below.

Sepolia: https://sepolia.etherscan.io/address/0xCc97a26eEc318Ccc23163dC982fb948313603C68

Linea Sepolia: https://sepolia.lineascan.build/address/0xE91808b8Dd5f7741d2fF8eFf3aaA98582197b2AB

Rootstock: https://rootstock-testnet.blockscout.com/address/0x8Ac838D9CcbFDf605c1F2d09F027eD39B3321ba2

Morph: https://explorer-holesky.morphl2.io/address/0x8ac838d9cCBFdF605C1f2D09F027ed39b3321bA2
