import ProfessionCategory from "./ProfessionCategory";
import ProfessionComment from "./ProfessionComment";
import ProfessionVideo from "./ProfessionVideo";
import UserPorps from "./User";

 type Profession = {
    id: number;
    name: string;
    userId: number;
    tabs: string[];
    categoryId: number;
    thumbnail: string;
    category: ProfessionCategory;  // Typage de la catégorie associée
    // user: UserPorps;  // Typage de l'utilisateur associé
    videos: ProfessionVideo[];  // Liste des vidéos associées
    comments?: ProfessionComment[];  // Liste des commentaires associés
    
  }
  export default Profession;