
import { InterestRepository } from "../../domain/repositories/InterestRepository";
import InterestNetworkService from "../datasources/network/InterestNetworkService";
import Interest from "../models/Interest";
import InterestRequest from "../models/InterestRequest";

export default class InterestRepositoryImpl implements InterestRepository {

    dataSource: InterestNetworkService

    constructor(dataSource: InterestNetworkService) {
        this.dataSource = dataSource;
    }

    async createInterest(Interest: InterestRequest): Promise<Interest>  {
        return await this.dataSource.createInterest(Interest);
    }
    async getInterests(): Promise<Interest[]>  {
        return await this.dataSource.getInterests();
    }

    async getInterestById(InterestId: number): Promise<Interest> {
        return await this.dataSource.getInterestById(InterestId);
    }
    async updateInterest(Interest: InterestRequest): Promise<Interest> {
        return await this.dataSource.updateInterest(Interest);
    }
    async deleteInterest(InterestId: number): Promise<string> {
        return await this.dataSource.deleteInterest(InterestId);
    }


}