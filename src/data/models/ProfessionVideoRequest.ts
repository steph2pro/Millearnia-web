type ProfessionVideoRequest ={
    id: number;
    thumbnail: File;  // URL de la miniature de la vidéo
    professionId: number;
    youtubeId: string;  
    title:string;
};
export default ProfessionVideoRequest;
