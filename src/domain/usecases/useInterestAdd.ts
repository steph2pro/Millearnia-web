import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import InterestRequest from "../../data/models/InterestRequest";
import InterestRepositoryImpl from "../../data/repositories/InterestRepositoryImpl";



export const useAddInterest = (repository:InterestRepositoryImpl) => {
  const notify = useNotification();

  return useMutation(
    async (Interest:InterestRequest) => {
      // Appelle la méthode pour créer une Interest via le repository
      return await repository.createInterest(Interest);
    },
    {
      onSuccess: () => {
        // Affiche une notification de succès
        notify.success("Interest crée avec succès !");
      },
      onError: (error: Error) => {
        // Affiche une notification d'erreur avec les détails
        notify.error(`La création a échoué : ${error.message}`);
      },
    }
  );
};
