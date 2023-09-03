import { Module } from '@nestjs/common';
import { DbModule } from 'src/database/database.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { UserService } from 'src/user/user.service';
import { ArtistService } from 'src/artist/artist.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, UserService, ArtistService],
  imports: [DbModule],
})
export class AlbumModule {}
