import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import InterestRepositoryImpl from "../../data/repositories/InterestRepositoryImpl";
import InterestRequest from "../../data/models/InterestRequest";

export const useUpdateInterest = (repository: InterestRepositoryImpl) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  return useMutation(
    async (Interest: InterestRequest) =>
      await repository.updateInterest(
        Interest
      ),
    {
      onSuccess: (updatedInterest) => {
        notify.success(`Interest updated successfully!`);
        // Invalidate queries related to Interest to refresh data
        queryClient.invalidateQueries(["Interest", updatedInterest.id]);
      },
      onError: () => {
        notify.error("Failed to update Interest.");
      },
    }
  );
};
