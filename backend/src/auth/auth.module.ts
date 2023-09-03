import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { DbModule } from 'src/database/database.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [DbModule],
})
export class AuthModule {}
