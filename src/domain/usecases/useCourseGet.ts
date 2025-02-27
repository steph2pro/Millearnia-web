import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import CourseRepositoryImpl from "../../data/repositories/CourseRepositoryImpl";

export const useGetCourseById = (
CourseId: number,
  repository: CourseRepositoryImpl
) => {
  const notify = useNotification();

  return useQuery(
    ["Course", CourseId], // Clé unique avec professionId
    async () => await repository.getCourseById(CourseId),
    {
      
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};
