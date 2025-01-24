import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { STRING_ROUTE_USERS } from "../utils/const";
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl";
import UserNetworkServiceImpl from "../../data/datasources/network/UserNetworkServiceImpl";
import { useAddUser } from "../../domain/usecases/useUserAdd";
import UserRequest from "../../data/models/UserRequest";

const useUserAdd = () => {
  const createUser = useAddUser(
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
        /^[0-9]{9,}$/,
        "Le numéro de téléphone doit contenir au moins 9 chiffres"
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

  // Initialisation de react-hook-form avec yupResolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserRequest>({
    resolver: yupResolver(schema),
    mode: "onTouched", // Validation au blur
  });

  // Soumission du formulaire
  const onSubmit = async (data: UserRequest) => {
    if (createUser.isLoading) return;

    try {
      // Appel de la mutation avec les données du formulaire
      await createUser.mutateAsync(data);

      // Navigation en cas de succès
      navigate(STRING_ROUTE_USERS);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
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

export default useUserAdd;
