import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";

import { useUpdateCategory } from "../../domain/usecases/useCategoryUpdate";
import ProfessionCategoryRequest from "../../data/models/ProfessionCategoryRequest";
import { STRING_ROUTE_CATEGORIES } from "../utils/const";

// Hook pour gérer la mise à jour d'une profession
const useCategoryUpdate = () => {
  const updateProf = useUpdateCategory(new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl()));
  const navigate = useNavigate();

  // Schéma de validation Yup
  const schema = Yup.object().shape({
    icon: Yup.string()
      .required("Le lien de la lien de l'image de la Category est requis"),
    title: Yup.string()
      .required("Le titre de la Category  est requis")
  });

  // Initialisation de react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfessionCategoryRequest>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    // defaultValues: initialData,
  });

  // Gestion de la soumission du formulaire
  const onSubmit = async (data) => {
    if (updateProf.isLoading) return;
    console.log(data)

    try {
        const id=data.id;
      await updateProf.mutateAsync({
        // professionId: initialData.professionId, // ID de la profession à mettre à jour
        id,
        ...data,
      });

      // Navigation après mise à jour réussie
      navigate(STRING_ROUTE_CATEGORIES);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    isUpdating: updateProf.isLoading,
  };
};

export default useCategoryUpdate;
