import React, { useEffect, useState } from "react";
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
import { ImageIcon, X } from "lucide-react";
import MultiSelectInterests from "../components/ListInterest";
import useInterestGetAll from "../hook/useInterestGetAll";

const UpdateProfessionForm = ({ initialData }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, onSubmit, setValue, watch, errors, isUpdating } = useUpdateProfessionForm();
  
  // Fetch categories via hook
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
    setValue("interests", selectedInterests);  // Mettre à jour la valeur de "interests"
  }, [selectedInterests, setValue]);

  // State for image and its preview
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Pre-fill form with initial data
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("userId", initialData.userId);
      setValue("categoryId", initialData.categoryId);
      setValue("interests", initialData.interests || []); // Utiliser les intérêts initiaux si présents
      setValue("professionId", initialData.id);
      if (initialData.thumbnail) {
        setPreview(initialData.thumbnail);  // Use URL or base64 for preview
      }
    }
  }, [initialData, setValue]);

  // Function to handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
      setValue("thumbnail", file);  // Save image to the form
    }
  };

  // Function to remove image
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
            <h1 className="text-3xl font-bold text-center text-primaryColor">Modifier une Profession</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="z-20 w-2/4 p-6 mx-auto space-y-4 bg-white sm:w-full">
              <input hidden type="number" value={1} {...register("userId", { valueAsNumber: true })} />
              <input hidden type="number" {...register("professionId", { valueAsNumber: true })} />
              
              {/* Profession Name Input */}
              <div className="mb-4">
                <Label htmlFor="name">Nom de la Profession</Label>
                <Input type="text" {...register("name", { required: "Le nom de la profession est requis." })} placeholder="Nom du métier" />
                {errors.name?.message && <p className="text-sm text-red-500">{String(errors.name.message)}</p>}
              </div>

              {/* Categories List */}
              <ListCategories categories={categories} register={register} setValue={setValue} />

              {/* Interests MultiSelect */}
              <div className="mb-4">
                <MultiSelectInterests interests={interestList} selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests} />
              </div>

              {/* Profession Image */}
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

              {/* Submit Button */}
              <Button type="submit" className={`w-full py-2 px-4 rounded-md text-white ${isUpdating ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} disabled={isUpdating}>
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
