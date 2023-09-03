import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('uploads')
export class UploadsController {
  @Get('*')
  serveFile(@Param('0') filePath: string, @Res() res: Response) {
    const requestedFilePath = join(__dirname, '..', '..', 'uploads', filePath);
    res.sendFile(requestedFilePath);
  }
}
