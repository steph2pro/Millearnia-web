import React, { useEffect } from "react";
import Input from "../components/Input";
import ProfFilter from "../components/CategoryFilter";
import useCategories from "../hook/useCategories";
import ListCategories from "../components/ListCategories";
import KeywordInput from "../components/KeyWordInput";
import useUpdateProfessionForm from "../hook/useUpdateProfession";
import ProfessionRequest from '../../data/models/ProfessionRequest';

const UpdateProfessionForm = ({ initialData }) => {
  const { register, handleSubmit, onSubmit, setValue, errors, isUpdating } = useUpdateProfessionForm();

  // Récupération des catégories via le hook
  const { catQuery } = useCategories();
  const { data: allCategories } = catQuery;

  // Liste unique des catégories
  const categories = allCategories || [];
// console.log(initialData);
  // Préremplir les valeurs du formulaire avec les données initiales
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("userId", initialData.userId);
      setValue("categoryId", initialData.categoryId);
      setValue("tabs", initialData.tabs);
      setValue("professionId", initialData.id);
    }
  }, [initialData, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md"
    >
      <div className="mb-4">
        
      <input
        type="number" value={1}
        {...register("userId",  { valueAsNumber: true })}
        />
        <input
          type="number"
          {...register("professionId",  { valueAsNumber: true })}
          />
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom de la Profession
        </label>
        <Input
          type="text"
          {...register("name", { required: "Le nom de la profession est requis." })}
          placeholder="Nom du métier"
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{String(errors.name.message)}</p>
        )}
      </div>

      <ListCategories categories={categories} register={register} />

      <div className="mb-4">
        <KeywordInput register={register} setValue={setValue} errors={errors} initialKeywords={initialData.tabs} />
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

export default UpdateProfessionForm;
