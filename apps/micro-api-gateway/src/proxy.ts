import { Inject, Injectable, Logger, Req, Res } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JSONObject, TYPES } from './utils/types';
import { handleError, success } from './utils/responses';
import { Request, Response } from 'express';

@Injectable()
export class ProxyService {
  private readonly userSvc: any;

  constructor(
    @Inject(TYPES.USER_SVC_CLIENT) private readonly userClient: ClientGrpc,
  ) {
    this.userSvc = this.userClient.getService('UserService');
  }

  async send(
    @Req() req: Request,
    @Res() res: Response,
    service: string,
    endpoint: string,
    data: JSONObject = {},
    returnHttpResponse = true,
  ): Promise<any> {
    let svc = null;
    switch (service) {
      case TYPES.USER_SVC_CLIENT:
        svc = this.userSvc;
        break;
      default:
        throw new Error('Invalid service name');
    }

    try {
      //   const { data: reqData, grpcMetadata } = prepGRPCPayload(req, data);
      const response = await svc[endpoint](data).toPromise();

      if (!returnHttpResponse) {
        return response;
      }
      return success(res, response);
    } catch (err) {
      Logger.error(
        err,
        `Error making grpc call to microservice: ${service} - endpoint: ${endpoint} - ${JSON.stringify(
          this.removeSensititiveDetails(data),
        )} `,
      );
      handleError(res, err.message);
    }
  }

  removeSensititiveDetails(data): any {
    delete data.password;
    delete data.otp;
    delete data.token;
    return data;
  }
}
