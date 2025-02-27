import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";
import { STRING_ROUTE_VIDEOS } from '../utils/const';
import { useAddVideo } from "../../domain/usecases/useVideoAdd";
import ProfessionVideoRequest from "../../data/models/ProfessionVideoRequest";

const useVideoAdd = () => {
  const createProf = useAddVideo(new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl()));
  const navigate = useNavigate();

  // Schéma de validation Yup
  const schema = Yup.object().shape({
     title: Yup.string()
       .required("Le titre de la video est requis"),
       youtubeId: Yup.string()
       .required("L'ID de la video sur youtube est requis")
   });

  // Initialisation de react-hook-form avec yupResolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfessionVideoRequest>({
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
      navigate(STRING_ROUTE_VIDEOS);
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

export default useVideoAdd;
