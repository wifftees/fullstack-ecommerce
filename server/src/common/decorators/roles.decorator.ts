import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const Admin = () => SetMetadata(ROLES_KEY, ['ADMIN']);

export const User = () => SetMetadata(ROLES_KEY, ['USER']);
