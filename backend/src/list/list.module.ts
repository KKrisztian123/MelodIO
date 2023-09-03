import { Module } from '@nestjs/common';
import { DbModule } from 'src/database/database.module';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ArtistService } from 'src/artist/artist.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ListController],
  providers: [ListService, ArtistService, UserService],
  imports: [DbModule],
})
export class ListModule {}
