import { useMutation } from "@tanstack/react-query";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import Profession from "../../data/models/Profession";
import { useNotification } from "../../services/useNotification";
import ProfessionVideoRequest from "../../data/models/ProfessionVideoRequest";



export const useAddVideo = (repository: ProfessionRepositoryImpl) => {
  const notify = useNotification();

  return useMutation(
    async (professionVideo:ProfessionVideoRequest) => {
      // Appelle la méthode pour créer une video via le repository
      return await repository.createProfessionVideo(professionVideo);
    },
    {
      onSuccess: () => {
        // Affiche une notification de succès
        notify.success("Video créée avec succès !");
      },
      onError: (error: Error) => {
        // Affiche une notification d'erreur avec les détails
        notify.error(`La création a échoué : ${error.message}`);
      },
    }
  );
};
