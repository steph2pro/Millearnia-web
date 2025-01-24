import { ProfessionRepository } from '../../domain/repositories/ProfessionRepository';
import ProfessionNetworkService from '../datasources/network/ProfessionNetworkService';
import Profession from '../models/Profession';
import ProfessionCategory from '../models/ProfessionCategory';
import ProfessionComment from '../models/ProfessionComment';
import ProfessionRequest from '../models/ProfessionRequest';
import ProfessionVideo from '../models/ProfessionVideo';
import ProfessionVideoRequest from '../models/ProfessionVideoRequest';


export default class ProfessionRepositoryImpl implements ProfessionRepository {

    dataSource: ProfessionNetworkService

    constructor(dataSource: ProfessionNetworkService) {
        this.dataSource = dataSource;
    }

    async getProfessions(): Promise<Profession[]> {
        return await this.dataSource.getProfessions();
    }
    async createtProfessions(name: string, userId: number,categoryId: number,tabs: string[]): Promise<Profession> {
         return await this.dataSource.createtProfessions(name,userId,categoryId,tabs);
    }
    async getProfessionById(professionId: number): Promise<Profession> {
        return await this.dataSource.getProfessionById(professionId);
    }
    async updateProfession(profession: ProfessionRequest): Promise<Profession> {
         return await this.dataSource.updateProfession(profession);
    }
    async deleteProfession(professionId: number): Promise<string> {
         return await this.dataSource.deleteProfession(professionId);
    }

    
    async createProfessionVideo(professionVideo: ProfessionVideoRequest): Promise<ProfessionVideo> {
         return await this.dataSource.createProfessionVideo(professionVideo);
    }
    async getProfessionVideos(): Promise<ProfessionVideo[]>{
        return await this.dataSource.getProfessionVideos();
    }
    async getProfessionVideoById(professionVideoId: number): Promise<ProfessionVideo>  {
        return await this.dataSource.getProfessionVideoById(professionVideoId);
    }
    async updateProfessionVideo(professionVideo: ProfessionVideoRequest): Promise<ProfessionVideo>{
         return await this.dataSource.updateProfessionVideo(professionVideo);
    }
    async deleteProfessionVideo(professionVideoId: number): Promise<string> {
         return await this.dataSource.deleteProfessionVideo(professionVideoId);
    }


    async getProfessionComments(): Promise<ProfessionComment[]>{
        return await this.dataSource.getProfessionComments();
    }
    async deleteProfessionComment(professionCommentId: number): Promise<string> {
         return await this.dataSource.deleteProfessionComment(professionCommentId);
    }


    async getCategories(): Promise<ProfessionCategory[]> {
        return await this.dataSource.getCategories();
    }


}