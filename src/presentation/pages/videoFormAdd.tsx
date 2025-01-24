import React from "react";
import Input from "../components/Input";
import ProfFilter from "../components/CategoryFilter";
import useCategories from "../hook/useCategories";
import ListCategories from '../components/ListCategories';
import KeywordInput from "../components/KeyWordInput";
import useVideoAdd from "../hook/useVideoAdd";
import useProfessionController from "../hook/useProfessionController";
import ListProfessions from "../components/ListProf";

const VideoFormAdd = () => {
    const { register, handleSubmit, onSubmit, setValue, errors } = useVideoAdd();
  
    const { profQuery } = useProfessionController();
    const { data: allProfessions } = profQuery;
  
    // Liste unique des profession
    const professions = allProfessions || [];
  
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md"
      >
        <div className="mb-4">
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
            Ajouter
        </button>
      </form>
    );
  };
  
  export default VideoFormAdd;