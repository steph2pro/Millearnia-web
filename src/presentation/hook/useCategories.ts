import { useGetAllCategories } from "../../domain/usecases/useGetAllCat";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";

function useCategories() {
    const getAllCat = useGetAllCategories(
        new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
    );

    return {
        catQuery: getAllCat,
    };
}

export default useCategories;
