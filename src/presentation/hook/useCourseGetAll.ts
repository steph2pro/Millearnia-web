import CourseNetworkServiceImpl from "../../data/datasources/network/CourseNetworkServiceImpl";
import CourseRepositoryImpl from "../../data/repositories/CourseRepositoryImpl";
import { useGetAllCourses } from "../../domain/usecases/useCourseGetAll";


function useCourseGetAll() {
    const getAllCourse = useGetAllCourses(
        new CourseRepositoryImpl(new CourseNetworkServiceImpl())
    );

    return {
        CourseQuery: getAllCourse,
    };
}

export default useCourseGetAll;
