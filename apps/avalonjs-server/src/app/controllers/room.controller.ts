import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import type { RoomService } from '../domain/services/room.service'
import { CreatePlayerDto } from '../data/dtos/create_player_dto'

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Body() host: CreatePlayerDto) {
    return await this.roomService.create(host)
  }

  @Get()
  async findAll() {
    return await this.roomService.findAll()
  }

  @Delete(':roomUID')
  async remove(@Param('roomUID') roomUID: string) {
    return await this.roomService.remove(roomUID)
  }

  @Get()
  async getPlayers(@Param('roomUID') roomUID: string) {
    return await this.roomService.getPlayers(roomUID)
  }

  @Post(':roomUID/add-player')
  async addPlayer(@Param('roomUID') roomUID: string, @Body() dto: CreatePlayerDto) {
    return await this.roomService.addPlayer(roomUID, dto)
  }

  @Post(':roomUID/remove-player')
  async removePlayer(@Param('roomUID') roomUID: string, @Body() playerUID: string) {
    return await this.roomService.removePlayer(roomUID, playerUID)
  }
}
