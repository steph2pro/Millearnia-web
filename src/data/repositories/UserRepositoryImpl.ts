import {UserRepository} from "../../domain/repositories/UserRepository";
import UserPorps from "../models/User";
import UserNetworkService from "../datasources/network/UserNetworkService";
import UserRequest from "../models/UserRequest";
import PaginatedResponse from "../models/userResponse";

export default class UserRepositoryImpl implements UserRepository {

    dataSource: UserNetworkService

    constructor(dataSource: UserNetworkService) {
        this.dataSource = dataSource;
    }

    async login(identifier: string, password: string): Promise<UserPorps> {
        return await this.dataSource.login(identifier, password);
    }
    async createUser(user: UserRequest): Promise<UserPorps>  {
        return await this.dataSource.createUser(user);
    }
    async getUsers(page?: number, perPage?: number): Promise<PaginatedResponse>  {
        return await this.dataSource.getUsers(page,perPage);
    }
    async getUsersPaginate(page:number,perPage:number): Promise<PaginatedResponse> {
        return await this.dataSource.getUsersPaginate(page,perPage);
    }

    async getUserById(UserId: number): Promise<UserPorps> {
        return await this.dataSource.getUserById(UserId);
    }
    async updateUser(user: UserRequest): Promise<UserPorps> {
        return await this.dataSource.updateUser(user);
    }
    async deleteUser(userId: number): Promise<string> {
        return await this.dataSource.deleteUser(userId);
    }
    async logout(user: UserPorps): Promise<UserPorps> {
        return await this.dataSource.logout(user);
    }


}