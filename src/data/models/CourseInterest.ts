import Course from "./Cours";
import Interest from "./Interest";

type CourseInterest = {
    courseId: number;
    interestId: number;
    course?: Course;
    interest?: Interest;
}

export default CourseInterest;
