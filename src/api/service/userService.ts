import type { Role, User } from "../../core/Types"
import { createCrudService } from "./baseService"

export const userService = createCrudService<User>("/users")

export const roleService = createCrudService<Role>("/roles")