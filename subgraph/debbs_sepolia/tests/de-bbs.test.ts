import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BoardCreated } from "../generated/schema"
import { BoardCreated as BoardCreatedEvent } from "../generated/deBBS/deBBS"
import { handleBoardCreated } from "../src/de-bbs"
import { createBoardCreatedEvent } from "./de-bbs-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let boardId = BigInt.fromI32(234)
    let boardOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let boardTitle = "Example string value"
    let description = "Example string value"
    let primaryColor = "Example string value"
    let bgColor = "Example string value"
    let timestamp = BigInt.fromI32(234)
    let newBoardCreatedEvent = createBoardCreatedEvent(
      boardId,
      boardOwner,
      boardTitle,
      description,
      primaryColor,
      bgColor,
      timestamp
    )
    handleBoardCreated(newBoardCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BoardCreated created and stored", () => {
    assert.entityCount("BoardCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BoardCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "boardId",
      "234"
    )
    assert.fieldEquals(
      "BoardCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "boardOwner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BoardCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "boardTitle",
      "Example string value"
    )
    assert.fieldEquals(
      "BoardCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "description",
      "Example string value"
    )
    assert.fieldEquals(
      "BoardCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "primaryColor",
      "Example string value"
    )
    assert.fieldEquals(
      "BoardCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bgColor",
      "Example string value"
    )
    assert.fieldEquals(
      "BoardCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
