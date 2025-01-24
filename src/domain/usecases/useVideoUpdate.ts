import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionVideoRequest from "../../data/models/ProfessionVideoRequest";

export const useUpdateVideo = (repository: ProfessionRepositoryImpl) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  return useMutation(
    async (professionVideo: ProfessionVideoRequest) =>
      await repository.updateProfessionVideo(
        professionVideo
      ),
    {
      onSuccess: (updatedProfessionVideo) => {
        notify.success(`Video updated successfully!`);
        // Invalidate queries related to video to refresh data
        queryClient.invalidateQueries(["video", updatedProfessionVideo.id]);
      },
      onError: () => {
        notify.error("Failed to update video.");
      },
    }
  );
};
