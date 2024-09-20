// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "hardhat/console.sol";

contract deBBS {
    
    struct Board {
        uint256 boardId;
        address boardOwner;
        string boardTitle;
        uint256 timestamp;
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

    Board[] public boards;
    Thread[] public threads;
    Post[] public posts;
    uint256 public createBoardFee;
    uint256 public createThreadFee;
    uint256 public createPostFee;

    constructor() {

    }

    function createBoard(string memory boardTitle) public payable {
        require(msg.value == createBoardFee, "You should pay correct fee to create a board.");
        
        uint256 boardId = boards.length + 1;

        boards.push(Board({
            boardId: boardId,
            boardOwner: msg.sender,
            boardTitle: boardTitle,
            timestamp: block.timestamp
        }));
        
    }
}
