import { useMutation } from "@tanstack/react-query";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import { useNotification } from "../../services/useNotification";
import ProfessionCategoryRequest from "../../data/models/ProfessionCategoryRequest";



export const useAddCategory = (repository: ProfessionRepositoryImpl) => {
  const notify = useNotification();

  return useMutation(
    async (professionCategory:ProfessionCategoryRequest) => {
      // Appelle la méthode pour créer une Category via le repository
      return await repository.createProfessionCategory(professionCategory);
    },
    {
      onSuccess: () => {
        // Affiche une notification de succès
        notify.success("Category créée avec succès !");
      },
      onError: (error: Error) => {
        // Affiche une notification d'erreur avec les détails
        notify.error(`La création a échoué : ${error.message}`);
      },
    }
  );
};
