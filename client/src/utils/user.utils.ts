import { Role } from "../app/services/roles.service";
import { User } from "../app/services/users.service";

export type RoleLookup = Record<string, Role>;

export const reduceRolesToLookup = (roles: Role[]): RoleLookup => {
  return roles.reduce((acc, role) => {
    acc[role.id] = role;
    return acc;
  }, {} as RoleLookup);
};

export const getRoleById = (roles: RoleLookup, roleId: string) =>
  roles[roleId]?.name ?? "";

export const computeInitials = ({ first, last }: User) => {
  return `${first[0]}${last[0]}`;
};
