import InterestNetworkServiceImpl from "../../data/datasources/network/InterestNetworkServiceImpl";
import InterestRepositoryImpl from "../../data/repositories/InterestRepositoryImpl";
import { useGetAllInterests } from "../../domain/usecases/useInterestGetAll";


function useInterestGetAll() {
    const getAllInterest = useGetAllInterests(
        new InterestRepositoryImpl(new InterestNetworkServiceImpl())
    );

    return {
        InterestQuery: getAllInterest,
    };
}

export default useInterestGetAll;
