import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../services/useNotification";
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl";

// export const useGetAllUsers = (repository: UserRepositoryImpl, page?: number, perPage?: number) => {
//   const notify = useNotification();

//   return useQuery(
//     ["users"], // Clé unique pour identifier cette requête
//     async () => await repository.getUsers(page,perPage), 
//     {
//       onSuccess: () => {
//         notify.success("Users fetched successfully!");
//       },
//       onError: () => {
//         notify.error("Failed to fetch Users.");
//       },
//       staleTime: 1000 * 60 * 5, // Durée avant de marquer les données comme obsolètes (5 minutes)
//     }
//   );
// };
export const useGetAllUsers = (repository: UserRepositoryImpl, page?: number, perPage?: number) => {
  const notify = useNotification();

  return useQuery(
    ["users", page, perPage], // 🔥 Ajout de page et perPage dans la clé
    async () => await repository.getUsers(page, perPage),
    {
      // onSuccess: () => {
      //   notify.success("Users fetched successfully!");
      // },
      // onError: () => {
      //   notify.error("Failed to fetch Users.");
      // },
      staleTime: 1000 * 60 * 5, // Durée avant de marquer les données comme obsolètes (5 minutes)
    }
  );
};

