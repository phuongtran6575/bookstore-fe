import type { Address, Role, User } from "../../core/Types"
import { axiosAPI, createCrudService, createRelationshipService } from "./baseService"

export const userService = createCrudService<User>("/users")

export const roleService = createCrudService<Role>("/roles")

export const useroleService =createRelationshipService("/userroles","user_id","role_id")

export const addressService = {
    AddAddressToUser: async (data: {full_name: string, full_address:string, phone_number: string, is_default: boolean})=>{
        const res = await axiosAPI.post("/addresses", data)
        return res.data
    },
    RemoveAddressFromUser: async(id: string) =>{
        await axiosAPI.delete(`/addresses/${id}`)
        
    },
    GetListAddressesUser:async (): Promise<Address[]>  =>{
        const res = await axiosAPI.get<Address[]>("/addresses", )
        return res.data
    }
}