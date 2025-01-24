import UserPorps from "../../models/User";
import UserRequest from "../../models/UserRequest";

export default interface UserNetworkService{
    login(identifier: string, password: string): Promise<UserPorps>;
    logout(user: UserPorps): Promise<UserPorps>;
    getUsers(): Promise<UserPorps[]>;
    createUser(user: UserRequest): Promise<UserPorps> 
    getUsers(): Promise<UserPorps[]> 
    getUserById(UserId: number): Promise<UserPorps>
    updateUser(user: UserRequest): Promise<UserPorps>
    deleteUser(userId: number): Promise<string>
}
