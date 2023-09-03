import { Module } from '@nestjs/common';
import { DbModule } from 'src/database/database.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ArtistService } from 'src/artist/artist.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, ArtistService, UserService],
  imports: [DbModule],
})
export class SearchModule {}
