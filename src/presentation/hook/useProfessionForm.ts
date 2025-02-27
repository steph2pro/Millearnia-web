import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAddProf } from '../../domain/usecases/useAddProf';
import { useNavigate } from "react-router-dom";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";
import { STRING_ROUTE_PROFESSIONS } from '../utils/const';
import ProfessionRequest from "@/data/models/ProfessionRequest";

const useProfessionForm = () => {
  const createProf = useAddProf(new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl()));
  const navigate = useNavigate();

  // Schéma de validation Yup
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Le nom de la profession est requis")
      .min(3, "Le nom doit contenir au moins 3 caractères"),
    
  });

  // Initialisation de react-hook-form avec yupResolver
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfessionRequest>({
    resolver: yupResolver(schema),
    mode: "onTouched", // Valide lorsque le champ perd le focus
  });

  const onSubmit = async (data) => {
    if (createProf.isLoading) return;
  
    try {
      // Conversion des valeurs en entiers
      // const userId = parseInt(data.userId, 10);
      // const categoryId = parseInt(data.categoryId, 10);
      // console.log('*****user id: '+userId);
      // console.log('*****cat id: '+data.categoryId);
      
      // console.log('*****interests : ' + data.interests);

      // let interestIds: number[] = [];
      
      // // Si c'est une chaîne séparée par des virgules
      // if (typeof data.interests === 'string') {
      //     interestIds = data.interests.split(',').map(id => Number(id.trim())); // Séparation et conversion en entiers
      // } else if (Array.isArray(data.interests)) {
      //     interestIds = data.interests.map(id => Number(id)); // Transformation en entiers
      // }
      
      // console.log('*****interestsId: ', interestIds); // Doit afficher un tableau [7, 5]
      
      // console.log('*****images id: '+data.thumbnail);
      // const thumbnail=data.thumbnail.file
      // // Vérification que les conversions sont valides
      // if (isNaN(userId) || isNaN(categoryId)) {
      //   console.error('userId ou categoryId invalide');
      //   return;
      // }
  
      // // Appel de la mutation avec les données converties
      // await createProf.mutateAsync({
      //   ...data,
      //   userId,
      //   categoryId,
      //   interestIds,
      //   thumbnail
      // });
      const formData = new FormData();
      formData.append("userId", data.userId);
      formData.append("categoryId", data.categoryId);
      formData.append("interests", JSON.stringify(data.interests)); // ou traitement similaire
      formData.append("name", data.name);
      formData.append("thumbnail", data.thumbnail[0]); // si data.thumbnail est un tableau de fichiers
  
      // Utilisation de createProf pour envoyer le FormData
      await createProf.mutateAsync({...data});
  
      // Navigation en cas de succès
      navigate(STRING_ROUTE_PROFESSIONS);
    } catch (error) {
      console.error('Erreur Axios :', error);
    }
  };
  
  return {
    register,
    handleSubmit,
    setValue, onSubmit,watch,
    errors,
  };
};

export default useProfessionForm;
