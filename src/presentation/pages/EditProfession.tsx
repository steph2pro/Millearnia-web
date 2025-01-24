import React from "react";
import { useParams } from "react-router-dom";
import useGetProfession from "../hook/useGetProfession";
import UpdateProfessionForm from "./updateProfessionForm";

const EditProfession = () => {
  const { id } = useParams();
  const { profQuery } = useGetProfession(Number(id));

  if (profQuery.isLoading) return <p>Chargement...</p>;
  if (profQuery.isError) return <p>Erreur : Impossible de charger les données.</p>;

  return <UpdateProfessionForm initialData={profQuery.data} />;
};

export default EditProfession;
