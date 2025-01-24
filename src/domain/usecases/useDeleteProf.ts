import { useMutation, useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";

export const useDeleteProf = (
  professionId: number,
  repository: ProfessionRepositoryImpl
) => {
  const notify = useNotification();

  return useMutation(
    async () => await repository.deleteProfession(professionId),
    {
      onSuccess: () => {
        notify.success(`Profession deleted successfully!`);
      },
      onError: () => {
        notify.error("Failed to delete profession.");
      },
    }
  );
};
