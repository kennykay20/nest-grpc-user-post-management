import { ClientsModule, Transport } from '@nestjs/microservices';
import { TYPES } from './utils/types';
import { USER_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { config } from './config';

export const microservices = [
  ClientsModule.registerAsync([
    {
      name: TYPES.USER_SVC_CLIENT,
      useFactory: () => ({
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../../app/user/user.proto'),
          url: `0.0.0.0:${config.postServiceUrl}`,
        },
      }),
    },
  ]),
];
