import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.getAllAndOverride<Permissions[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );
    if (!permissions) return true;

    const { user } = context.switchToHttp().getRequest();

    return permissions.some((permission) =>
      user.permissions?.includes(permission),
    );
  }
}
