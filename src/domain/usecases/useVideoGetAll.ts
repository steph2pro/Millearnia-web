import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useGetAllVideos = (repository: ProfessionRepositoryImpl) => {
  const notify = useNotification();

  return useQuery(
    ["videos"], // Clé unique pour identifier cette requête
    async () => await repository.getProfessionVideos(), 
    {
      onSuccess: () => {
        notify.success("videos fetched successfully!");
      },
      onError: () => {
        notify.error("Failed to fetch videos.");
      },
      staleTime: 1000 * 60 * 5, // Durée avant de marquer les données comme obsolètes (5 minutes)
    }
  );
};
