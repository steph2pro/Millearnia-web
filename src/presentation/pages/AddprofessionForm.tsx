import React from "react";
import Input from "../components/Input";
import ProfFilter from "../components/CategoryFilter";
import useCategories from "../hook/useCategories";
import useProfessionForm from "../hook/useProfessionForm";
import ListCategories from '../components/ListCategories';
import KeywordInput from "../components/KeyWordInput";

const ProfessionForm = () => {
    const { register, handleSubmit, onSubmit, setValue, errors } = useProfessionForm();
  
    const { catQuery } = useCategories();
    const { data: allCategories } = catQuery;
  
    // Liste unique des catégories
    const categories = allCategories || [];
  
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
          <KeywordInput register={register} setValue={setValue} errors={errors} />
          
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
  
  export default ProfessionForm;