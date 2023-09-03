import { Module } from '@nestjs/common';
import { DbModule } from 'src/database/database.module';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { UserService } from 'src/user/user.service';
import { ArtistService } from 'src/artist/artist.service';

@Module({
  controllers: [SongController],
  providers: [SongService, UserService, ArtistService],
  imports: [DbModule],
})
export class SongModule {}
