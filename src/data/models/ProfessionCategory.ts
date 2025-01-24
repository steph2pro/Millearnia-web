import Profession from "./Profession";

type ProfessionCategory ={
    id: number;
    title: string;
    icon: string;
    professions: Profession[];  // Liste des professions dans cette catégorie
  }
  export default ProfessionCategory;