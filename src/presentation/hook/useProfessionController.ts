import { useGetAllProfessions } from "../../domain/usecases/useGetAllProf";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";

function useProfessionController() {
    const getAllProf = useGetAllProfessions(
        new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
    );
    console.log('toutes les professions '+getAllProf);
    return {
        profQuery: getAllProf,
    };
}

export default useProfessionController;
