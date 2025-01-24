import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useGetAllCategories = (repository: ProfessionRepositoryImpl) => {
  const notify = useNotification();

  return useQuery(
    ["categories"], // Clé unique pour identifier cette requête
    async () => await repository.getCategories(), 
    {
      onSuccess: () => {
        notify.success("Categories fetched successfully!");
      },
      onError: () => {
        notify.error("Failed to fetch Categories.");
      },
      staleTime: 1000 * 60 * 5, // Durée avant de marquer les données comme obsolètes (5 minutes)
    }
  );
};
