
import Course from "../../data/models/Cours";
import CourseRequest from "../../data/models/CourseRequest";

export interface CourseRepository{
    createCourse(course: CourseRequest): Promise<Course> 
    getCourses(): Promise<Course[]> 
    getCourseById(courseId: number): Promise<Course>
    updateCourse(course: CourseRequest): Promise<Course>
    deleteCourse(courseId: number): Promise<string>
}