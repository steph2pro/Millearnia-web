import React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
const ListProfessions = ({ professions, register,setValue }) => {
  return (
    // <div className="mb-4">
    //   <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
    //     Professions auquel sera ratacher la video
    //   </label>
    //   <select 
    //     id="profession"
    //     {...register("professionId", { required: "Veuillez sélectionner une profession." })}
    //     className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none"
    //   >
    //     <option value="">Choisir une profession</option>
    //     {professions?.map((profession) => (
    //       <option key={profession.id} value={profession.id}>
    //         {profession.name}
    //       </option>
    //     ))}
    //   </select>
    // </div>
    <div className="mb-4">
      <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
      Professions au quel sera ratacher la video
      </label>

      <Select onValueChange={(value) => setValue("professionId", parseInt(value, 10))}>
        <SelectTrigger className="w-full mt-1">
          <SelectValue placeholder="Choisir une catégorie" />
        </SelectTrigger>
        <SelectContent>
          {professions?.map((profession) => (
            <SelectItem key={profession.id} value={profession.id.toString()}>
              {profession.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Champ caché pour enregistrer la valeur avec react-hook-form */}
      <input type="hidden" {...register("professionId", { required: "Veuillez sélectionner une profession." })} />
    </div>
  );
};

export default ListProfessions;
