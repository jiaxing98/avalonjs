import { Test, TestingModule } from '@nestjs/testing'
import { RoomDataSource, RoomDataSourceToken } from '../../data/data_sources/room.datasource'
import { CreatePlayerDto } from '../../data/dtos/create_player_dto'
import { RoomService, RoomServiceImpl, RoomServiceToken } from '../../domain/services/room.service'

describe('RoomService', () => {
  let service: RoomService
  let ds: Record<keyof RoomDataSource, jest.Mock>

  beforeEach(async () => {
    ds = {
      create: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
      getPlayers: jest.fn(),
      addPlayer: jest.fn(),
      removePlayer: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RoomServiceToken,
          useClass: RoomServiceImpl,
        },
        {
          provide: RoomDataSourceToken,
          useValue: ds,
        },
      ],
    }).compile()

    service = module.get<RoomService>(RoomServiceToken)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('CreateRoom_WithHost_RoomHasOnePlayer(Host)', async () => {
    // arrange
    const dto = new CreatePlayerDto()
    dto.name = 'User1'

    // act
    await service.create(dto)

    // assert
    expect(ds.create).toHaveBeenCalledTimes(1)

    const roomArg = ds.create!.mock.calls[0][0]
    expect(roomArg.players.length).toBe(1)

    const player = roomArg.players[0]
    expect(player.name).toBe('User1')
    expect(player.isHost).toBe(true)
  })
})
