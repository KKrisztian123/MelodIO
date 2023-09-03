import { Module } from '@nestjs/common';
import { ConnectionModule } from './connection/connection.module';
import { DbModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { UploadsModule } from './uploads/uploads.module';
import { AlbumModule } from './album/album.module';
import { SongModule } from './song/song.module';
import { ListModule } from './list/list.module';
import { PlayModule } from './play/play.module';
import { SearchModule } from './search/search.module';
@Module({
  imports: [
    UploadsModule,
    ConnectionModule,
    DbModule,
    AuthModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    SongModule,
    ListModule,
    PlayModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
