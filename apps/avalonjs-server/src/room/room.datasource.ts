import { Injectable } from '@nestjs/common'
import { Player } from './entities/player.entity'
import { Room } from './entities/room.entity'

export const RoomDataSourceToken = Symbol('RoomDataSource')

export interface RoomDataSource {
  create(room: Room): Promise<void>
  findAll(): Promise<Room[]>
  remove(roomUID: string): Promise<void>

  getPlayers(roomUID: string): Promise<Player[]>
  addPlayer(roomUID: string, player: Player): Promise<void>
  removePlayer(roomUID: string, playerUID: string): Promise<void>
}

@Injectable()
export class LocalRoomDataSourceImpl implements RoomDataSource {
  readonly maxCapacity: number = 10

  constructor(private rooms: Room[]) {}

  async create(room: Room): Promise<void> {
    if (this.rooms.length >= this.maxCapacity) {
      throw Error('No more capacity.')
    }

    this.rooms.push(room)
  }

  async findAll(): Promise<Room[]> {
    return this.rooms
  }

  async remove(roomUID: string): Promise<void> {
    this.rooms = this.rooms.filter((x) => x.id !== roomUID)
  }

  async getPlayers(roomUID: string): Promise<Player[]> {
    const room = this.rooms.find((x) => x.id === roomUID)
    if (!room) throw Error(`Room ${roomUID} not found.`)

    return room.players
  }

  async addPlayer(roomUID: string, player: Player): Promise<void> {
    const room = this.rooms.find((x) => x.id === roomUID)
    if (!room) throw Error(`Room ${roomUID} not found.`)

    room.addPlayer(player)
  }

  async removePlayer(roomUID: string, playerUID: string): Promise<void> {
    const room = this.rooms.find((x) => x.id === roomUID)
    if (!room) throw Error(`Room ${roomUID} not found.`)

    room.removePlayer(playerUID)
  }
}
