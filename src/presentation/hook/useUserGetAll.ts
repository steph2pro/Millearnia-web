import UserNetworkServiceImpl from "../../data/datasources/network/UserNetworkServiceImpl";
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl";
import { useGetAllUsers } from "../../domain/usecases/useUserGetAll";


function useUserGetAll() {
    const getAllUser = useGetAllUsers(
        new UserRepositoryImpl(new UserNetworkServiceImpl())
    );

    return {
        userQuery: getAllUser,
    };
}

export default useUserGetAll;
