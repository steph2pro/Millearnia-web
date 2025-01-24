
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDeleteCourse } from "../../domain/usecases/useCourseDelete";
import { STRING_ROUTE_COURSES } from "../utils/const";
import CourseRepositoryImpl from "../../data/repositories/CourseRepositoryImpl";
import CourseNetworkServiceImpl from "../../data/datasources/network/CourseNetworkServiceImpl";

const useCourseDelete = (CourseId: number) => {
  const deleteProf = useDeleteCourse(
    CourseId,
    new CourseRepositoryImpl(new CourseNetworkServiceImpl())
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
      navigate(STRING_ROUTE_COURSES);
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

export default useCourseDelete;
