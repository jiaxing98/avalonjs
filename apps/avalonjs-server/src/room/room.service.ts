import { Inject, Injectable } from '@nestjs/common'
import { CreatePlayerDto } from './dto/create_player_dto'
import { Player } from './entities/player.entity'
import { Room } from './entities/room.entity'
import { RoomDataSourceToken, type RoomDataSource } from './room.datasource'

export const RoomServiceToken = Symbol('RoomService')

export interface RoomService {
  create(dto: CreatePlayerDto): Promise<void>
  findAll(): Promise<Room[]>
  remove(roomUID: string): Promise<void>

  getPlayers(roomUID: string): Promise<Player[]>
  addPlayer(roomUID: string, dto: CreatePlayerDto): Promise<void>
  removePlayer(roomUID: string, playerUID: string): Promise<void>
}

@Injectable()
export class RoomServiceImpl implements RoomService {
  constructor(
    @Inject(RoomDataSourceToken)
    private readonly ds: RoomDataSource
  ) {}

  async create(dto: CreatePlayerDto): Promise<void> {
    const host = new Player(dto.name, true)
    await this.ds.create(new Room([host]))
  }

  async findAll(): Promise<Room[]> {
    return await this.ds.findAll()
  }

  async remove(roomUID: string): Promise<void> {
    await this.ds.remove(roomUID)
  }

  async getPlayers(roomUID: string): Promise<Player[]> {
    return await this.ds.getPlayers(roomUID)
  }

  async addPlayer(roomUID: string, dto: CreatePlayerDto): Promise<void> {
    const player = new Player(dto.name)
    await this.ds.addPlayer(roomUID, player)
  }

  async removePlayer(roomUID: string, playerUID: string): Promise<void> {
    await this.ds.removePlayer(roomUID, playerUID)
  }
}
