import PaginatedResponse from "@/data/models/userResponse";
import UserPorps from "../../models/User";
import UserRequest from "../../models/UserRequest";

export default interface UserNetworkService{
    login(identifier: string, password: string): Promise<UserPorps>;
    logout(user: UserPorps): Promise<UserPorps>;
    getUsers(page?: number, perPage?: number): Promise<PaginatedResponse>;
    getUsersPaginate(page:number,perPage:number): Promise<PaginatedResponse>;
    createUser(user: UserRequest): Promise<UserPorps> 
    // getUsers(): Promise<UserPorps[]> 
    getUserById(UserId: number): Promise<UserPorps>
    updateUser(user: UserRequest): Promise<UserPorps>
    deleteUser(userId: number): Promise<string>
}
