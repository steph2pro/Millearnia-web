import React from "react";
import Input from "../components/Input";
import useVideoAdd from "../hook/useVideoAdd";
import useProfessionController from "../hook/useProfessionController";
import ListProfessions from "../components/ListProf";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { STRING_ROUTE_VIDEOS } from "../utils/const";
import { useNavigate } from "react-router-dom";

const VideoFormAdd = () => {

  const navigate = useNavigate();
    const { register, handleSubmit, onSubmit, setValue, errors } = useVideoAdd();
  
    const { profQuery } = useProfessionController();
    const { data: allProfessions } = profQuery;
  
    // Liste unique des profession
    const professions = allProfessions || [];
  
    return (
      <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            {/* Crois en haut à gauche pour fermer */}
            <button
              onClick={()=>navigate(STRING_ROUTE_VIDEOS)}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h1 className="text-3xl font-bold text-center text-primaryColor">Ajouter une video</h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="z-20 w-2/4 p-6 mx-auto space-y-4 bg-white sm:w-full"
            >
              <div className="mb-4">
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
            lien de l'image de la video
          </Label>
          <Input
            type="text"
            {...register("thumbnail", { required: "lien de l'image de la video est requis." })}
            placeholder="lien de l'image de la video"
          />
          {errors.thumbnail?.message && (
            <p className="text-sm text-red-500">{String(errors.thumbnail.message)}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="youtubeId" className="block text-sm font-medium text-gray-700">
            Id de la video youtube
          </Label>
          <Input
            type="text"
            {...register("youtubeId", { required: "Le nom de la profession est requis." })}
            placeholder="Id de la video youtube"
          />
          {errors.youtubeId?.message && (
            <p className="text-sm text-red-500">{String(errors.youtubeId.message)}</p>
          )}
        </div>
  
        <ListProfessions professions={professions} register={register} />
  

              <Button type="submit" className="w-full" >
                Ajouter
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>

      
    );
  };
  
  export default VideoFormAdd;