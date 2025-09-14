import type { Role, User } from "../../core/Types";
import { roleService, userService } from "../service/userService";
import { useCrud } from "./useBaseHook";

const crudUser = useCrud<User>("users", userService);

export const useGetListUsers = crudUser.useGetList;
export const useGetUserById = crudUser.useGetById;
export const useCreateUser = crudUser.useCreate;
export const useUpdateUser = crudUser.useUpdate;
export const useDeleteUser = crudUser.useDelete;

const crudRole = useCrud<Role>("roles", roleService);

export const useGetListRoles = crudRole.useGetList;
export const useGetRoleById = crudRole.useGetById;
export const useCreateRole = crudRole.useCreate;
export const useUpdateRole = crudRole.useUpdate;
export const useDeleteRole = crudRole.useDelete;