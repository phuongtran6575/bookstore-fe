import type { Role, User } from "../../core/Types"
import { createCrudService, createRelationshipService } from "./baseService"

export const userService = createCrudService<User>("/users")

export const roleService = createCrudService<Role>("/roles")

export const useroleService =createRelationshipService("/userroles","user_id","role_id")