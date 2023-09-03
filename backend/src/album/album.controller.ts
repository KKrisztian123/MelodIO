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
import { checkEmpty, errorResponse, successResponse } from 'src/utils/utils';
import { Request as RequestType } from 'express';
import { AlbumService } from './album.service';
import { ArtistService } from 'src/artist/artist.service';

@Controller('albums')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}
  @Get()
  @UseGuards(AuthGuard)
  async getAlbums(
    @Req() req: RequestType,
    @Query('albumIds') albumIds: string | string[],
  ) {
    if (albumIds) {
      const albums = await this.albumService.getListOfAlbums(
        Array.isArray(albumIds) ? albumIds : [albumIds],
        req.protocol,
        req.get('host'),
      );

      return typeof albums === 'string'
        ? errorResponse(albums)
        : successResponse(albums);
    }

    return successResponse(
      await this.albumService.getAllAlbums(req.protocol, req.get('host')),
    );
  }

  @Post('new')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createAlbum(@Body() body, @UploadedFile() file) {
    const fileData = body.image ?? file;
    if (fileData === 'false')
      return errorResponse('Az album fotó feltöltése kötelező!');
    if (!checkEmpty(body)) return errorResponse('Üres mezők!');

    const { imageUrl, fileType } = this.albumService.uploadAlbumImage(file);
    const userResult = await this.albumService.createAlbum({
      name: body.name,
      releaseDate: body.releaseDate,
      albumType: body.kislemez == 'true' ? 'Kislemez' : 'Album',
      artistIds: body.artistIds,
      imageUrl,
      fileType,
    });

    return typeof userResult === 'string'
      ? errorResponse(userResult)
      : successResponse({});
  }

  @Get('like')
  @UseGuards(AuthGuard)
  async getAlbumLike(@Headers() header, @Req() req: RequestType) {
    const album = await this.albumService.getLikedAlbums(
      header.authorization,
      req.protocol,
      req.get('host'),
    );

    return typeof album === 'string'
      ? errorResponse(album)
      : successResponse(album);
  }

  @Get(':albumId')
  @UseGuards(AdminAuthGuard)
  async getAlbum(@Param('albumId') albumId: string, @Req() req: RequestType) {
    const album = await this.albumService.getAlbum(albumId);
    return typeof album === 'string'
      ? errorResponse(album)
      : successResponse({
          id: album.token,
          name: album.name,
          releaseDate: album.releaseDate,
          author: album.author,
          type: album.albumType,
          image: `${req.protocol}://${req.get(
            'host',
          )}/api/uploads/images/album/${album.imageURL}.${album.imageType}`,
        });
  }

  @Post(':albumId')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateAlbum(
    @Body() body,
    @UploadedFile() file,
    @Param('albumId') albumId: string,
  ) {
    const fileData = body.image ?? file;
    if (fileData === 'false')
      return errorResponse('Az album fotó feltöltése kötelező!');
    if (!checkEmpty(body)) return errorResponse('Üres mezők!');

    const albumData = await this.albumService.getAlbum(albumId);
    if (typeof albumData === 'string') return errorResponse(albumData);

    const { imageUrl, fileType } =
      typeof fileData === 'string'
        ? fileData === 'false'
          ? { imageUrl: '', fileType: '' }
          : { imageUrl: albumData.imageURL, fileType: albumData.imageType }
        : this.albumService.uploadAlbumImage(file);

    if (
      albumData.imageURL !== '' &&
      albumData.imageType !== '' &&
      typeof fileData !== 'string'
    )
      this.albumService.deleteAlbumImage(
        albumData.imageURL,
        albumData.imageType,
      );

    const updateState = this.albumService.updateAlbum(albumData.id, {
      name: body.name,
      imageURL: imageUrl,
      releaseDate: body.releaseDate,
      albumType: body.kislemez == 'true' ? 'Kislemez' : 'Album',
      imageType: fileType,
      artistIds: body.artistIds,
    });

    return typeof updateState === 'string'
      ? errorResponse(updateState)
      : successResponse({});
  }

  @Post(':albumId/like')
  @UseGuards(AuthGuard)
  async updateAlbumLike(
    @Headers() header,
    @Body() body,
    @Param('albumId') albumId: string,
  ) {
    const value = await this.albumService.likeAlbum(
      header.authorization,
      albumId,
      body.value,
    );

    return typeof value === 'string'
      ? errorResponse(value)
      : successResponse({ value: value });
  }
}
