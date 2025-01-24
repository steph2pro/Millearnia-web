import { useMutation } from "@tanstack/react-query";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import Profession from "../../data/models/Profession";
import { useNotification } from "../../services/useNotification";

interface AddProfessionParams {
  name: string;
  userId: number;
  categoryId: number;
  tabs: string[];
}

export const useAddProf = (repository: ProfessionRepositoryImpl) => {
  const notify = useNotification();

  return useMutation<Profession, Error, AddProfessionParams>(
    async ({ name, userId, categoryId, tabs }) => {
      // Appelle la méthode pour créer une profession via le repository
      return await repository.createtProfessions(name, userId, categoryId, tabs);
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
