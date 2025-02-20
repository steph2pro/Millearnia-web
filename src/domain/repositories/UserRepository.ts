import PaginatedResponse from "@/data/models/userResponse";
import UserPorps from "../../data/models/User";
import UserRequest from "../../data/models/UserRequest";

export interface UserRepository{
    login(identifier: string, password: string): Promise<UserPorps>;
    logout(user: UserPorps): Promise<UserPorps>;
    createUser(user: UserRequest): Promise<UserPorps> 
    getUsers(page?: number, perPage?: number): Promise<PaginatedResponse>;
    getUsersPaginate(page:number,perPage:number): Promise<PaginatedResponse>
    getUserById(UserId: number): Promise<UserPorps>
    updateUser(user: UserRequest): Promise<UserPorps>
    deleteUser(userId: number): Promise<string>
}