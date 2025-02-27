import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import InterestRepositoryImpl from "../../data/repositories/InterestRepositoryImpl";

export const useGetInterestById = (
InterestId: number,
  repository: InterestRepositoryImpl
) => {
  const notify = useNotification();

  return useQuery(
    ["Interest", InterestId], // Clé unique avec professionId
    async () => await repository.getInterestById(InterestId),
    {
      
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};
