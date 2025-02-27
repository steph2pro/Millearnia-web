import Course from "./Cours";
import CourseInterest  from "./CourseInterest";
import Profession from "./Profession";
import ProfessionInterest from "./ProfessionInterest";
import UserPorps from "./User";
import UserInterest from "./UserInterest";

  type Interest = {
    id: number;
    title: string;
    description: string;
    users?: UserPorps[];
    professions?: Profession[];
    courses?: Course[];
    userInterests?: UserInterest[];
    professionInterests?: ProfessionInterest[];
    courseInterests?: CourseInterest[];

  }
  
  export default Interest;