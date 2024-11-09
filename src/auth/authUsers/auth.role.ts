import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/dto/create-user.dto'; 

export const ROLES_KEY = 'role';
export const papel = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user; 
    },
);