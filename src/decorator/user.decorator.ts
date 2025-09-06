import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const tokendecode = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const token = request['headers'].authorization.split(' ')[1];
  const decode = jwt.verify(token, 'karthick');
  return decode;
});
