import React from "react";
import { useParams } from "react-router-dom";
import useCategoryGet from "../hook/useCategoryGet";

import { Loader } from "../components/Loader";
import CategoryFormUpdate from "./categoryFormUpdate";

const CategoryEdit = () => {
  const { id } = useParams();
  const { CategoryQuery } = useCategoryGet(Number(id));

  if (CategoryQuery.isLoading) return <Loader />;
  if (CategoryQuery.isError) return <p>Erreur : Impossible de charger les données.</p>;

  return <CategoryFormUpdate initialData={CategoryQuery.data} />;
};

export default CategoryEdit;
