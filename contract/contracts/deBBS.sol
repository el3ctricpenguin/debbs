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

    mapping(uint256 => uint256[]) public boardToThreads; 
    mapping(uint256 => uint256[]) public threadToPosts; 

    constructor() {
        createBoardFee = 0.01 ether;
        createThreadFee = 0.001 ether;
        createPostFee = 0.0001 ether;
    }

    function createBoard(string memory boardTitle, address frontendOwnerAddress) public payable {
        require(msg.value == createBoardFee, "You should pay correct fee to create a board.");
        
        uint256 boardId = boards.length;

        boards.push(Board({
            boardId: boardId,
            boardOwner: msg.sender,
            boardTitle: boardTitle,
            timestamp: block.timestamp
        }));

        _sendCreateBoardFeeToFrontendOwner(frontendOwnerAddress);

    }

    function createThread(uint256 boardId, string memory threadTitle, address frontendOwnerAddress) public payable {
        require(msg.value == createThreadFee, "You should pay correct fee to create a thread.");

        uint256 threadId = threads.length;

        threads.push(Thread({
            threadId: threadId,
            threadOwner: msg.sender,
            threadTitle: threadTitle,
            timestamp: block.timestamp
        }));

        boardToThreads[boardId].push(threadId);
        _sendCreateThreadFeeToBoardOwner(boardId, frontendOwnerAddress);
    }

    function createPost(uint256 threadId, string memory postContent, address frontendOwnerAddress) public payable {
        require(msg.value == createPostFee, "You should pay correct fee to create a post.");

        uint256 postId = posts.length;

        posts.push(Post({
            postId: postId,
            postOwner: msg.sender,
            postContent: postContent,
            timestamp: block.timestamp
        }));

        threadToPosts[threadId].push(postId);
    }

    function _sendCreateBoardFeeToFrontendOwner(address _frontendOwnerAddress) private {
        require(createBoardFee <= address(this).balance, "The amount to distribute is not enough.");

        if (_frontendOwnerAddress != address(0)) {
            address payable frontendOwnerAddress = payable(_frontendOwnerAddress);
            frontendOwnerAddress.transfer(createBoardFee / 4);
        }
    }

    function _sendCreateThreadFeeToBoardOwner(uint256 _boardId, address _frontendOwnerAddress) private {
        require(createThreadFee <= address(this).balance, "The amount to distribute is not enough.");

        address payable boardOwnerAddress = payable(boards[_boardId].boardOwner);
            boardOwnerAddress.transfer(createThreadFee / 2);

        if (_frontendOwnerAddress != address(0)) {
            address payable frontendOwnerAddress = payable(_frontendOwnerAddress);
            frontendOwnerAddress.transfer(createThreadFee / 4);
        }
    }

    //-------------------------
    //     view functions
    //-------------------------

    function getBoard(uint256 boardId) public view returns (
        uint256,
        address,
        string memory,
        uint256
    ) {
        Board memory board = boards[boardId];
        return (
            board.boardId,
            board.boardOwner,
            board.boardTitle,
            board.timestamp
        );
    }

    function getThread(uint256 threadId) public view returns (
        uint256,
        address,
        string memory,
        uint256
    ) {
        Thread memory thread = threads[threadId];
        return (
            thread.threadId,
            thread.threadOwner,
            thread.threadTitle,
            thread.timestamp
        );
    }

    function getPost(uint256 postId) public view returns (
        uint256,
        address,
        string memory,
        uint256
    ) {
        Post memory post = posts[postId];
        return (
            post.postId,
            post.postOwner,
            post.postContent,
            post.timestamp
        );
    }

}