import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private JWT: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const URL = request.originalUrl.match(/[^\/]+/g);
    const accessToken = request.headers['authorization'];
    const { _id, role } = this.JWT.checkAccessToken(accessToken);

    if (!_id) return false;
    switch (URL[0]) {
      case 'ninjas':
        console.log('role' + role);
        if (
          request.method == 'GET' ||
          (request.method == 'OPTIONS' && role >= 0)
        ) {
          return true;
        } else if (role >= 1) {
          return true;
        }
        return false;
      case 'user':
        if (request.method == 'POST') {
          return true;
        } else if (role >= 2) {
          return true;
        }
        return true;
        break;
      default:
        return true;
    }
  }
}
