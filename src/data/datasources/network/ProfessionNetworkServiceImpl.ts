
import Profession from '../../models/Profession';
import ProfessionCategory from '../../models/ProfessionCategory';
import ProfessionNetworkService from "./ProfessionNetworkService";
import { Http } from '../../../services/Http';
import ProfessionRequest from '../../models/ProfessionRequest';
import ProfessionVideo from '../../models/ProfessionVideo';
import ProfessionVideoRequest from '../../models/ProfessionVideoRequest';
import ProfessionComment from '../../models/ProfessionComment';
import ProfessionCategoryRequest from '@/data/models/ProfessionCategoryRequest';

export default class ProfessionNetworkServiceImpl implements ProfessionNetworkService {
   
      async getProfessions(): Promise<Profession[]> {
        const res = await Http.get<{ professions: Profession[] }>("orientation-getAllPof");
        return res.data.professions; // 🔥 Assure-toi d'extraire le tableau
    }
    async createtProfessions(profession: ProfessionRequest): Promise<Profession> {
      const formData = new FormData();
      for (const key in profession) {
        formData.append(key, profession[key]);
      }
        const res = await Http.post<Profession>("orientation-createPof", formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return await res.data;
    }

    async getProfessionById(professionId: number): Promise<Profession> {
        const res = await Http.get<Profession>(`orientation-getPofById/${professionId}`);
        return await res.data;
    }
    async deleteProfession(professionId: number): Promise<string> {
        const res = await Http.delete<string>(`orientation-deleteProf/${professionId}`);
        return await res.data;
    }
    
    async updateProfession(profession: ProfessionRequest): Promise<Profession> {
      const formData = new FormData();
      for (const key in profession) {
        console.log(key, profession[key]); // Ajoutez un log pour vérifier les données
        formData.append(key, profession[key]);
      }
      
        const res = await Http.put<Profession>(`orientation-updatePof/${profession.professionId}`, formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return await res.data;
    }

    
      async createProfessionVideo(professionVideo: ProfessionVideoRequest): Promise<ProfessionVideo> {
        const formData = new FormData();
        for (const key in professionVideo) {
          console.log(key, professionVideo[key]); // Ajoutez un log pour vérifier les données
          formData.append(key, professionVideo[key]);
        }
        const res = await Http.post<ProfessionVideo>("orientation-createVideo",  formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return await res.data;
      }
    async getProfessionVideos(): Promise<ProfessionVideo[]> {
        const res = await Http.get<ProfessionVideo[]>("orientation-getAllVideo");
        return await res.data;
      }
      async getProfessionVideoById(professionVideoId: number): Promise<ProfessionVideo> {
        const res = await Http.get<ProfessionVideo>(`orientation-getVideoById/${professionVideoId}`);
        return await res.data;
      }
      async updateProfessionVideo(professionVideo: ProfessionVideoRequest): Promise<ProfessionVideo> {
        const formData = new FormData();
        for (const key in professionVideo) {
          formData.append(key, professionVideo[key]);
        }
        const res = await Http.put<ProfessionVideo>(`orientation-updateVideo/${professionVideo.id}`,   formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return await res.data;
      }
      
      async deleteProfessionVideo(professionVideoId: number): Promise<string> {
        const res = await Http.delete<string>(`orientation-deleteVideo/${professionVideoId}`);
        return await res.data;
      }

      
    async getProfessionComments(): Promise<ProfessionComment[]> {
        const res = await Http.get<ProfessionComment[]>("orientation-getAllComments");
        return await res.data;
      }
      async deleteProfessionComment(professionCommentId: number): Promise<string> {
        const res = await Http.delete<string>(`orientation-deleteComment/${professionCommentId}`);
        return await res.data;
      }
    
    
    // async getCategories(): Promise<ProfessionCategory[]> {
    //     const res = await fetch("http://localhost:3333/api/orientation-getAllCat");
    //     return await res.json();
    // } 
    async createProfessionCategory(professionCategory: ProfessionCategoryRequest): Promise<ProfessionCategory> {
         const formData = new FormData();
        for (const key in professionCategory) {
          formData.append(key, professionCategory[key]);
        }
        const res = await Http.post<ProfessionCategory>("orientation-createCategory",  formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return await res.data;
      }
    async getProfessionCategorys(): Promise<ProfessionCategory[]> {
        const res = await Http.get<{ categories : ProfessionCategory[]}>("orientation-getAllCategory");
        return await res.data.categories;
      }
      async getProfessionCategoryById(professionCategoryId: number): Promise<ProfessionCategory> {
        const res = await Http.get<ProfessionCategory>(`/orientation-getCategoryById/${professionCategoryId}`);
        return await res.data;
      }
      async updateProfessionCategory(professionCategory: ProfessionCategoryRequest): Promise<ProfessionCategory> {
        const formData = new FormData();
        for (const key in professionCategory) {
          formData.append(key, professionCategory[key]);
        }
        const res = await Http.put<ProfessionCategory>(`/orientation-updateCategory/${professionCategory.id}`,   formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return await res.data;
      }
      
      async deleteProfessionCategory(professionCategoryId: number): Promise<string> {
        const res = await Http.delete<string>(`/orientation-deleteCategory/${professionCategoryId}`);
        return await res.data;
      }
}