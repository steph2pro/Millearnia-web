
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDeleteUser } from "../../domain/usecases/useUserDelete";
import { STRING_ROUTE_USERS } from "../utils/const";
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl";
import UserNetworkServiceImpl from "../../data/datasources/network/UserNetworkServiceImpl";

const useUserDelete = (UserId: number) => {
  const deleteProf = useDeleteUser(
    UserId,
    new UserRepositoryImpl(new UserNetworkServiceImpl())
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
      navigate(STRING_ROUTE_USERS);
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

export default useUserDelete;
