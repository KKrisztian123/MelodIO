import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('play')
export class PlayController {
  @Get(':songId')
  serveFile(@Param('songId') filePath: string, @Res() res: Response) {
    const requestedFilePath = join(
      __dirname,
      '..',
      '..',
      'uploads',
      'songs',
      filePath,
    );
    res.sendFile(requestedFilePath);
  }
}
