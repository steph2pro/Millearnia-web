import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";

import { useAddCategory } from "../../domain/usecases/useCategoryAdd";
import ProfessionCategoryRequest from "../../data/models/ProfessionCategoryRequest";
import { STRING_ROUTE_CATEGORIES } from "../utils/const";

const useCategoryAdd = () => {
  const createProf = useAddCategory(new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl()));
  const navigate = useNavigate();

  // Schéma de validation Yup
  const schema = Yup.object().shape({
      
      title: Yup.string()
        .required("Le titre de la Category  est requis")
   });

  // Initialisation de react-hook-form avec yupResolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfessionCategoryRequest>({
    resolver: yupResolver(schema),
    mode: "onTouched", // Valide lorsque le champ perd le focus
  });

  const onSubmit = async (data) => {
    if (createProf.isLoading) return;
  
    try {
      
  
      // Appel de la mutation avec les données converties
      await createProf.mutateAsync({
        ...data,
      });
  
      // Navigation en cas de succès
      navigate(STRING_ROUTE_CATEGORIES);
    } catch (error) {
      console.error('Erreur Axios :', error);
    }
  };
  
  return {
    register,
    handleSubmit,
    setValue, onSubmit,
    errors,
  };
};

export default useCategoryAdd;
