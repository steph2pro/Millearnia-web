import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import ListCategories from "../components/ListCategories";
import MultiSelectInterests from "../components/ListInterest";
import { useNavigate } from "react-router-dom";
import { STRING_ROUTE_PROFESSIONS } from "../utils/const";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import useCategories from "../hook/useCategories";
import useProfessionForm from "../hook/useProfessionForm";
import useInterestGetAll from "../hook/useInterestGetAll";
import { ImageIcon, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

const ProfessionForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, onSubmit, setValue, watch, errors } = useProfessionForm();

  const { catQuery } = useCategories();
  const { data: allCategories } = catQuery;
  const categories = allCategories || [];

  const { InterestQuery } = useInterestGetAll();
  const { data: AllInterests } = InterestQuery;
  const interestList = AllInterests || [];

  // Récupération des intérêts sélectionnés via react-hook-form
  const [selectedInterests, setSelectedInterests] = useState<number[]>(watch("interests", []));

  // Mise à jour automatique du champ "interests" dans le formulaire
  useEffect(() => {
    setValue("interests", selectedInterests);
  }, [selectedInterests, setValue]);

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
            <button onClick={() => navigate(STRING_ROUTE_PROFESSIONS)} className="absolute text-gray-500 top-2 right-2 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-center text-primaryColor">Ajouter une Profession</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="z-20 w-2/4 p-6 mx-auto space-y-4 bg-white sm:w-full">
              <input hidden type="number" value={1} {...register("userId", { valueAsNumber: true })} />
              <div className="mb-4">
                <Label htmlFor="name">Nom de la Profession</Label>
                <Input type="text" {...register("name", { required: "Le nom de la profession est requis." })} placeholder="Nom du métier" />
                {errors.name?.message && <p className="text-sm text-red-500">{String(errors.name.message)}</p>}
              </div>
              <ListCategories categories={categories} register={register} setValue={setValue} />
              <div className="mb-4">
                <MultiSelectInterests interests={interestList} selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests} />
              </div>
              <div className="mb-4">
                <Label>Image de la Profession</Label>
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
              <Button type="submit" className="w-full">
                Ajouter
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionForm;
