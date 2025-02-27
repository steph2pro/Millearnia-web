import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import useInterestUpdate from "../hook/useInterestUpdate";
import useProfessionController from "../hook/useProfessionController"
import { Button } from "../components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { Label } from "../components/ui/label";
import { STRING_ROUTE_CATEGORIES, STRING_ROUTE_INTERESTS } from "../utils/const";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../components/ui/textarea";

const InterestFormUpdate = ({ initialData }) => {
  
  const navigate = useNavigate();
  const { register, handleSubmit, onSubmit, setValue, errors, isUpdating } = useInterestUpdate();

  // Préremplir les valeurs du formulaire avec les données initiales
  useEffect(() => {
    if (initialData) {
      setValue("description", initialData.description);
      setValue("title", initialData.title);
      setValue("id", initialData.id);
     
    }
  }, [initialData, setValue]);

//     const [icon, setIcon] = useState<File | null>(null);
//       const [preview, setPreview] = useState<string | null>(null);
    
//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//           setIcon(file);
//           setPreview(URL.createObjectURL(file));
//           setValue("icon", file);
//         }
//       };
    
//       const removeImage = () => {
//         setIcon(null);
//         setPreview(null);
//         setValue("icon", null);
//       };
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          {/* Crois en haut à gauche pour fermer */}
          <button
            onClick={()=>navigate(STRING_ROUTE_INTERESTS)}
            className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h1 className="text-3xl font-bold text-center text-primaryColor"> Modifier un centre d'interet</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="z-20 w-2/4 p-6 mx-auto space-y-4 bg-white sm:w-full"
          >
         <input
          type="number"
          {...register("id",  { valueAsNumber: true })}
          className="hidden"
          />

        <div className="mb-4">
        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre du centre d'interet
                </Label>
                <Input
                    type="text"
                    {...register("title", { required: "Le titre de la catégorie est requis." })}
                    placeholder="Titre de la catégorie"
                />
                {errors.title?.message && (
                    <p className="text-sm text-red-500">{String(errors.title.message)}</p>
                )}
            </div>
            <div className="mb-4">
                <Label>Image de la catégorie</Label>
                <Textarea
                    placeholder={"Écrivez ici..."}
                    
                    {...register("description", { required: "La description du centre d'interet est requis." })}
                    className="min-h-[120px] resize-none"
                />
                {errors.description?.message && <p className="text-sm text-red-500">{String(errors.description.message)}</p>}
              </div>



            <Button type="submit"  
              className={`w-full py-2 px-4 rounded-md text-white ${
                isUpdating ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isUpdating}
            >
              {isUpdating ? "Mise à jour en cours..." : "Mettre à jour"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>

    
);
};

export default InterestFormUpdate;
