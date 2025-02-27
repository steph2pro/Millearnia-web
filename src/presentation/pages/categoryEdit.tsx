import React from "react";
import { useParams } from "react-router-dom";
import useCategoryGet from "../hook/useCategoryGet";

import { Loader } from "../components/Loader";
import CategoryFormUpdate from "./categoryFormUpdate";
import RetryComponent from "../components/RetryComponent";

const CategoryEdit = () => {
  const { id } = useParams();
  const { CategoryQuery } = useCategoryGet(Number(id));

  if (CategoryQuery.isLoading) return <Loader />;
  if (CategoryQuery.isError) {
    return <RetryComponent onRetry={CategoryQuery.refetch} />;
  }

  return <CategoryFormUpdate initialData={CategoryQuery.data} />;
};

export default CategoryEdit;
