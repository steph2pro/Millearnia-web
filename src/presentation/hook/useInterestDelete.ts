
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDeleteInterest } from "../../domain/usecases/useInterestDelete";
import { STRING_ROUTE_INTERESTS } from "../utils/const";
import InterestRepositoryImpl from "../../data/repositories/InterestRepositoryImpl";
import InterestNetworkServiceImpl from "../../data/datasources/network/InterestNetworkServiceImpl";

const useInterestDelete = (InterestId: number) => {
  const deleteProf = useDeleteInterest(
    InterestId,
    new InterestRepositoryImpl(new InterestNetworkServiceImpl())
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
      navigate(STRING_ROUTE_INTERESTS);
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

export default useInterestDelete;
