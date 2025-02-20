import ProfessionCategoryRequest from '@/data/models/ProfessionCategoryRequest';
import Profession from '../../models/Profession';
import ProfessionCategory from '../../models/ProfessionCategory';
import ProfessionComment from '../../models/ProfessionComment';
import ProfessionRequest from '../../models/ProfessionRequest';
import ProfessionVideo from '../../models/ProfessionVideo';
import ProfessionVideoRequest from '../../models/ProfessionVideoRequest';

export default interface ProfessionNetworkService{
    getProfessions(): Promise<Profession[]>;
    createtProfessions(name: string, userId: number,categoryId: number,tabs: string[]): Promise<Profession>;
    getProfessionById(professionId: number): Promise<Profession>;
    updateProfession(profession: ProfessionRequest): Promise<Profession>;
    deleteProfession(professionId: number): Promise<string>;

    createProfessionVideo(professionVideo: ProfessionVideoRequest): Promise<ProfessionVideo>;
    getProfessionVideos(): Promise<ProfessionVideo[]>;
    getProfessionVideoById(professionVideoId: number): Promise<ProfessionVideo> ;
    updateProfessionVideo(professionVideo: ProfessionVideoRequest): Promise<ProfessionVideo>;
    deleteProfessionVideo(professionVideoId: number): Promise<string>;

    getProfessionComments(): Promise<ProfessionComment[]>
    deleteProfessionComment(professionCommentId: number): Promise<string>

    // getCategories(): Promise<ProfessionCategory[]>;
    createProfessionCategory(professionCategory: ProfessionCategoryRequest): Promise<ProfessionCategory>
    getProfessionCategorys(): Promise<ProfessionCategory[]>
    getProfessionCategoryById(professionCategoryId: number): Promise<ProfessionCategory>
    updateProfessionCategory(professionCategory: ProfessionCategoryRequest): Promise<ProfessionCategory>
    deleteProfessionCategory(professionCategoryId: number): Promise<string> 
}
