import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useGetProfessionById = (
  professionId: number,
  repository: ProfessionRepositoryImpl
) => {
  const notify = useNotification();

  return useQuery(
    ["profession", professionId], // Clé unique avec professionId
    async () => await repository.getProfessionById(professionId),
    {
      onSuccess: (data) => {
        notify.success(`Profession "${data.name}" fetched successfully!`);
      },
      onError: () => {
        notify.error("Failed to fetch profession.");
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};
