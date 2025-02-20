import React from "react";
import Input from "../components/Input"; // Composant Input réutilisable
import useCourseAdd from "../hook/useCourseAdd"; // Hook pour ajouter un cours
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { STRING_ROUTE_COURSES } from "../utils/const";

const CourseFormAdd = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, onSubmit, setValue, errors } = useCourseAdd();

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
  
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
          <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              {/* Crois en haut à gauche pour fermer */}
              <button
                onClick={()=>navigate(STRING_ROUTE_COURSES)}
                className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
  
              <h1 className="text-3xl font-bold text-center text-primaryColor">Ajouter un cours</h1>
  
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="z-20 w-2/4 p-6 mx-auto space-y-4 bg-white sm:w-full"
              >
              <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre du cours
        </label>
        <Input
          type="text"
          {...register("title")}
          placeholder="Titre du cours"
        />
        {errors.title?.message && (
          <p className="text-sm text-red-500">{String(errors.title.message)}</p>
        )}
      </div>

      {/* Champ Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description du cours
        </label>
        <Input
          type="text"
          {...register("description")}
          placeholder="Description du cours"
        />
        {errors.description?.message && (
          <p className="text-sm text-red-500">{String(errors.description.message)}</p>
        )}
      </div>

      {/* Champ Contenu */}
      <div className="mb-4">
        <label htmlFor="contenu" className="block text-sm font-medium text-gray-700">
          Contenu du cours
        </label>
        <textarea
          id="contenu"
          {...register("contenu")}
          placeholder="Contenu du cours"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.contenu?.message && (
          <p className="text-sm text-red-500">{String(errors.contenu.message)}</p>
        )}
      </div>

      {/* Champ Durée */}
      <div className="mb-4">
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Durée (en heures)
        </label>
        <Input
          type="number"
          {...register("duration")}
          placeholder="Durée du cours (en heures)"
        />
        {errors.duration?.message && (
          <p className="text-sm text-red-500">{String(errors.duration.message)}</p>
        )}
      </div>


                <Button type="submit" className="w-full" >
                  Ajouter le cours
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

  );
};

export default CourseFormAdd;
