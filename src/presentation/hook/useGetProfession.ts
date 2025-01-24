
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";
import { useGetProfessionById } from "../../domain/usecases/useGetProf";

const useGetProfession = (professionId: number) => {
  const getProf = useGetProfessionById(
    professionId,
    new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
  );

  return {
    profQuery: getProf, // Contient le résultat de la requête
  };
};

export default useGetProfession;
