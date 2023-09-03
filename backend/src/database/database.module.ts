import { Module } from '@nestjs/common';
import { MYSQL_CONNECTION } from '../constants';
import { createConnection } from 'mysql2/promise';

const dbProvider = {
  provide: MYSQL_CONNECTION,
  useValue: createConnection({
    user: 'root',
    host: 'database',
    database: 'MelodIO',
    password: 'root',
    port: 3306,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
