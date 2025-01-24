import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAddProf } from '../../domain/usecases/useAddProf';
import { useNavigate } from "react-router-dom";
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";
import { STRING_ROUTE_PROFESSIONS } from '../utils/const';

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
    formState: { errors },
  } = useForm<{ name: string, userId: number,categoryId: number,tabs: string[] }>({
    resolver: yupResolver(schema),
    mode: "onTouched", // Valide lorsque le champ perd le focus
  });

  const onSubmit = async (data) => {
    if (createProf.isLoading) return;
  
    try {
      // Conversion des valeurs en entiers
      const userId = parseInt(data.userId, 10);
      const categoryId = parseInt(data.categoryId, 10);
  
      // Vérification que les conversions sont valides
      if (isNaN(userId) || isNaN(categoryId)) {
        console.error('userId ou categoryId invalide');
        return;
      }
  
      // Appel de la mutation avec les données converties
      await createProf.mutateAsync({
        ...data,
        userId,
        categoryId,
      });
  
      // Navigation en cas de succès
      navigate(STRING_ROUTE_PROFESSIONS);
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

export default useProfessionForm;
