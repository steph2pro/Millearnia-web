import UserNetworkServiceImpl from "../../data/datasources/network/UserNetworkServiceImpl";
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl";
import { useGetUserById } from "../../domain/usecases/useUserGet";

const useUserGet = (UserId: number) => {
  const getUser= useGetUserById(
    UserId,
    new UserRepositoryImpl(new UserNetworkServiceImpl())
  );

  return {
    UserQuery: getUser, // Contient le résultat de la requête
  };
};

export default useUserGet;
