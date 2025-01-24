import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { STRING_ROUTE_COURSES } from "../utils/const";
import CourseRepositoryImpl from "../../data/repositories/CourseRepositoryImpl";
import CourseNetworkServiceImpl from "../../data/datasources/network/CourseNetworkServiceImpl";
import { useAddCourse } from "../../domain/usecases/useCourseAdd";
import CourseRequest from "../../data/models/CourseRequest";

const useCourseAdd = () => {
  const createCourse = useAddCourse(
    new CourseRepositoryImpl(new CourseNetworkServiceImpl())
  );
  const navigate = useNavigate();

  // Schéma de validation Yup
  const schema = Yup.object().shape({
    title: Yup.string()
      .required("Le titre est requis")
      .max(100, "Le titre ne peut pas dépasser 100 caractères"),
    description: Yup.string()
      .required("La description est requise")
      .max(500, "La description ne peut pas dépasser 500 caractères"),
    contenu: Yup.string()
      .required("Le contenu est requis")
      .min(10, "Le contenu doit contenir au moins 10 caractères"),
    duration: Yup.number()
      .typeError("La durée doit être un nombre")
      .positive("La durée doit être un nombre positif")
      .integer("La durée doit être un entier")
      .required("La durée est requise"),
  });

  // Initialisation de react-hook-form avec yupResolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseRequest>({
    resolver: yupResolver(schema),
    mode: "onTouched", // Validation au blur
  });

  // Soumission du formulaire
  const onSubmit = async (data: CourseRequest) => {
    if (createCourse.isLoading) return;

    try {
      // Appel de la mutation avec les données du formulaire
      await createCourse.mutateAsync(data);

      // Navigation en cas de succès
      navigate(STRING_ROUTE_COURSES);
    } catch (error) {
      console.error("Erreur lors de la création du cours :", error);
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

export default useCourseAdd;
