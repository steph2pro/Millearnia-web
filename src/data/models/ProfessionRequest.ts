 type ProfessionRequest ={
    professionId: number; 
    name: string;         // Nom de la profession
    userId: number;       // ID de l'utilisateur associé
    categoryId: number;   // ID de la catégorie associée
    tabs: string[];       // Liste des onglets ou catégories liées à la profession
};
export default ProfessionRequest;
