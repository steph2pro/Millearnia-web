import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserPorps from "../../data/models/User";
import { useLogin } from "../../domain/usecases/useLogin";
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl";
import UserNetworkServiceImpl from "../../data/datasources/network/UserNetworkServiceImpl";
import { useNavigate } from "react-router-dom";
import { STRING_ROUTE_HOME } from "../utils/const";

function useConnexionController() {
  const login = useLogin(new UserRepositoryImpl(new UserNetworkServiceImpl()));
  const navigate = useNavigate();

  // Validation schema
  const schema = yup.object({
    identifier: yup.string().required("Identifier (email or phone) is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ identifier: string; password: string }>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // Form submission handler
  const onSubmit = async (data: { identifier: string; password: string }) => {
    if (login.isLoading) return;

    try {
      await login.mutateAsync(data); // Call the login mutation with the form data
      navigate(STRING_ROUTE_HOME); // Navigate to the home route on success
    } catch (error) {
          console.error('Axios Error:', error);
    
         
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loginQuery: login,
  };
}

export default useConnexionController;
