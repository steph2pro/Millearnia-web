import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useGetVideoById = (
  professionVideoId: number,
  repository: ProfessionRepositoryImpl
) => {
  const notify = useNotification();

  return useQuery(
    ["video", professionVideoId], // Clé unique avec professionId
    async () => await repository.getProfessionVideoById(professionVideoId),
    {
      // onSuccess: () => {
      //   notify.success(`Video  fetched successfully!`);
      // },
      // onError: () => {
      //   notify.error("Failed to fetch Video.");
      // },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};
