import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  private requestObject;
  constructor(
    @Inject(CacheService) private readonly cacheService: CacheService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.requestObject = request;
    return this.validateRequest(request);
  }

  async validateRequest(request): Promise<boolean> {
    if (request.headers.user) {
      const { id } = JSON.parse(request.headers.user);

      const isForceLogout = await this.cacheService.get(`app::block::${id}`);
      if (isForceLogout) {
        await this.cacheService.remove(`app::user::${id}`);
        throw new UnauthorizedException();
      }
    }

    const result = await this.cacheService.get(`app::resource-permissions`);
    const resourcePermissions = JSON.parse(result);

    const url = `${request['method']} ${request.route.path}`;

    const currentResource = resourcePermissions?.find((doc) => doc.url === url);

    if (!currentResource) {
      return false;
    } else if (!currentResource.permission) {
      return true;
    } else {
      let user;
      const userString = request.headers.user;

      if (userString) {
        user =
          typeof userString === 'string'
            ? JSON.parse(userString)
            : JSON.parse(JSON.stringify(userString));
      } else {
        return false;
      }

      if (
        user?.permissions &&
        user?.permissions.includes(currentResource.permission)
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
}
