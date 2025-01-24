import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { STRING_ROUTE_USERS } from "../utils/const";
import { useUpdateUser } from "../../domain/usecases/useUserUpdate";
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl";
import UserNetworkServiceImpl from "../../data/datasources/network/UserNetworkServiceImpl";
import UserRequest from "../../data/models/UserRequest";

const useUserUpdate = () => {
  const updateUser = useUpdateUser(
    new UserRepositoryImpl(new UserNetworkServiceImpl())
  );
  const navigate = useNavigate();

  // Schéma de validation Yup
  const schema = Yup.object().shape({
    name: Yup.string().required("Le nom est requis"),
    email: Yup.string()
      .email("Email invalide")
      .required("L'email est requis"),
      phone: Yup.string()
      .matches(
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{1,4}$/,
        "Le numéro de téléphone doit être valide avec ou sans l'indicatif pays."
      )
      .required("Le numéro de téléphone est requis"),
    
    password: Yup.string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial"
      )
      .required("Le mot de passe est requis"),
    role: Yup.string().required("Le rôle est requis"),
  });

  // Initialisation de react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserRequest>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // Gestion de la soumission du formulaire
  const onSubmit = async (data: UserRequest) => {
    if (updateUser.isLoading) return;

    try {
      // Appel de la mutation avec les données du formulaire
      await updateUser.mutateAsync(data);

      // Navigation après une mise à jour réussie
      navigate(STRING_ROUTE_USERS);
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
    isUpdating: updateUser.isLoading,
  };
};

export default useUserUpdate;
