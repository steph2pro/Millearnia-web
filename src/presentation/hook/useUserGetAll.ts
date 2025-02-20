import { useState } from "react";
import UserNetworkServiceImpl from "../../data/datasources/network/UserNetworkServiceImpl";
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl";
import { useGetAllUsers } from "../../domain/usecases/useUserGetAll";

function useUserGetAll(page: number) {
    // const [page, setPage] = useState(1);
    const perPage:number = 2; // Nombre d'éléments par page
    
    const userQuery = useGetAllUsers(
        new UserRepositoryImpl(new UserNetworkServiceImpl()),
        page,
        perPage
    );
    console.log(userQuery.data);
    return {
        userQuery:userQuery,
        // page,
        // setPage,
    };
}

export default useUserGetAll;
