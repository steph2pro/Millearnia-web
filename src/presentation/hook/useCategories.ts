import { useGetAllCategories } from "../../domain/usecases/useCategoryGetAll";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";

function useCategories() {
    const getAllCat = useGetAllCategories(
        new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
    );
console.log(getAllCat.data);
    return {
        catQuery: getAllCat,
    };
}

export default useCategories;
