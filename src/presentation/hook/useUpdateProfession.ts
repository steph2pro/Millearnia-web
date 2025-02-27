import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";
import { STRING_ROUTE_PROFESSIONS } from "../utils/const";
import { useUpdateProfession } from "../../domain/usecases/useUpdateProf";
import ProfessionRequest from "../../data/models/ProfessionRequest";

// Hook pour gérer la mise à jour d'une profession
const useUpdateProfessionForm = () => {
  const updateProf = useUpdateProfession(new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl()));
  const navigate = useNavigate();

  // Schéma de validation Yup
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Le nom de la profession est requis")
      .min(3, "Le nom doit contenir au moins 3 caractères"),
    // userId: Yup.number()
    //   .required("L'ID utilisateur est requis")
    //   .typeError("L'ID utilisateur doit être un nombre"),
    // categoryId: Yup.number()
    //   .required("L'ID catégorie est requis")
    //   .typeError("L'ID catégorie doit être un nombre"),
    // tabs: Yup.array()
    //   .of(Yup.string().required("Les onglets doivent être des chaînes de caractères"))
    //   .required("Les onglets sont requis"),
  });

  // Initialisation de react-hook-form
  const {
    register,
    handleSubmit,
    setValue,watch,
    formState: { errors },
  } = useForm<ProfessionRequest>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    // defaultValues: initialData,
  });

  // Gestion de la soumission du formulaire
  const onSubmit = async (data) => {
    if (updateProf.isLoading) return;
    console.log(data)

    try {
        const id=data.professionId;
        
      console.log('*****interests : ' + data.interests);
        const formData = new FormData();
      formData.append("userId", data.userId);
      formData.append("categoryId", data.categoryId);
      formData.append("interests", JSON.stringify(data.interests)); // ou traitement similaire
      formData.append("name", data.name);
      formData.append("thumbnail", data.thumbnail); // si data.thumbnail est un tableau de fichiers
  
      await updateProf.mutateAsync({
        // professionId: initialData.professionId, // ID de la profession à mettre à jour
        id,
        ...data,
      });

      // Navigation après mise à jour réussie
      navigate(STRING_ROUTE_PROFESSIONS);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    onSubmit,watch,
    errors,
    isUpdating: updateProf.isLoading,
  };
};

export default useUpdateProfessionForm;
