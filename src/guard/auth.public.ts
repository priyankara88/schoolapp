import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => {
  const meta = SetMetadata(IS_PUBLIC_KEY, true);
  return meta;
};
