
import ProfessionRepositoryImpl from "../../data/repositories/ProfessionRepositoryImpl";
import ProfessionNetworkServiceImpl from "../../data/datasources/network/ProfessionNetworkServiceImpl";
import { useGetProfessionById } from "../../domain/usecases/useGetProf";
import { useDeleteProf } from '../../domain/usecases/useDeleteProf';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { STRING_ROUTE_COMMENTS, STRING_ROUTE_PROFESSIONS } from "../utils/const";
import { useDeleteComment } from "../../domain/usecases/useCommentDelete";

const useCommentDelete = (professionCommentId: number) => {
  const deleteComment = useDeleteComment(
    professionCommentId,
    new ProfessionRepositoryImpl(new ProfessionNetworkServiceImpl())
  );
  const navigate = useNavigate();

//   return {
//     profQuery : deleteProf, // Contient le résultat de la requête
//   };

 

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
    if (deleteComment.isLoading) return;

    try {
        const id=data.professionCommentId;
      await deleteComment.mutateAsync({
        
        id,
        ...data,
      });

      // Navigation après mise à jour réussie
      navigate(STRING_ROUTE_COMMENTS);
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
    isDeleted: deleteComment.isLoading,
  };
};

export default useCommentDelete;
