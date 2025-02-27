import React from "react";
import { useParams } from "react-router-dom";
import useInterestGet from "../hook/useInterestGet";

import { Loader } from "../components/Loader";
import InterestFormUpdate from "./interestFormUpdate";
import RetryComponent from "../components/RetryComponent";

const InterestEdit = () => {
  const { id } = useParams();
  const { InterestQuery } = useInterestGet(Number(id));

  if (InterestQuery.isLoading) return <Loader />;
  if (InterestQuery.isError) {
    return <RetryComponent onRetry={InterestQuery.refetch} />;
  }

  return <InterestFormUpdate initialData={InterestQuery.data} />;
};

export default InterestEdit;
