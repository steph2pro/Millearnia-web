import {useMutation} from "@tanstack/react-query";
import UserRepositoryImpl from "../../data/repositories/UserRepositoryImpl";
import UserPorps from "../../data/models/User";
import {useNotification} from "../../services/useNotification";

export const useLogin = (repository: UserRepositoryImpl) => {
    const notify = useNotification()
    // return useMutation(async () => {
    //     return await repository.login();
    // }, {
    //     onSuccess: () => {
    //         notify.success("Created Correctly!");
    //     },
    //     onError: () => {
    //         notify.error("Something goes wrong..");
    //     },
    return useMutation<UserPorps, Error, { identifier: string; password: string }>(
        async ({ identifier, password }) => {
          // Appelle la méthode login du repository avec les paramètres nécessaires
          return await repository.login(identifier, password);
        },
        {
          onSuccess: () => {
            // Notification en cas de succès
            notify.success("Logged in successfully!");
          },
          onError: (error: Error) => {
            // Notification en cas d'erreur avec le détail
            notify.error(`Login failed: ${error.message}`);
          },
    });

};
