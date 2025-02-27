import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import useVideoAdd from "../hook/useVideoAdd";
import useProfessionController from "../hook/useProfessionController";
import ListProfessions from "../components/ListProf";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { STRING_ROUTE_VIDEOS } from "../utils/const";
import { useNavigate } from "react-router-dom";
import { ImageIcon, X } from "lucide-react";

const VideoFormAdd = () => {

  const navigate = useNavigate();
    const { register, handleSubmit, onSubmit, setValue, errors } = useVideoAdd();
  
    const { profQuery } = useProfessionController();
    const { data: allProfessions } = profQuery;
  
    // Liste unique des profession
    const professions = allProfessions || [];

    const [thumbnail, setThumbnail] = useState<File | null>(null);
      const [preview, setPreview] = useState<string | null>(null);
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setThumbnail(file);
          setPreview(URL.createObjectURL(file));
          setValue("thumbnail", file);
        }
      };
    
      const removeImage = () => {
        setThumbnail(null);
        setPreview(null);
        setValue("thumbnail", null);
      };
    
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
            titre de la video
          </Label>
          <Input
            type="text"
            {...register("title", { required: "le titre de la video est requis." })}
            placeholder="titre  de la video"
          />
          {errors.title?.message && (
            <p className="text-sm text-red-500">{String(errors.title.message)}</p>
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
  
        <ListProfessions professions={professions} register={register} setValue={setValue}  />
        <div className="mb-4">
                <Label>Image de la Video</Label>
                <div className="flex flex-col items-center justify-center w-full p-4 border border-gray-300 rounded-lg">
                  {preview ? (
                    <div className="relative w-32 h-32">
                      <img src={preview} alt="Preview" className="object-cover w-full h-full rounded-md" />
                      <button onClick={removeImage} className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full">
                        <X className="w-4 h-4" />
                      </button>
                    </div> 
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                      <span className="text-sm text-gray-600">Choisir une image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
                {errors.thumbnail?.message && <p className="text-sm text-red-500">{String(errors.thumbnail.message)}</p>}
              </div>

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