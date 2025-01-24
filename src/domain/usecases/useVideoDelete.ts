import { useMutation, useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useDeleteVideo = (
  professionVideoId: number,
  repository: ProfessionRepositoryImpl
) => {
  const notify = useNotification();

  return useMutation(
    async () => await repository.deleteProfessionVideo(professionVideoId),
    {
      onSuccess: () => {
        notify.success(`video deleted successfully!`);
      },
      onError: () => {
        notify.error("Failed to delete video.");
      },
    }
  );
};
