import {
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { errorResponse, successResponse } from 'src/utils/utils';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.validateUser({
      email: req.body.email,
      password: req.body.password,
    });
    if (typeof user === 'string') {
      return errorResponse(user);
    }
    const token = await this.authService.generateAuthToken(user.userId);
    return successResponse({ ...user, session: token });
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  async logout(@Headers() headers) {
    return {
      status: (await this.authService.removeAuthToken(headers.authorization))
        ? 'success'
        : 'error',
    };
  }
}
