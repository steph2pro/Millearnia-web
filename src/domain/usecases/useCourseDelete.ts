import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import CourseRepositoryImpl from "../../data/repositories/CourseRepositoryImpl";

export const useDeleteCourse = (
  CourseId: number,
  repository: CourseRepositoryImpl
) => {
  const notify = useNotification();

  return useMutation(
    async () => await repository.deleteCourse(CourseId),
    {
      onSuccess: () => {
        notify.success(`Course deleted successfully!`);
      },
      onError: () => {
        notify.error("Failed to delete Course.");
      },
    }
  );
};
