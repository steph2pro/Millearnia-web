import Profession from "./Profession";
import ProfessionVideo from "./ProfessionVideo";
import UserPorps from "./User";

type ProfessionComment ={
    id: number;
    senderId: number;
    professionVideoId: number;
    professionId: number;
    profession: Profession;  // La profession à laquelle ce commentaire est associé
    content: string;
    createdAt: string; 
    updatedAt: string;  
    parentId: number;  
    parent: ProfessionComment;  
    replies: ProfessionComment[];  
    // video: ProfessionVideo;  
    // sender: UserPorps;  
    video?: ProfessionVideo;
    sender?: UserPorps;
  }
  export default ProfessionComment;