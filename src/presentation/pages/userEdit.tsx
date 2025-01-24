import React from "react";
import { useParams } from "react-router-dom";
import useUserGet from "../hook/useUserGet";
import UserFormUpdate from "./UserFormUpdate";
import { Loader } from "../components/Loader";

const UserEdit = () => {
  const { id } = useParams();
  const { UserQuery } = useUserGet(Number(id));

  if (UserQuery.isLoading) return <Loader />;
  if (UserQuery.isError) return <p>Erreur : Impossible de charger les données.</p>;

  return <UserFormUpdate userData={UserQuery.data} />;
};

export default UserEdit;
