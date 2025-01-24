
import { CourseRepository } from "../../domain/repositories/CourseRepository";
import CourseNetworkService from "../datasources/network/CourseNetworkService";
import Course from "../models/Cours";
import CourseRequest from "../models/CourseRequest";

export default class CourseRepositoryImpl implements CourseRepository {

    dataSource: CourseNetworkService

    constructor(dataSource: CourseNetworkService) {
        this.dataSource = dataSource;
    }

    async createCourse(course: CourseRequest): Promise<Course>  {
        return await this.dataSource.createCourse(course);
    }
    async getCourses(): Promise<Course[]>  {
        return await this.dataSource.getCourses();
    }

    async getCourseById(courseId: number): Promise<Course> {
        return await this.dataSource.getCourseById(courseId);
    }
    async updateCourse(course: CourseRequest): Promise<Course> {
        return await this.dataSource.updateCourse(course);
    }
    async deleteCourse(courseId: number): Promise<string> {
        return await this.dataSource.deleteCourse(courseId);
    }


}