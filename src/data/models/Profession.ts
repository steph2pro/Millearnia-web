import Interest from "./Interest";
import ProfessionCategory from "./ProfessionCategory";
import ProfessionComment from "./ProfessionComment";
import ProfessionInterest from "./ProfessionInterest";
import ProfessionVideo from "./ProfessionVideo";
import UserPorps from "./User";

 type Profession = {
    id: number;
    name: string;
    userId: number;
    categoryId: number;
    thumbnail: string;
    category: ProfessionCategory;  // Typage de la catégorie associée
    // user: UserPorps;  // Typage de l'utilisateur associé
    videos: ProfessionVideo[];  // Liste des vidéos associées
    comments?: ProfessionComment[];  // Liste des commentaires associés
    interests?: Interest[];
    professionInterests?: ProfessionInterest[];
    
  }
  export default Profession;