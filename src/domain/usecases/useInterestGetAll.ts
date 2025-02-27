import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import InterestRepositoryImpl from "../../data/repositories/InterestRepositoryImpl";

export const useGetAllInterests = (repository: InterestRepositoryImpl) => {
  const notify = useNotification();

  return useQuery(
    ["interests"], // Clé unique pour identifier cette requête
    async () => await repository.getInterests(), 
    {
      staleTime: 1000 * 60 * 5, // Durée avant de marquer les données comme obsolètes (5 minutes)
    }
  );
};
