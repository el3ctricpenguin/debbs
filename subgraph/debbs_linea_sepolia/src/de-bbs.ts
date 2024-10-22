import {
  BoardCreated as BoardCreatedEvent,
  Mention as MentionEvent,
  PostCreated as PostCreatedEvent,
  ThreadCreated as ThreadCreatedEvent
} from "../generated/deBBS/deBBS"
import {
  BoardCreated,
  Mention,
  PostCreated,
  ThreadCreated
} from "../generated/schema"

export function handleBoardCreated(event: BoardCreatedEvent): void {
  let entity = new BoardCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.boardId = event.params.boardId
  entity.boardOwner = event.params.boardOwner
  entity.boardTitle = event.params.boardTitle
  entity.description = event.params.description
  entity.primaryColor = event.params.primaryColor
  entity.bgColor = event.params.bgColor
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMention(event: MentionEvent): void {
  let entity = new Mention(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.postIdFrom = event.params.postIdFrom
  entity.postIdTo = event.params.postIdTo
  entity.mentionFrom = event.params.mentionFrom
  entity.mentionTo = event.params.mentionTo
  entity.replyContent = event.params.replyContent
  entity.parentThreadId = event.params.parentThreadId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePostCreated(event: PostCreatedEvent): void {
  let entity = new PostCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.postId = event.params.postId
  entity.parentThreadId = event.params.parentThreadId
  entity.postOwner = event.params.postOwner
  entity.postContent = event.params.postContent
  entity.timestamp = event.params.timestamp
  entity.isDeleted = event.params.isDeleted
  entity.mentionTo = event.params.mentionTo

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleThreadCreated(event: ThreadCreatedEvent): void {
  let entity = new ThreadCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.threadId = event.params.threadId
  entity.parentBoardId = event.params.parentBoardId
  entity.threadOwner = event.params.threadOwner
  entity.threadTitle = event.params.threadTitle
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
