import UserNetworkService from "./UserNetworkService";
import wait from "../../../presentation/utils/wait";
import {Http} from "../../../services/Http";
import UserPorps from "../../models/User";
import UserRequest from "../../models/UserRequest";

export default class UserNetworkServiceImpl implements UserNetworkService {
    async login(identifier: string, password: string): Promise<UserPorps> {
        const res = await Http.post<UserPorps>('/auth/login', { identifier, password });
      
              return res.data;
    }
    

    async logout(): Promise<UserPorps> {
        const res = await fetch("http://localhost:3005/logout");
        return await res.json();
    }

    async createUser(user: UserRequest): Promise<UserPorps> {
        const res = await Http.post<UserPorps>("user-store", user);
        return await res.data;
      }
    async getUsers(): Promise<UserPorps[]> {
        const res = await Http.get<UserPorps[]>("user-index");
        return await res.data;
      }
      async getUserById(UserId: number): Promise<UserPorps> {
        const res = await Http.get<UserPorps>(`user-show/${UserId}`);
        return await res.data;
      }
      async updateUser(user: UserRequest): Promise<UserPorps> {
        const res = await Http.put<UserPorps>(`user-update/${user.id}`, user);
        return await res.data;
      }
      
      async deleteUser(userId: number): Promise<string> {
        const res = await Http.delete<string>(`user-destroy/${userId}`);
        return await res.data;
      }


}