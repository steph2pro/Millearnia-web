import React, { useEffect } from "react";
import Input from "../components/Input";
import useCategoryUpdate from "../hook/useCategoryUpdate";
import useProfessionController from "../hook/useProfessionController"

const CategoryFormUpdate = ({ initialData }) => {
  const { register, handleSubmit, onSubmit, setValue, errors, isUpdating } = useCategoryUpdate();
;
// console.log(initialData);
  // Préremplir les valeurs du formulaire avec les données initiales
  useEffect(() => {
    if (initialData) {
      setValue("icon", initialData.icon);
      setValue("title", initialData.title);
      setValue("id", initialData.id);
    }
  }, [initialData, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md"
    >
      
      <div className="mb-4">
      <input
          type="number"
          {...register("id",  { valueAsNumber: true })}
          className="hidden"
          />
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Lien de l'image de la catégorie
          </label>
          <Input
            type="text"
            {...register("icon", { required: "Lien de l'image de la catégorie est requis." })}
            placeholder="Lien de l'image de la catégorie"
          />
          {errors.icon?.message && (
            <p className="text-red-500 text-sm">{String(errors.icon.message)}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          
          Titre de la catégorie 
          </label>
          <Input
            type="text"
            {...register("title", { required: "Le nom de la profession est requis." })}
            placeholder="Id de la Category"
          />
          {errors.title?.message && (
            <p className="text-red-500 text-sm">{String(errors.title.message)}</p>
          )}
        </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md text-white ${
          isUpdating ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={isUpdating}
      >
        {isUpdating ? "Mise à jour en cours..." : "Mettre à jour"}
      </button>
    </form>
  );
};

export default CategoryFormUpdate;
