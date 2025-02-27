import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import InterestRepositoryImpl from "../../data/repositories/InterestRepositoryImpl";

export const useDeleteInterest = (
  InterestId: number,
  repository: InterestRepositoryImpl
) => {
  const notify = useNotification();

  return useMutation(
    async () => await repository.deleteInterest(InterestId),
    {
      onSuccess: () => {
        notify.success(`Interest deleted successfully!`);
      },
      onError: () => {
        notify.error("Failed to delete Interest.");
      },
    }
  );
};
