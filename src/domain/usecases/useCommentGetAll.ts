import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useGetAllComments = (repository: ProfessionRepositoryImpl) => {
  const notify = useNotification();

  return useQuery(
    ["comments"], // Clé unique pour identifier cette requête
    async () => await repository.getProfessionComments(), 
    {
      onSuccess: () => {
        notify.success("Comments fetched successfully!");
      },
      onError: () => {
        notify.error("Failed to fetch Comments.");
      },
      staleTime: 1000 * 60 * 5, // Durée avant de marquer les données comme obsolètes (5 minutes)
    }
  );
};
