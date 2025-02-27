import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const ListCategories = ({ categories, register, setValue }) => {
  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        Catégories
      </label>

      <Select onValueChange={(value) => setValue("categoryId", parseInt(value, 10))}>
        <SelectTrigger className="w-full mt-1">
          <SelectValue placeholder="Choisir une catégorie" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Champ caché pour enregistrer la valeur avec react-hook-form */}
      <input type="hidden" {...register("categoryId", { required: "Veuillez sélectionner une catégorie." })} />
    </div>
  );
};

export default ListCategories;
