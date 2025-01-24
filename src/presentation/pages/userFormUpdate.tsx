import React, { useEffect } from "react";
import Input from "../components/Input";
import useUserUpdate from "../hook/useUserUpdate"; // Utilisation du hook pour l'update

const UserFormUpdate = ({ userData }) => {
  const { register, handleSubmit, onSubmit, setValue, errors, isUpdating } =
    useUserUpdate();

  // Pré-remplir les champs du formulaire avec les données existantes de l'utilisateur
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("phone", userData.phone);
      setValue("password", ""); // Laisser le mot de passe vide pour éviter de l'afficher
      setValue("role", userData.role);
      setValue("id", userData.id);
    }
  }, [userData, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom de l'utilisateur
        </label>
        <Input
          type="text"
          {...register("name")}
          placeholder="Nom de l'utilisateur"
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{String(errors.name.message)}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email de l'utilisateur
        </label>
        <Input
          type="email"
          {...register("email")}
          placeholder="Email de l'utilisateur"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Numéro de téléphone de l'utilisateur
        </label>
        <Input
          type="text"
          {...register("phone")}
          placeholder="Numéro de téléphone de l'utilisateur"
        />
        {errors.phone?.message && (
          <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe de l'utilisateur
        </label>
        <Input
          type="password"
          {...register("password")}
          placeholder="Laisser vide pour conserver le mot de passe existant"
        />
        {errors.password?.message && (
          <p className="text-red-500 text-sm">{String(errors.password.message)}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Rôle de l'utilisateur
        </label>
        <select
          id="role"
          {...register("role")}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Sélectionnez un rôle</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="creator">Creator</option>
        </select>
        {errors.role?.message && (
          <p className="text-red-500 text-sm">{String(errors.role.message)}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isUpdating}
        className={`w-full py-2 px-4 rounded-md ${
          isUpdating
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isUpdating ? "Mise à jour en cours..." : "Mettre à jour"}
      </button>
    </form>
  );
};

export default UserFormUpdate;
