import { Module } from '@nestjs/common'
import { RoomController } from './controllers/room.controller'
import { LocalRoomDataSourceImpl, RoomDataSourceToken } from './data/data_sources/room.datasource'
import { RoomServiceImpl, RoomServiceToken } from './domain/services/room.service'

@Module({
  imports: [],
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
export class AppModule {}
