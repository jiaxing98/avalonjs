import { Test, TestingModule } from '@nestjs/testing'
import { RoomService, RoomServiceImpl, RoomServiceToken } from './room.service'
import { LocalRoomDataSourceImpl, RoomDataSource, RoomDataSourceToken } from './room.datasource'

describe('RoomService', () => {
  let service: RoomService
  let ds: RoomDataSource

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RoomServiceToken,
          useClass: RoomServiceImpl,
        },
        {
          provide: RoomDataSourceToken,
          useClass: LocalRoomDataSourceImpl,
        },
      ],
    }).compile()

    service = module.get<RoomService>(RoomServiceImpl)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('CreateRoom_WithHost_RoomHasOnePlayer(Host)', () => {
    // arrange
    // act
    // assert
  })
})
