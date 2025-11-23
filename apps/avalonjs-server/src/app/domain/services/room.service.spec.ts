import { Test, TestingModule } from '@nestjs/testing'
import { RoomDataSource, RoomDataSourceToken } from '../../data/data_sources/room.datasource'
import { CreatePlayerDto } from '../../data/dtos/create_player_dto'
import { RoomService, RoomServiceImpl, RoomServiceToken } from '../services/room.service'

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
    expect(ds).toBeDefined()
  })

  it('CreateRoom_WithHost_RoomHasOnePlayer(Host)', async () => {
    // arrange
    const dto = new CreatePlayerDto()
    dto.name = 'Player1'

    // act
    await service.create(dto)

    // assert
    expect(ds.create).toHaveBeenCalledTimes(1)

    const roomArg = ds.create!.mock.calls[0][0]
    expect(roomArg.players.length).toBe(1)

    const player = roomArg.players[0]
    expect(player.name).toBe('Player1')
    expect(player.isHost).toBe(true)
  })

  it('AddPlayer_WithTwoNewPlayers_RoomHasThreePlayer', async () => {
    // arrange
    const player1 = new CreatePlayerDto()
    player1.name = 'Player1'

    const player2 = new CreatePlayerDto()
    player2.name = 'Player2'

    const player3 = new CreatePlayerDto()
    player3.name = 'Player3'

    // act
    await service.create(player1)
    await service.addPlayer('room-001', player2)
    await service.addPlayer('room-001', player3)

    // assert
    expect(ds.create).toHaveBeenCalledTimes(1)
    expect(ds.addPlayer).toHaveBeenCalledTimes(2)

    const roomArg = ds.create!.mock.calls[0][0]
    expect(roomArg.players.length).toBe(1)

    const player = roomArg.players[0]
    expect(player.name).toBe('Player1')
    expect(player.isHost).toBe(true)

    const player2Arg = ds.addPlayer!.mock.calls[0][0]
    expect(player2Arg.roomUID).toBe('room-001')
    // expect(player2Arg.roomUID).toBe('room-001')

    const player3Arg = ds.addPlayer!.mock.calls[1][0]
    expect(player3Arg.roomUID).toBe('room-001')
  })
})
