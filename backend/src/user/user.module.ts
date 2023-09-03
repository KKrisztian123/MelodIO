import { Module } from '@nestjs/common';
import { DbModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DbModule],
})
export class UserModule {}
