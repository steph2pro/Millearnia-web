import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import CourseRepositoryImpl from "../../data/repositories/CourseRepositoryImpl";

export const useGetAllCourses = (repository: CourseRepositoryImpl) => {
  const notify = useNotification();

  return useQuery(
    ["Courses"], // Clé unique pour identifier cette requête
    async () => await repository.getCourses(), 
    {
      // onSuccess: () => {
      //   notify.success("Courses fetched successfully!");
      // },
      // onError: () => {
      //   notify.error("Failed to fetch Courses.");
      // },
      staleTime: 1000 * 60 * 5, // Durée avant de marquer les données comme obsolètes (5 minutes)
    }
  );
};
