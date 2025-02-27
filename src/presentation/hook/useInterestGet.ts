import InterestNetworkServiceImpl from "../../data/datasources/network/InterestNetworkServiceImpl";
import InterestRepositoryImpl from "../../data/repositories/InterestRepositoryImpl";
import { useGetInterestById } from "../../domain/usecases/useInterestGet";

const useInterestGet = (InterestId: number) => {
  const getInterest= useGetInterestById(
    InterestId,
    new InterestRepositoryImpl(new InterestNetworkServiceImpl())
  );

  return {
    InterestQuery: getInterest, // Contient le résultat de la requête
  };
};

export default useInterestGet;
