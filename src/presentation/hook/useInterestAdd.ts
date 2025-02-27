import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { STRING_ROUTE_INTERESTS } from "../utils/const";
import InterestRepositoryImpl from "../../data/repositories/InterestRepositoryImpl";
import InterestNetworkServiceImpl from "../../data/datasources/network/InterestNetworkServiceImpl";
import { useAddInterest } from "../../domain/usecases/useInterestAdd";
import InterestRequest from "../../data/models/InterestRequest";

const useInterestAdd = () => {
  const createInterest = useAddInterest(
    new InterestRepositoryImpl(new InterestNetworkServiceImpl())
  );
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

  // Initialisation de react-hook-form avec yupResolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InterestRequest>({
    resolver: yupResolver(schema),
    mode: "onTouched", // Validation au blur
  });

  // Soumission du formulaire
  const onSubmit = async (data: InterestRequest) => {
    if (createInterest.isLoading) return;

    try {
      // Appel de la mutation avec les données du formulaire
      await createInterest.mutateAsync(data);

      // Navigation en cas de succès
      navigate(STRING_ROUTE_INTERESTS);
    } catch (error) {
      console.error("Erreur lors de la création du cours :", error);
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
  };
};

export default useInterestAdd;
