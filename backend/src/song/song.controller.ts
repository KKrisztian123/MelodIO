import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminAuthGuard, AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  checkEmpty,
  errorResponse,
  generateToken,
  successResponse,
} from 'src/utils/utils';
import { Request as RequestType } from 'express';
import { SongService } from './song.service';

@Controller('songs')
export class SongController {
  constructor(private songService: SongService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getSongs(
    @Req() req: RequestType,
    @Query('songIds') songIds: string | string[],
  ) {
    if (songIds) {
      const songs = await this.songService.getListOfSongs(
        Array.isArray(songIds) ? songIds : [songIds],
      );

      return typeof songs === 'string'
        ? errorResponse(songs)
        : successResponse(songs);
    }

    return successResponse(await this.songService.getAllSongs());
  }

  @Post('new')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createSong(@Body() body, @UploadedFile() file) {
    const fileData = body.file ?? file;
    if (fileData === 'false') return errorResponse('Dal feltöltése kötelező!');
    if (!checkEmpty(body)) return errorResponse('Üres mezők!');
    const token = generateToken();

    const { songUrl, fileType, originalName } = this.songService.uploadSong(
      file,
      token,
    );
    const userResult = await this.songService.createSong(
      {
        songName: body.name,
        artistIds: body.artistIds,
        albumId: body.albumId,
        fileName: originalName,
        songUrl,
        fileType,
      },
      token,
    );

    return typeof userResult === 'string'
      ? errorResponse(userResult)
      : successResponse({});
  }

  @Get('like')
  @UseGuards(AuthGuard)
  async getSongLike(@Headers() header, @Req() req: RequestType) {
    const songs = await this.songService.getLikedSongs(
      header.authorization,
      req.protocol,
      req.get('host'),
    );

    return typeof songs === 'string'
      ? errorResponse(songs)
      : successResponse(songs);
  }

  @Get(':songId')
  @UseGuards(AdminAuthGuard)
  async getSong(@Param('songId') songId: string) {
    const song = await this.songService.getSong(songId);
    return typeof song === 'string'
      ? errorResponse(song)
      : successResponse({
          id: song.token,
          name: song.songName,
          author: song.author,
          album: song.album,
          fileType: song.songType,
        });
  }

  @Post(':songId')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateSong(
    @Body() body,
    @UploadedFile() file,
    @Param('songId') songId: string,
  ) {
    const fileData = body.file ?? file;
    if (fileData === 'false') return errorResponse('Dal feltöltése kötelező!');
    if (!checkEmpty(body)) return errorResponse('Üres mezők!');

    const songData = await this.songService.getSong(songId);
    if (typeof songData === 'string') return errorResponse(songData);

    if (
      songData.songURL !== '' &&
      songData.songType !== '' &&
      typeof fileData !== 'string'
    )
      this.songService.deleteSong(songData.songURL, songData.songType);

    const { songUrl, fileType, originalName } =
      typeof fileData === 'string'
        ? fileData === 'false'
          ? { songUrl: '', fileType: '', originalName: '' }
          : {
              songUrl: songData.songURL,
              fileType: songData.songType,
              originalName: songData.fileName,
            }
        : this.songService.uploadSong(file, songData.songToken);

    const updateState = this.songService.updateSong(songData.id, {
      songName: body.name,
      artistIds: body.artistIds,
      albumId: body.albumId,
      fileName: originalName,
      songUrl,
      fileType,
    });

    return typeof updateState === 'string'
      ? errorResponse(updateState)
      : successResponse({});
  }

  @Post(':songId/like')
  @UseGuards(AuthGuard)
  async updateAlbumLike(
    @Headers() header,
    @Body() body,
    @Param('songId') albumId: string,
  ) {
    const value = await this.songService.likeSong(
      header.authorization,
      albumId,
      body.value,
    );

    return typeof value === 'string'
      ? errorResponse(value)
      : successResponse({ value: value });
  }
}
