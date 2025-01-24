import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useGetAllProfessions = (repository: ProfessionRepositoryImpl) => {
  const notify = useNotification();

  return useQuery(
    ["professions"], // Clé unique pour identifier cette requête
    async () => await repository.getProfessions(), 
    {
      onSuccess: () => {
        notify.success("Professions fetched successfully!");
      },
      onError: () => {
        notify.error("Failed to fetch professions.");
      },
      staleTime: 1000 * 60 * 5, // Durée avant de marquer les données comme obsolètes (5 minutes)
    }
  );
};
