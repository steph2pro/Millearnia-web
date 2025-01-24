import React, { useEffect } from "react";
import Input from "../components/Input";
import useCategories from "../hook/useCategories";
import ListCategories from "../components/ListCategories";
import KeywordInput from "../components/KeyWordInput";
import useUpdateProfessionForm from "../hook/useUpdateProfession";
import useVideoUpdate from "../hook/useVideoUpdate";
import useProfessionController from "../hook/useProfessionController";
import ListProfessions from "../components/ListProf";

const VideoFormUpdate = ({ initialData }) => {
  const { register, handleSubmit, onSubmit, setValue, errors, isUpdating } = useVideoUpdate();

  const { profQuery } = useProfessionController();
    const { data: allProfessions } = profQuery;
  
    // Liste unique des catégories
    const professions = allProfessions || [];
// console.log(initialData);
  // Préremplir les valeurs du formulaire avec les données initiales
  useEffect(() => {
    if (initialData) {
      setValue("thumbnail", initialData.thumbnail);
      setValue("youtubeId", initialData.youtubeId);
      setValue("id", initialData.id);
      setValue("professionId", initialData.professionId);
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
            lien de l'image de la video
          </label>
          <Input
            type="text"
            {...register("thumbnail", { required: "lien de l'image de la video est requis." })}
            placeholder="lien de l'image de la video"
          />
          {errors.thumbnail?.message && (
            <p className="text-red-500 text-sm">{String(errors.thumbnail.message)}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="youtubeId" className="block text-sm font-medium text-gray-700">
            Id de la video youtube
          </label>
          <Input
            type="text"
            {...register("youtubeId", { required: "Le nom de la profession est requis." })}
            placeholder="Id de la video youtube"
          />
          {errors.youtubeId?.message && (
            <p className="text-red-500 text-sm">{String(errors.youtubeId.message)}</p>
          )}
        </div>
  
        <ListProfessions professions={professions} register={register} />

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

export default VideoFormUpdate;
