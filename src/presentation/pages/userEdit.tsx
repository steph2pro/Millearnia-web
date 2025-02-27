import React from "react";
import { useParams } from "react-router-dom";
import useUserGet from "../hook/useUserGet";
import { Loader } from "../components/Loader";
import RetryComponent from "../components/RetryComponent";
import UserFormUpdate from "./userFormUpdate";

const UserEdit = () => {
  const { id } = useParams();
  const { UserQuery } = useUserGet(Number(id));

  if (UserQuery.isLoading) return <Loader />;
  if (UserQuery.error) {
    return <RetryComponent onRetry={UserQuery.refetch} />;
  }

  return <UserFormUpdate userData={UserQuery.data} />;
};

export default UserEdit;
