import React from "react";
import Input from "../components/Input"; // Composant Input réutilisable
import useCourseAdd from "../hook/useCourseAdd"; // Hook pour ajouter un cours

const CourseFormAdd = () => {
  const { register, handleSubmit, onSubmit, setValue, errors } = useCourseAdd();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md"
    >
      {/* Champ Titre */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre du cours
        </label>
        <Input
          type="text"
          {...register("title")}
          placeholder="Titre du cours"
        />
        {errors.title?.message && (
          <p className="text-red-500 text-sm">{String(errors.title.message)}</p>
        )}
      </div>

      {/* Champ Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description du cours
        </label>
        <Input
          type="text"
          {...register("description")}
          placeholder="Description du cours"
        />
        {errors.description?.message && (
          <p className="text-red-500 text-sm">{String(errors.description.message)}</p>
        )}
      </div>

      {/* Champ Contenu */}
      <div className="mb-4">
        <label htmlFor="contenu" className="block text-sm font-medium text-gray-700">
          Contenu du cours
        </label>
        <textarea
          id="contenu"
          {...register("contenu")}
          placeholder="Contenu du cours"
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.contenu?.message && (
          <p className="text-red-500 text-sm">{String(errors.contenu.message)}</p>
        )}
      </div>

      {/* Champ Durée */}
      <div className="mb-4">
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Durée (en heures)
        </label>
        <Input
          type="number"
          {...register("duration")}
          placeholder="Durée du cours (en heures)"
        />
        {errors.duration?.message && (
          <p className="text-red-500 text-sm">{String(errors.duration.message)}</p>
        )}
      </div>

      {/* Bouton Ajouter */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Ajouter le cours
      </button>
    </form>
  );
};

export default CourseFormAdd;
