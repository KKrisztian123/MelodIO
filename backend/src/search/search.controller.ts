import {
  Controller,
  Get,
  Headers,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { errorResponse, successResponse } from 'src/utils/utils';
import { SearchService } from './search.service';
import { Request as RequestType } from 'express';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getSearchResult(
    @Headers() headers,
    @Query('search') search: string,
    @Req() req: RequestType,
  ) {
    const result = await this.searchService.getSearchResult(
      headers.authorization,
      search,
      req.protocol,
      req.get('host'),
    );
    return typeof result !== 'string'
      ? successResponse(result)
      : errorResponse(result);
  }
}
