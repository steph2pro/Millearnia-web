import { useMutation, useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useDeleteCategory = (
  professionCategoryId: number,
  repository: ProfessionRepositoryImpl
) => {
  const notify = useNotification();

  return useMutation(
    async () => await repository.deleteProfessionCategory(professionCategoryId),
    {
      onSuccess: () => {
        notify.success(`Category deleted successfully!`);
      },
      onError: () => {
        notify.error("Failed to delete Category.");
      },
    }
  );
};
