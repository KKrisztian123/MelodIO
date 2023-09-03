import { Controller, Get } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Controller('checkConnection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Get()
  getConectionInfo(): APIResponse<object> {
    return this.connectionService.getConnectionInfo();
  }
}
