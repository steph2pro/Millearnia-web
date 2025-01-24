import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import CourseRepositoryImpl from "../../data/repositories/CourseRepositoryImpl";
import CourseRequest from "../../data/models/CourseRequest";

export const useUpdateCourse = (repository: CourseRepositoryImpl) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  return useMutation(
    async (Course: CourseRequest) =>
      await repository.updateCourse(
        Course
      ),
    {
      onSuccess: (updatedCourse) => {
        notify.success(`Course updated successfully!`);
        // Invalidate queries related to Course to refresh data
        queryClient.invalidateQueries(["Course", updatedCourse.id]);
      },
      onError: () => {
        notify.error("Failed to update Course.");
      },
    }
  );
};
