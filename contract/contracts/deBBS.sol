// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "hardhat/console.sol";

contract deBBS {
    
    struct Board {
        uint256 boardId;
        address boardOwner;
        string boardTitle;
        string description;
        string primaryColor;
        string bgColor;
        uint256 timestamp;
    }

    struct Thread {
        uint256 threadId;
        uint256 parentBoardId;
        address threadOwner;
        string threadTitle;
        uint256 timestamp;
        address[] bannedUsers;
    }

    struct Post {
        uint256 postId;
        uint256 parentThreadId;
        address postOwner;
        string postContent;
        uint256 timestamp;
        bool isDeleted;
        uint256 mentionTo;
    }

    Board[] public boards;
    Thread[] public threads;
    Post[] public posts;
    uint256 public createBoardFee;
    uint256 public createThreadFee;
    uint256 public createPostFee;

    event BoardCreated(uint256 boardId, address boardOwner, string boardTitle, uint256 timestamp);
    event ThreadCreated(uint256 threadId, address threadOwner, string threadTitle, uint256 parentBoardId, uint256 timestamp);
    event PostCreated(uint256 postId, address postOwner, string postContent, uint256 parentThreadId, uint256 timestamp);
    event Mention(uint256 postIdFrom, uint256 postIdTo, address mentionFrom, address mentionTo, string replyContent, uint256 parentThreadId, uint256 timestamp);

    mapping(uint256 => uint256[]) public boardToThreads; 
    mapping(uint256 => uint256[]) public threadToPosts; 

    constructor() {
        createBoardFee = 0.01 ether;
        createThreadFee = 0.001 ether;
        createPostFee = 0.0001 ether;
    }

    function createBoard(
        string memory boardTitle,
        string memory description,
        string memory primaryColor,
        string memory bgColor,
        address frontendOwnerAddress
    ) public payable {
        require(msg.value == createBoardFee, "You should pay correct fee to create a board.");
        
        uint256 boardId = boards.length;

        boards.push(Board({
            boardId: boardId,
            boardOwner: msg.sender,
            boardTitle: boardTitle,
            description: description,
            primaryColor: primaryColor,
            bgColor: bgColor,
            timestamp: block.timestamp
        }));

        _sendCreateBoardFeeToFrontendOwner(frontendOwnerAddress);
        emit BoardCreated(boardId, msg.sender, boardTitle, block.timestamp);

    }

    function createThread(uint256 boardId, string memory threadTitle, address frontendOwnerAddress) public payable {
        require(msg.value == createThreadFee, "You should pay correct fee to create a thread.");

        uint256 threadId = threads.length;

        threads.push(Thread({
            threadId: threadId,
            parentBoardId: boardId,
            threadOwner: msg.sender,
            threadTitle: threadTitle,
            timestamp: block.timestamp,
            bannedUsers: new address[](0)
        }));

        boardToThreads[boardId].push(threadId);
        _sendCreateThreadFeeToBoardOwner(boardId, frontendOwnerAddress);
        emit ThreadCreated(threadId, msg.sender, threadTitle, boardId, block.timestamp);
    }

    function createPost(uint256 threadId, uint256 mentionTo, string memory postContent, address frontendOwnerAddress) public payable {
        require(msg.value == createPostFee, "You should pay correct fee to create a post.");

        uint256 postId = posts.length;

        require(mentionTo <= postId, "You can't mention future posts.");

        posts.push(Post({
            postId: postId,
            parentThreadId: threadId,
            postOwner: msg.sender,
            postContent: postContent,
            timestamp: block.timestamp,
            isDeleted: false,
            mentionTo: mentionTo
        }));

        if(mentionTo != postId) {
            emit Mention(postId, mentionTo, msg.sender, posts[mentionTo].postOwner ,postContent, threadId, block.timestamp);
        }

        threadToPosts[threadId].push(postId);
        _sendCreatePostFeeToThreadOwnerAndBoardOwner(threadId, frontendOwnerAddress);
        emit PostCreated(postId, msg.sender, postContent, threadId, block.timestamp);
    }

    function banUser(uint256 threadId, address targetUserToBan) public {
        require(msg.sender == threads[threadId].threadOwner, "Only the thread owner can ban users.");
        require(isAddressBanned(threadId, targetUserToBan) == false, "The User is already banned.");

        threads[threadId].bannedUsers.push(targetUserToBan);
    }

    function deletePost(uint256 postId) public {

        address postOwner = posts[postId].postOwner;

        uint256 parentThreadId = posts[postId].parentThreadId;
        address parentThreadAddress = threads[parentThreadId].threadOwner;

        require(msg.sender == postOwner || msg.sender == parentThreadAddress, "You don't have a permission to delete this post.");
        posts[postId].isDeleted = true;

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

    function _sendCreatePostFeeToThreadOwnerAndBoardOwner(uint256 _threadId, address _frontendOwnerAddress) private {
        require(createPostFee <= address(this).balance, "The amount to distribute is not enough.");

        uint256 parentBoardId = threads[_threadId].parentBoardId;
        address payable boardOwnerAddress = payable(boards[parentBoardId].boardOwner);
        boardOwnerAddress.transfer(createPostFee / 4);

        address payable threadOwnerAddress = payable(threads[_threadId].threadOwner);
        threadOwnerAddress.transfer(createPostFee / 4);

        if (_frontendOwnerAddress != address(0)) {
            address payable frontendOwnerAddress = payable(_frontendOwnerAddress);
            frontendOwnerAddress.transfer(createPostFee / 4);
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

    function getBoards() public view returns (Board[] memory) {
        return boards;
    }

    function getThread(uint256 threadId) public view returns (
        uint256,
        uint256,
        address,
        string memory,
        uint256
    ) {
        Thread memory thread = threads[threadId];
        return (
            thread.threadId,
            thread.parentBoardId,
            thread.threadOwner,
            thread.threadTitle,
            thread.timestamp
        );
    }

    function getThreadsByBoard(uint256 boardId) public view returns (Thread[] memory) {
        uint256[] memory targetThreads = boardToThreads[boardId];
        Thread[] memory threadsByBoard = new Thread[](targetThreads.length);

        for (uint256 i = 0; i < targetThreads.length; i++) {
            Thread memory thread = threads[targetThreads[i]];
            threadsByBoard[i] = thread;
        }

        return threadsByBoard;
    }

    function getThreadsCountByBoard(uint boardId) public view returns (uint256) {
        return boardToThreads[boardId].length;
    }

    function getPost(uint256 postId) public view returns (
        uint256,
        uint256,
        address,
        string memory,
        uint256,
        bool,
        uint256
    ) {
        Post memory post = posts[postId];
        return (
            post.postId,
            post.parentThreadId,
            post.postOwner,
            post.postContent,
            post.timestamp,
            post.isDeleted,
            post.mentionTo
        );
    }

    function getPostsByThread(uint256 threadId) public view returns (Post[] memory) {
        uint256[] memory targetPosts = threadToPosts[threadId];
        Post[] memory postsByThread = new Post[](targetPosts.length);

        for (uint256 i = 0; i < targetPosts.length; i++) {
            Post memory post = posts[targetPosts[i]];
            postsByThread[i] = post;
        }

        return postsByThread;
    }

    function getPostsCount() public view returns (uint256) {
        return posts.length;
    }

    function getPostsCountByThread(uint threadId) public view returns (uint256) {
        return threadToPosts[threadId].length;
    }

    function isAddressBanned(uint256 threadId, address userAddress) public view returns (bool) {
        Thread memory thread = threads[threadId];
        for (uint256 i = 0; i < thread.bannedUsers.length; i++) {
            if (thread.bannedUsers[i] == userAddress) {
                return true;
            }
        }
        return false;
    }

}