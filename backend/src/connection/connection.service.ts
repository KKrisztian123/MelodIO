import { Injectable } from '@nestjs/common';
import { successResponse } from 'src/utils/utils';

@Injectable()
export class ConnectionService {
  getConnectionInfo(): APIResponse<object> {
    return successResponse({ valid: true });
  }
}
