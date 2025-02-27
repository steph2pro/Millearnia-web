import { useMutation } from "@tanstack/react-query";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import Profession from "../../data/models/Profession";
import { useNotification } from "../../services/useNotification";
import ProfessionRequest from '../../data/models/ProfessionRequest';

interface AddProfessionParams {
  name: string;
  userId: number;
  categoryId: number;
  tabs: string[];
}

export const useAddProf = (repository: ProfessionRepositoryImpl) => {
  const notify = useNotification();

  return useMutation<Profession, Error, AddProfessionParams>(
    async (ProfessionRequest) => {
      // Appelle la méthode pour créer une profession via le repository
      return await repository.createtProfessions(ProfessionRequest);
    },
    {
      onSuccess: () => {
        // Affiche une notification de succès
        notify.success("Profession créée avec succès !");
      },
      onError: (error: Error) => {
        // Affiche une notification d'erreur avec les détails
        notify.error(`La création a échoué : ${error.message}`);
      },
    }
  );
};
