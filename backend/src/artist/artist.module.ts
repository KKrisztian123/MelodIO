import { Module } from '@nestjs/common';
import { DbModule } from 'src/database/database.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DbModule],
})
export class ArtistModule {}
