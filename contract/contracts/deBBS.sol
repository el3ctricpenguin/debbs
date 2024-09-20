// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "hardhat/console.sol";

contract deBBS {
    
    struct Board {
        uint256 boardId;
        address boardOwner;
        string boardTitle;
        string timestamp;
    }

    struct Thread {
        uint256 threadId;
        address threadOwner;
        string threadTitle;
        uint256 timestamp;
    }

    struct Post {
        uint256 postId;
        address postOwner;
        string postContent;
        uint256 timestamp;
    }

    constructor(uint _unlockTime) payable {

    }

    function withdraw() public {
    
    }
}
