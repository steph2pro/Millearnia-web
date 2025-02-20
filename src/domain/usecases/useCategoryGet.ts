import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useGetCategoryById = (
  professionCategoryId: number,
  repository: ProfessionRepositoryImpl
) => {
  const notify = useNotification();

  return useQuery(
    ["category", professionCategoryId], // Clé unique avec professionId
    async () => await repository.getProfessionCategoryById(professionCategoryId),
    {
      // onSuccess: () => {
      //   notify.success(`Category  fetched successfully!`);
      // },
      // onError: () => {
      //   notify.error("Failed to fetch Category.");
      // },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};
