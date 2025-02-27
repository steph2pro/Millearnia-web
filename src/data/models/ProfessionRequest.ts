 type ProfessionRequest ={
    professionId: number; 
    name: string; 
    thumbnail: File;
    userId: number;       // ID de l'utilisateur associé
    categoryId: number;   // ID de la catégorie associée
    interests: number[];       
};
export default ProfessionRequest;
