import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BoardCreated,
  Mention,
  PostCreated,
  ThreadCreated
} from "../generated/deBBS/deBBS"

export function createBoardCreatedEvent(
  boardId: BigInt,
  boardOwner: Address,
  boardTitle: string,
  timestamp: BigInt
): BoardCreated {
  let boardCreatedEvent = changetype<BoardCreated>(newMockEvent())

  boardCreatedEvent.parameters = new Array()

  boardCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "boardId",
      ethereum.Value.fromUnsignedBigInt(boardId)
    )
  )
  boardCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "boardOwner",
      ethereum.Value.fromAddress(boardOwner)
    )
  )
  boardCreatedEvent.parameters.push(
    new ethereum.EventParam("boardTitle", ethereum.Value.fromString(boardTitle))
  )
  boardCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return boardCreatedEvent
}

export function createMentionEvent(
  postIdFrom: BigInt,
  postIdTo: BigInt,
  mentionFrom: Address,
  mentionTo: Address,
  replyContent: string,
  parentThreadId: BigInt,
  timestamp: BigInt
): Mention {
  let mentionEvent = changetype<Mention>(newMockEvent())

  mentionEvent.parameters = new Array()

  mentionEvent.parameters.push(
    new ethereum.EventParam(
      "postIdFrom",
      ethereum.Value.fromUnsignedBigInt(postIdFrom)
    )
  )
  mentionEvent.parameters.push(
    new ethereum.EventParam(
      "postIdTo",
      ethereum.Value.fromUnsignedBigInt(postIdTo)
    )
  )
  mentionEvent.parameters.push(
    new ethereum.EventParam(
      "mentionFrom",
      ethereum.Value.fromAddress(mentionFrom)
    )
  )
  mentionEvent.parameters.push(
    new ethereum.EventParam("mentionTo", ethereum.Value.fromAddress(mentionTo))
  )
  mentionEvent.parameters.push(
    new ethereum.EventParam(
      "replyContent",
      ethereum.Value.fromString(replyContent)
    )
  )
  mentionEvent.parameters.push(
    new ethereum.EventParam(
      "parentThreadId",
      ethereum.Value.fromUnsignedBigInt(parentThreadId)
    )
  )
  mentionEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return mentionEvent
}

export function createPostCreatedEvent(
  postId: BigInt,
  postOwner: Address,
  postContent: string,
  parentThreadId: BigInt,
  timestamp: BigInt
): PostCreated {
  let postCreatedEvent = changetype<PostCreated>(newMockEvent())

  postCreatedEvent.parameters = new Array()

  postCreatedEvent.parameters.push(
    new ethereum.EventParam("postId", ethereum.Value.fromUnsignedBigInt(postId))
  )
  postCreatedEvent.parameters.push(
    new ethereum.EventParam("postOwner", ethereum.Value.fromAddress(postOwner))
  )
  postCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "postContent",
      ethereum.Value.fromString(postContent)
    )
  )
  postCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "parentThreadId",
      ethereum.Value.fromUnsignedBigInt(parentThreadId)
    )
  )
  postCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return postCreatedEvent
}

export function createThreadCreatedEvent(
  threadId: BigInt,
  threadOwner: Address,
  threadTitle: string,
  parentBoardId: BigInt,
  timestamp: BigInt
): ThreadCreated {
  let threadCreatedEvent = changetype<ThreadCreated>(newMockEvent())

  threadCreatedEvent.parameters = new Array()

  threadCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "threadId",
      ethereum.Value.fromUnsignedBigInt(threadId)
    )
  )
  threadCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "threadOwner",
      ethereum.Value.fromAddress(threadOwner)
    )
  )
  threadCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "threadTitle",
      ethereum.Value.fromString(threadTitle)
    )
  )
  threadCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "parentBoardId",
      ethereum.Value.fromUnsignedBigInt(parentBoardId)
    )
  )
  threadCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return threadCreatedEvent
}
