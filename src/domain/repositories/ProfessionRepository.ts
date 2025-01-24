import Profession from '../../data/models/Profession';
import ProfessionCategory from '../../data/models/ProfessionCategory';
import ProfessionComment from '../../data/models/ProfessionComment';
import ProfessionRequest from '../../data/models/ProfessionRequest';
import ProfessionVideo from '../../data/models/ProfessionVideo';
import ProfessionVideoRequest from '../../data/models/ProfessionVideoRequest';

export interface ProfessionRepository{
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

    getCategories(): Promise<ProfessionCategory[]>;
}