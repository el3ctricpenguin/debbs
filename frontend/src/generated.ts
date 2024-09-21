//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// deBBS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deBbsAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'boardId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'boardOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'boardTitle',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'description',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'primaryColor',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'bgColor',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BoardCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'postIdFrom',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'postIdTo',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'mentionFrom',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'mentionTo',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'replyContent',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'parentThreadId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mention',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'postId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'parentThreadId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'postOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'postContent',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'isDeleted', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'mentionTo',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PostCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'threadId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'parentBoardId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'threadOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'threadTitle',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ThreadCreated',
  },
  {
    type: 'function',
    inputs: [
      { name: 'threadId', internalType: 'uint256', type: 'uint256' },
      { name: 'targetUserToBan', internalType: 'address', type: 'address' },
    ],
    name: 'banUser',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'boardToThreads',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'boards',
    outputs: [
      { name: 'boardId', internalType: 'uint256', type: 'uint256' },
      { name: 'boardOwner', internalType: 'address', type: 'address' },
      { name: 'boardTitle', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'primaryColor', internalType: 'string', type: 'string' },
      { name: 'bgColor', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'boardTitle', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'primaryColor', internalType: 'string', type: 'string' },
      { name: 'bgColor', internalType: 'string', type: 'string' },
      {
        name: 'frontendOwnerAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'createBoard',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'createBoardFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'threadId', internalType: 'uint256', type: 'uint256' },
      { name: 'mentionTo', internalType: 'uint256', type: 'uint256' },
      { name: 'postContent', internalType: 'string', type: 'string' },
      {
        name: 'frontendOwnerAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'createPost',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'createPostFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'boardId', internalType: 'uint256', type: 'uint256' },
      { name: 'threadTitle', internalType: 'string', type: 'string' },
      {
        name: 'frontendOwnerAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'createThread',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'createThreadFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'postId', internalType: 'uint256', type: 'uint256' }],
    name: 'deletePost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'boardId', internalType: 'uint256', type: 'uint256' }],
    name: 'getBoard',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBoards',
    outputs: [
      {
        name: '',
        internalType: 'struct deBBS.Board[]',
        type: 'tuple[]',
        components: [
          { name: 'boardId', internalType: 'uint256', type: 'uint256' },
          { name: 'boardOwner', internalType: 'address', type: 'address' },
          { name: 'boardTitle', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'primaryColor', internalType: 'string', type: 'string' },
          { name: 'bgColor', internalType: 'string', type: 'string' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'postId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPost',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'threadId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPostsByThread',
    outputs: [
      {
        name: '',
        internalType: 'struct deBBS.Post[]',
        type: 'tuple[]',
        components: [
          { name: 'postId', internalType: 'uint256', type: 'uint256' },
          { name: 'parentThreadId', internalType: 'uint256', type: 'uint256' },
          { name: 'postOwner', internalType: 'address', type: 'address' },
          { name: 'postContent', internalType: 'string', type: 'string' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'isDeleted', internalType: 'bool', type: 'bool' },
          { name: 'mentionTo', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPostsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'threadId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPostsCountByThread',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'threadId', internalType: 'uint256', type: 'uint256' }],
    name: 'getThread',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address[]', type: 'address[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'boardId', internalType: 'uint256', type: 'uint256' }],
    name: 'getThreadsByBoard',
    outputs: [
      {
        name: '',
        internalType: 'struct deBBS.Thread[]',
        type: 'tuple[]',
        components: [
          { name: 'threadId', internalType: 'uint256', type: 'uint256' },
          { name: 'parentBoardId', internalType: 'uint256', type: 'uint256' },
          { name: 'threadOwner', internalType: 'address', type: 'address' },
          { name: 'threadTitle', internalType: 'string', type: 'string' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'bannedUsers', internalType: 'address[]', type: 'address[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'boardId', internalType: 'uint256', type: 'uint256' }],
    name: 'getThreadsCountByBoard',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'threadId', internalType: 'uint256', type: 'uint256' },
      { name: 'userAddress', internalType: 'address', type: 'address' },
    ],
    name: 'isAddressBanned',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'posts',
    outputs: [
      { name: 'postId', internalType: 'uint256', type: 'uint256' },
      { name: 'parentThreadId', internalType: 'uint256', type: 'uint256' },
      { name: 'postOwner', internalType: 'address', type: 'address' },
      { name: 'postContent', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'isDeleted', internalType: 'bool', type: 'bool' },
      { name: 'mentionTo', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'threadToPosts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'threads',
    outputs: [
      { name: 'threadId', internalType: 'uint256', type: 'uint256' },
      { name: 'parentBoardId', internalType: 'uint256', type: 'uint256' },
      { name: 'threadOwner', internalType: 'address', type: 'address' },
      { name: 'threadTitle', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
] as const
