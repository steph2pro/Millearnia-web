import CourseInterest from "./CourseInterest";
import Interest from "./Interest";
import UserPorps from "./User";
import UserCourse from "./UserCourse";

type Course = {
    id:          number;     
    title:       string;
    description: string;
    contenu  :   string;   // Contenu du cours
    duration:    number;      // Durée en heures
    createdAt:   string;
    updatedAt:   string;
    thumbnail?: string;
    user?: UserPorps;
    students?: UserCourse[];
    interests?: Interest[];
    courseInterests?: CourseInterest[];
  };
  export default Course;