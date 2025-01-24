import { useMutation, useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useDeleteComment = (
  professionCommentId: number,
  repository: ProfessionRepositoryImpl
) => {
  const notify = useNotification();

  return useMutation(
    async () => await repository.deleteProfessionComment(professionCommentId),
    {
      onSuccess: () => {
        notify.success(`Comment deleted successfully!`);
      },
      onError: () => {
        notify.error("Failed to delete Comment.");
      },
    }
  );
};
