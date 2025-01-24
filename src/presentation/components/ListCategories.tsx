import React from "react";

const ListCategories = ({ categories, register }) => {
  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        Catégories
      </label>
      <select
        id="category"
        {...register("categoryId", { required: "Veuillez sélectionner une catégorie." })}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
        valueAsNumber
      >
        <option value="">choisir une catégorie</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListCategories;
