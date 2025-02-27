import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InterestRepositoryImpl from "../../data/repositories/InterestRepositoryImpl";
import InterestNetworkServiceImpl from "../../data/datasources/network/InterestNetworkServiceImpl";
import InterestRequest from "../../data/models/InterestRequest";
import { useUpdateInterest } from "@/domain/usecases/useInterestUpdate";
import { STRING_ROUTE_INTERESTS } from "../utils/const";

// Hook pour gérer la mise à jour d'une Interest
const useInterestUpdate = () => {
  const updateProf = useUpdateInterest(new InterestRepositoryImpl(new InterestNetworkServiceImpl()));
  const navigate = useNavigate();

  // Schéma de validation Yup
  const schema = Yup.object().shape({
      title: Yup.string()
        .required("Le titre est requis")
        .max(100, "Le titre ne peut pas dépasser 100 caractères"),
      description: Yup.string()
        .required("La description est requise")
        .max(500, "La description ne peut pas dépasser 500 caractères"),
  });

  // Initialisation de react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InterestRequest>({
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
        const InterestId = parseInt(data.id, 10);
  
      // Vérification que les conversions sont valides
      if (isNaN(InterestId) ) {
        console.error(' InterestId invalide');
        return;
      }
      await updateProf.mutateAsync({
        // InterestId: initialData.InterestId, // ID de la Interest à mettre à jour
        id,
        ...data,
        InterestId,
      });

      // Navigation après mise à jour réussie
      navigate(STRING_ROUTE_INTERESTS);
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

export default useInterestUpdate;
