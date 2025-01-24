
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";
import { useGetAllVideos } from "../../domain/usecases/useVideoGetAll";

function useVideoGetAll() {
    const getAllVideo = useGetAllVideos(
        new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
    );

    return {
        videoQuery: getAllVideo,
    };
}

export default useVideoGetAll;
