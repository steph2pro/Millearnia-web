import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionCategoryRequest from "../../data/models/ProfessionCategoryRequest";

export const useUpdateCategory = (repository: ProfessionRepositoryImpl) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  return useMutation(
    async (professionCategory: ProfessionCategoryRequest) =>
      await repository.updateProfessionCategory(
        professionCategory
      ),
    {
      onSuccess: (updatedProfessionCategory) => {
        notify.success(`Category updated successfully!`);
        // Invalidate queries related to Category to refresh data
        queryClient.invalidateQueries(["category", updatedProfessionCategory.id]);
      },
      onError: () => {
        notify.error("Failed to update Category.");
      },
    }
  );
};
