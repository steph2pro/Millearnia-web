import { Http } from "../../../services/Http";
import Course from "../../models/Cours";
import CourseRequest from "../../models/CourseRequest";
import CourseNetworkService from "./CourseNetworkService";


export default class CourseNetworkServiceImpl implements CourseNetworkService {
    

    async createCourse(course: CourseRequest): Promise<Course> {
        const res = await Http.post<Course>("course-store", course);
        return await res.data;
      }
    async getCourses(): Promise<Course[]> {
        const res = await Http.get<Course[]>("course-index");
        return await res.data;
      }
      async getCourseById(courseId: number): Promise<Course> {
        const res = await Http.get<Course>(`course-show/${courseId}`);
        return await res.data;
      }
      async updateCourse(course: CourseRequest): Promise<Course> {
        const res = await Http.put<Course>(`course-update/${course.id}`, course);
        return await res.data;
      }
      
      async deleteCourse(courseId: number): Promise<string> {
        const res = await Http.delete<string>(`course-destroy/${courseId}`);
        return await res.data;
      }


}