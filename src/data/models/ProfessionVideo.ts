import Profession from "./Profession";
import ProfessionComment from "./ProfessionComment";

type ProfessionVideo ={
    id: number;
    thumbnail: string;  
    title:string;// URL de la miniature de la vidéo
    professionId: number;
    youtubeId: string;  // ID de la vidéo YouTube
    profession: Profession;  // Profession à laquelle cette vidéo est associée
    comments: ProfessionComment[];  // Liste des commentaires sur cette vidéo
    
  }
  export default ProfessionVideo;