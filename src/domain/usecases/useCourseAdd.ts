import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import CourseRequest from "../../data/models/CourseRequest";
import CourseRepositoryImpl from "../../data/repositories/CourseRepositoryImpl";



export const useAddCourse = (repository:CourseRepositoryImpl) => {
  const notify = useNotification();

  return useMutation(
    async (Course:CourseRequest) => {
      // Appelle la méthode pour créer une Course via le repository
      return await repository.createCourse(Course);
    },
    {
      onSuccess: () => {
        // Affiche une notification de succès
        notify.success("Course créée avec succès !");
      },
      onError: (error: Error) => {
        // Affiche une notification d'erreur avec les détails
        notify.error(`La création a échoué : ${error.message}`);
      },
    }
  );
};
