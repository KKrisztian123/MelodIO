import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { AdminAuthGuard, AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { checkEmpty, errorResponse, successResponse } from 'src/utils/utils';
import { Request as RequestType } from 'express';

@Controller('artists')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getArtists(
    @Req() req: RequestType,
    @Query('artistIds') artistIds: string | string[],
  ) {
    if (artistIds) {
      const artists = await this.artistService.getListOfArtists(
        Array.isArray(artistIds) ? artistIds : [artistIds],
        req.protocol,
        req.get('host'),
      );

      return typeof artists === 'string'
        ? errorResponse(artists)
        : successResponse(artists);
    }

    return successResponse(
      await this.artistService.getAllArtists(req.protocol, req.get('host')),
    );
  }

  @Post('new')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createArtist(@Body() body, @UploadedFile() file) {
    const fileData = body.image ?? file;
    if (fileData === 'false')
      return errorResponse('Az előadó fotó feltöltése kötelező!');
    if (!checkEmpty(body)) return errorResponse('Üres mezők!');

    const { imageUrl, fileType } = this.artistService.uploadArtistImage(file);
    const userResult = await this.artistService.createArtist({
      name: body.name,
      imageUrl,
      fileType,
    });

    return typeof userResult === 'string'
      ? errorResponse(userResult)
      : successResponse({});
  }

  @Get(':artistId')
  @UseGuards(AdminAuthGuard)
  async getArtist(
    @Param('artistId') artistId: string,
    @Req() req: RequestType,
  ) {
    const artist = await this.artistService.getArtist(artistId);
    return typeof artist === 'string'
      ? errorResponse(artist)
      : successResponse({
          id: artist.token,
          name: artist.name,
          image: `${req.protocol}://${req.get('host')}/uploads/images/artist/${
            artist.imageURL
          }.${artist.imageType}`,
        });
  }

  @Post(':artistId')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateArtist(
    @Body() body,
    @UploadedFile() file,
    @Param('artistId') artistId: string,
  ) {
    const fileData = body.image ?? file;
    if (fileData === 'false')
      return errorResponse('Az előadó fotó feltöltése kötelező!');
    if (!checkEmpty(body)) return errorResponse('Üres mezők!');

    const artistData = await this.artistService.getArtist(artistId);
    if (typeof artistData === 'string') return errorResponse(artistData);

    const { imageUrl, fileType } =
      typeof fileData === 'string'
        ? fileData === 'false'
          ? { imageUrl: '', fileType: '' }
          : { imageUrl: artistData.imageURL, fileType: artistData.imageType }
        : this.artistService.uploadArtistImage(file);

    if (
      artistData.imageURL !== '' &&
      artistData.imageType !== '' &&
      typeof fileData !== 'string'
    )
      this.artistService.deleteArtistImage(
        artistData.imageURL,
        artistData.imageType,
      );
    const updateState = this.artistService.updateArtist(artistData.id, {
      name: body.name,
      imageURL: imageUrl,
      imageType: fileType,
    });

    return updateState && successResponse({});
  }
}
