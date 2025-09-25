import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Role, User } from "../../core/Types";
import { addressService, roleService, useroleService, userService } from "../service/userService";
import { useCrud, useRelationship } from "./useBaseHook";

export const useUserCrud = () => {
    const crudUser = useCrud<User>("users", userService);
    return {
        useGetListUser: crudUser.useGetList,
        useGetUserById: crudUser.useGetById,
        useCreateUser: crudUser.useCreate,
        useUpdateUser: crudUser.useUpdate,
        useDeleteUser: crudUser.useDelete,
    }
}

export const useRoleCrud = () => {
    const crudRole = useCrud<Role>("roles", roleService);
    return {
        useGetListRoles: crudRole.useGetList,
        useGetRoleById: crudRole.useGetById,
        useCreateRole: crudRole.useCreate,
        useUpdateRole: crudRole.useUpdate,
        useDeleteRole: crudRole.useDelete,
    }
}

export const useUserRoleRelationship = () => {
    const relationshipUserRole = useRelationship<string, string>("userroles", useroleService);
    return {
        useGetRolesByUserId: relationshipUserRole.useGetAll,
        useAddRoleToUser: relationshipUserRole.useAdd,
        useRemoveRoleFromUser: relationshipUserRole.useRemove,
    }
}

export const useGetAddrressesUSer = () =>{
    return useQuery({
        queryKey:["addresses"],
        queryFn: async () => {
           return  addressService.GetListAddressesUser()},
    })
}
export const useAddAddressToser = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data: {full_name: string, full_address:string, phone_number: string, is_default: boolean}) => addressService.AddAddressToUser(data),
        onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["addresses"] }); },
    })
}
export const useRemoveAddressFromUser = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  (id: string) => addressService.RemoveAddressFromUser(id),
        onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["addresses"] }); },
    })
}