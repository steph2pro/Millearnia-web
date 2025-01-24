import {UserRepository} from "../../domain/repositories/UserRepository";
import UserPorps from "../models/User";
import UserNetworkService from "../datasources/network/UserNetworkService";
import UserRequest from "../models/UserRequest";

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
    async getUsers(): Promise<UserPorps[]>  {
        return await this.dataSource.getUsers();
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