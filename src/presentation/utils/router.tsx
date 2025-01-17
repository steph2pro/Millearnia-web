import {createBrowserRouter} from "react-router-dom";
import Connexion from "../pages/Connexion.tsx";
import Home from "../pages/home.tsx";
import {STRING_ROUTE_DASHDORD, STRING_ROUTE_HOME, STRING_ROUTE_LOGING, STRING_ROUTE_OUT} from "./const.ts";
import Dashbord from "../pages/dashbord.tsx";

const router = createBrowserRouter([
    {
        path: STRING_ROUTE_LOGING,
        element: <Connexion/>,
    },
    {
        path: STRING_ROUTE_HOME,
        element: <Home/>,
        children: [
            {
                path: STRING_ROUTE_OUT,
                element: <Connexion/>
            },
            {
                path: STRING_ROUTE_DASHDORD,
                element: <Dashbord/>
            }
        ]
    }
]);

export default router;