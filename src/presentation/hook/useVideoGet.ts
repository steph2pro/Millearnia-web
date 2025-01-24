
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";
import { useGetProfessionById } from "../../domain/usecases/useGetProf";
import { useGetVideoById } from "../../domain/usecases/useVideoGet";

const useVideoGet = (professionVideoId: number) => {
  const getVideo= useGetVideoById(
    professionVideoId,
    new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
  );

  return {
    videoQuery: getVideo, // Contient le résultat de la requête
  };
};

export default useVideoGet;
