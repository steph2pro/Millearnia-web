import React from "react";

const ListProfessions = ({ professions, register }) => {
  return (
    <div className="mb-4">
      <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
        Professions auquel sera ratacher la video
      </label>
      <select
        id="profession"
        {...register("professionId", { required: "Veuillez sélectionner une profession." })}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
      >
        <option value="">Choisir une profession</option>
        {professions?.map((profession) => (
          <option key={profession.id} value={profession.id}>
            {profession.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListProfessions;
