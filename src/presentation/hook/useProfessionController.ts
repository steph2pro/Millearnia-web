import { useGetAllProfessions } from "../../domain/usecases/useGetAllProf";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";

function useProfessionController() {
    const getAllProf = useGetAllProfessions(
        new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
    );

    return {
        profQuery: getAllProf,
    };
}

export default useProfessionController;
