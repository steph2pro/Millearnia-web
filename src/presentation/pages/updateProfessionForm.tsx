import React, { useEffect } from "react";
import Input from "../components/Input";
import ProfFilter from "../components/CategoryFilter";
import useCategories from "../hook/useCategories";
import ListCategories from "../components/ListCategories";
import KeywordInput from "../components/KeyWordInput";
import useUpdateProfessionForm from "../hook/useUpdateProfession";
import ProfessionRequest from '../../data/models/ProfessionRequest';
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import { STRING_ROUTE_PROFESSIONS } from "../utils/const";

const UpdateProfessionForm = ({ initialData }) => {
  
  const navigate = useNavigate();
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
    <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          {/* Crois en haut à gauche pour fermer */}
          <button
            onClick={()=>navigate(STRING_ROUTE_PROFESSIONS)}
            className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h1 className="text-3xl font-bold text-center text-primaryColor">Modifier une Profession</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="z-20 w-2/4 p-6 mx-auto space-y-4 bg-white sm:w-full"
          >
            <div className="mb-4">
            <input hidden
            type="number" value={1}
            {...register("userId",  { valueAsNumber: true })}
            />
            <input hidden
              type="number"
              {...register("professionId",  { valueAsNumber: true })}
              />

        <Label htmlFor="name">
          Nom de la Profession
        </Label>
        <Input
          type="text"
          {...register("name", { required: "Le nom de la profession est requis." })}
          placeholder="Nom du métier"
        />
        {errors.name?.message && (
          <p className="text-sm text-red-500">{String(errors.name.message)}</p>
        )}
      </div>

      <ListCategories categories={categories} register={register} />

      <div className="mb-4">
         <KeywordInput register={register} setValue={setValue} errors={errors} initialKeywords={initialData.tabs} />
       </div>
        <Button type="submit"  className={`w-full py-2 px-4 rounded-md text-white ${
          isUpdating ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`} disabled={isUpdating} >
             {isUpdating ? "Mise à jour en cours..." : "Mettre à jour"}
        </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
   
  );
};

export default UpdateProfessionForm;
