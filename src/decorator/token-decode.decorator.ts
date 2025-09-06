import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const tokendecode = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const token = request['headers'].authorization.split(' ')[1];
  const token_secret = process.env.token_secret || 'iambackendeveloper';
  const decode = jwt.verify(token, token_secret);
  return decode;
});
