import UserNetworkService from "./UserNetworkService";
import wait from "../../../presentation/utils/wait";
import {Http} from "../../../services/Http";
import UserPorps from "../../models/User";
import UserRequest from "../../models/UserRequest";
import PaginatedResponse from "@/data/models/userResponse";

export default class UserNetworkServiceImpl implements UserNetworkService {
    async login(identifier: string, password: string): Promise<UserPorps> {
        const res = await Http.post<UserPorps>('/auth/loginAdmin', { identifier, password });
      
              return res.data;
    }
    

    async logout(): Promise<UserPorps> {
        const res = await fetch("http://localhost:3005/logout");
        return await res.json();
    }

    async createUser(user: UserRequest): Promise<UserPorps> {
      const formData = new FormData();
        for (const key in user) {
          formData.append(key, user[key]);
        }
        const res = await Http.post<UserPorps>("user-store",   formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return await res.data;
      }
      async getUsers(page: number = 1, perPage?: number ): Promise<PaginatedResponse> {
        const res = await Http.get<PaginatedResponse>(`user-index?page=${page}&perPage=${perPage}`);
        return res.data;
      }
    async getUsersPaginate(page:number,perPage:number): Promise<PaginatedResponse> {
        const res = await Http.get<PaginatedResponse>(`user-index?page=${page}&perPage=${perPage}`);
        return await res.data;
      }
      async getUserById(UserId: number): Promise<UserPorps> {
        const res = await Http.get<UserPorps>(`user-show/${UserId}`);
        return await res.data;
      }
      async updateUser(user: UserRequest): Promise<UserPorps> {
      const formData = new FormData();
        for (const key in user) {
          formData.append(key, user[key]);
        }
        const res = await Http.put<UserPorps>(`user-update/${user.id}`,    formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return await res.data;
      }
      
      async deleteUser(userId: number): Promise<string> {
        const res = await Http.delete<string>(`user-destroy/${userId}`);
        return await res.data;
      }


}