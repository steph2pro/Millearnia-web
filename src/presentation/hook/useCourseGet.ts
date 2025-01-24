import CourseNetworkServiceImpl from "../../data/datasources/network/CourseNetworkServiceImpl";
import CourseRepositoryImpl from "../../data/repositories/CourseRepositoryImpl";
import { useGetCourseById } from "../../domain/usecases/useCourseGet";

const useCourseGet = (CourseId: number) => {
  const getCourse= useGetCourseById(
    CourseId,
    new CourseRepositoryImpl(new CourseNetworkServiceImpl())
  );

  return {
    CourseQuery: getCourse, // Contient le résultat de la requête
  };
};

export default useCourseGet;
