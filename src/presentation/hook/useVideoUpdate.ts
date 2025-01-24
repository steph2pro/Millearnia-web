import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";
import { STRING_ROUTE_PROFESSIONS, STRING_ROUTE_VIDEOS } from "../utils/const";
import { useUpdateProfession } from "../../domain/usecases/useUpdateProf";
import ProfessionRequest from "../../data/models/ProfessionRequest";
import { useUpdateVideo } from "../../domain/usecases/useVideoUpdate";
import ProfessionVideoRequest from "../../data/models/ProfessionVideoRequest";

// Hook pour gérer la mise à jour d'une profession
const useVideoUpdate = () => {
  const updateProf = useUpdateVideo(new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl()));
  const navigate = useNavigate();

  // Schéma de validation Yup
  const schema = Yup.object().shape({
    thumbnail: Yup.string()
      .required("Le lien de la lien de l'image de la video est requis"),
      youtubeId: Yup.string()
      .required("L'ID de la video sur youtube est requis")
  });

  // Initialisation de react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfessionVideoRequest>({
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
        const professionId = parseInt(data.professionId, 10);
  
      // Vérification que les conversions sont valides
      if (isNaN(professionId) ) {
        console.error(' professionId invalide');
        return;
      }
      await updateProf.mutateAsync({
        // professionId: initialData.professionId, // ID de la profession à mettre à jour
        id,
        ...data,
        professionId,
      });

      // Navigation après mise à jour réussie
      navigate(STRING_ROUTE_VIDEOS);
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

export default useVideoUpdate;
