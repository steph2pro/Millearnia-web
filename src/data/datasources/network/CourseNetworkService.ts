
import Course from "../../models/Cours";
import CourseRequest from "../../models/CourseRequest";

export default interface CourseNetworkService{
    getCourses(): Promise<Course[]>;
    createCourse(course: CourseRequest): Promise<Course> 
    getCourses(): Promise<Course[]> 
    getCourseById(courseId: number): Promise<Course>
    updateCourse(course: CourseRequest): Promise<Course>
    deleteCourse(courseId: number): Promise<string>
}
