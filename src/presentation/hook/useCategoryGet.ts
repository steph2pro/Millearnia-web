
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";

import { useGetCategoryById } from "../../domain/usecases/useCategoryGet";

const useCategoryGet = (professionCategoryId: number) => {
  const getCategory= useGetCategoryById(
    professionCategoryId,
    new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
  );

  return {
    CategoryQuery: getCategory, // Contient le résultat de la requête
  };
};

export default useCategoryGet;
