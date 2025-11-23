import { Module } from '@nestjs/common'
import { RoomController } from './room.controller'
import { LocalRoomDataSourceImpl, RoomDataSourceToken } from './room.datasource'
import { RoomServiceImpl, RoomServiceToken } from './room.service'

@Module({
  controllers: [RoomController],
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
})
export class RoomModule {}
