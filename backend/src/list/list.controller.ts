import {
  Controller,
  Get,
  Headers,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ListService } from './list.service';
import { Request as RequestType } from 'express';
import { successResponse } from 'src/utils/utils';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}
  @Get('releases')
  @UseGuards(AuthGuard)
  async getLatestReleases(@Req() req: RequestType) {
    const releases = await this.listService.latestReleases(
      req.protocol,
      req.get('host'),
    );
    return successResponse(releases);
  }

  @Get('album/:albumId')
  @UseGuards(AuthGuard)
  async getALbumWithSongList(
    @Headers() headers,
    @Req() req: RequestType,
    @Param('albumId') albumId: string,
  ) {
    const releases = await this.listService.albumWithSongList(
      headers.authorization,
      req.protocol,
      req.get('host'),
      albumId,
    );
    return successResponse(releases);
  }
}
