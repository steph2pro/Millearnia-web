import  {NavBar} from "../components/home/SideBar.tsx";
import ErrorBoundary from "../components/ErrorBoundary.tsx";
import {Outlet} from "react-router-dom";
import Header from "../components/home/Header.tsx";
import Dashbord from "./dashbord.tsx";

function Home() {



    return (
        <div className=" block">
            <div className="ml-60">

            <Header></Header>
            </div>
            <NavBar  user={({name: "Wilfried Fotie", password: "12345678", email: "wilfried.fotie@kamix.io"})} />
            {/* <Dashbord></Dashbord> */}

            <ErrorBoundary>

                <div className="lg:ml-[20vw] sm:p-4  max-sm:max-lg:overflow-y-scroll lg:max-w-[80vw] flex-1">

                    <Outlet />

                    <div className="flex space-x-4 mb-30 mt-20 justify-center text-center  text-green-950"><p>  © {new Date().getFullYear()} Cette application a été réalisé par Wilfried FOTIE </p></div>
                </div>
            </ErrorBoundary>
        </div>
    )
}
export default Home




