import React from "react";
import Input from "../components/Input";
import useUserAdd from "../hook/useUserAdd";

const UserFormAdd = () => {
  const { register, handleSubmit, onSubmit, setValue, errors } = useUserAdd();

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
          {...register("name", { required: "Nom de l'utilisateur est requis." })}
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
          type="text"
          {...register("email", { required: "L'email de l'utilisateur est requis." })}
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
          {...register("phone", { required: "Numéro de téléphone de l'utilisateur est requis." })}
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
          {...register("password", { required: "Mot de passe de l'utilisateur est requis." })}
          placeholder="Mot de passe de l'utilisateur"
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
          {...register("role", { required: "Le rôle de l'utilisateur est requis." })}
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
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Ajouter
      </button>
    </form>
  );
};

export default UserFormAdd;
