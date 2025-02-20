
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDeleteCategory } from "../../domain/usecases/useCategoryDelete";
import { STRING_ROUTE_CATEGORIES } from "../utils/const";
const useCategoryDelete = (professionCategoryId: number) => {
  const deleteProf = useDeleteCategory(
    professionCategoryId,
    new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
  );
  const navigate = useNavigate();


  // Initialisation de react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    // defaultValues: initialData,
  });

  // Gestion de la supression 
  const onSubmit = async (data) => {
    if (deleteProf.isLoading) return;

    try {
        const id=data.id;
      await deleteProf.mutateAsync({
        
        id,
        ...data,
      });

      // Navigation après mise à jour réussie
      navigate(STRING_ROUTE_CATEGORIES);
    } catch (error) {
      console.error("Erreur lors de la supression :", error);
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    isDeleted: deleteProf.isLoading,
  };
};

export default useCategoryDelete;
