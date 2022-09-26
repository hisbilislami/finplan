import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AttachUserCreatedBy = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    req.body.created_by = {
      id: req.user.id,
    };
    return req.body;
  },
);

export const AttachUserUpdatedBy = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    req.body.updated_by = {
      id: req.user.id,
    };
    return req.body;
  },
);
