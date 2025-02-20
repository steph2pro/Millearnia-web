import {createBrowserRouter} from "react-router-dom";
import {STRING_ROUTE_COURSES, STRING_ROUTE_DASHDORD, STRING_ROUTE_HOME, STRING_ROUTE_LOGING, STRING_ROUTE_OUT, STRING_ROUTE_PROFESSIONS, STRING_ROUTE_USERS, STRING_ROUTE_PROFESSION_ADD, STRING_ROUTE_PROFESSION_UPDATE, STRING_ROUTE_PROFESSION_DELETE,STRING_ROUTE_VIDEOS,STRING_ROUTE_VIDEO_ADD,STRING_ROUTE_VIDEO_UPDATE,STRING_ROUTE_VIDEO_DELETE, STRING_ROUTE_COMMENTS, STRING_ROUTE_COMMENT_DELETE, STRING_ROUTE_USER_ADD, STRING_ROUTE_USER_UPDATE, STRING_ROUTE_USER_DELETE, STRING_ROUTE_COURSE_ADD, STRING_ROUTE_COURSE_UPDATE, STRING_ROUTE_COURSE_DELETE, STRING_ROUTE_CATEGORIES, STRING_ROUTE_CATEGORY_ADD, STRING_ROUTE_CATEGORY_DELETE, STRING_ROUTE_CATEGORY_UPDATE} from "./const";

import ProfessionForm from "../pages/AddprofessionForm";
import EditProfession from "../pages/EditProfession.js";
import DeleteProfession from "../pages/deleteProfession.js";
import VideoList from "../pages/videoList.js";
import VideoFormAdd from "../pages/videoFormAdd.js";
import VideoEdit from "../pages/videoEdit.js";
import VideoDelete from "../pages/videoDelete.js";
import CommentList from "../pages/commentList.js";
import CommentDelete from "../pages/commentDelete.js";
import UserFormAdd from "../pages/userFormAdd.js";
import UserEdit from "../pages/userEdit.js";
import UserDelete from "../pages/useDelete.js";
import CourseFormAdd from "../pages/courseFormAdd.js";
import CourseDelete from "../pages/courseDelete.js";
import LoginPage from "../pages/loginPage.js";
import Home from "../pages/home";
import Dashbord from "../pages/dashbord";
import UserList from "../pages/userList";
import CourseList from "../pages/courseList";
import ProfessionList from "../pages/professionList";
import { LogoutPage } from "../pages/logoutPage";
import CategoryList from "../pages/categoryList";
import CategoryFormAdd from "../pages/categoryFormAdd";
import CategoryDelete from "../pages/categoryDelete";
import CategoryEdit from "../pages/categoryEdit";

const router = createBrowserRouter([
    {
        path: STRING_ROUTE_LOGING,
        element: <LoginPage/>,
    },
    {
        path: STRING_ROUTE_OUT,
        element: <LogoutPage/>
    },
    {
        path: STRING_ROUTE_HOME,
        element: <Home/>,
        children: [
           
            {
                path: STRING_ROUTE_DASHDORD,
                element: <Dashbord/>
            },
            {
                path: STRING_ROUTE_USERS,
                element: <UserList/>
            },
            {
                path: STRING_ROUTE_USER_ADD,
                element: <UserFormAdd/>
            },
            {
                path: STRING_ROUTE_USER_UPDATE,
                element: <UserEdit/>
            },
            {
                path: STRING_ROUTE_USER_DELETE,
                element: <UserDelete/>
            },
            {
                path: STRING_ROUTE_COURSES,
                element: <CourseList/>
            },,
            {
                path: STRING_ROUTE_COURSE_ADD,
                element: <CourseFormAdd/>
            },
            // {
            //     path: STRING_ROUTE_COURSE_UPDATE,
            //     element: <CourseEdit/>
            // },
            {
                path: STRING_ROUTE_COURSE_DELETE,
                element: <CourseDelete/>
            },
            {
                path: STRING_ROUTE_PROFESSIONS,
                element: <ProfessionList/>
            },
            {
                path: STRING_ROUTE_PROFESSION_ADD,
                element: <ProfessionForm/>
            },
            {
                path: STRING_ROUTE_PROFESSION_UPDATE,
                element: <EditProfession/>
            },
            {
                path: STRING_ROUTE_PROFESSION_DELETE,
                element: <DeleteProfession/>
            },
            {
                path: STRING_ROUTE_VIDEOS,
                element: <VideoList/>
            },
            {
                path: STRING_ROUTE_VIDEO_ADD,
                element: <VideoFormAdd/>
            },
            {
                path: STRING_ROUTE_VIDEO_UPDATE,
                element: <VideoEdit/>
            },
            {
                path: STRING_ROUTE_VIDEO_DELETE,
                element: <VideoDelete/>
            },
            {
                path: STRING_ROUTE_COMMENTS,
                element: <CommentList/>
            },
            {
                path: STRING_ROUTE_COMMENT_DELETE,
                element: <CommentDelete/>
            },
            {
                path: STRING_ROUTE_CATEGORIES,
                element: <CategoryList/>
            },
            {
                path: STRING_ROUTE_CATEGORY_ADD,
                element: <CategoryFormAdd/>
            },
            {
                path: STRING_ROUTE_CATEGORY_DELETE,
                element: <CategoryDelete/>
            },
            {
                path: STRING_ROUTE_CATEGORY_UPDATE,
                element: <CategoryEdit/>
            },
        ]
    }
]);

export default router;