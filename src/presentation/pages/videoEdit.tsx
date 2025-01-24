import React from "react";
import { useParams } from "react-router-dom";
import useVideoGet from "../hook/useVideoGet";
import VideoFormUpdate from "./videoFormUpdate";
import { Loader } from "../components/Loader";

const VideoEdit = () => {
  const { id } = useParams();
  const { videoQuery } = useVideoGet(Number(id));

  if (videoQuery.isLoading) return <Loader />;
  if (videoQuery.isError) return <p>Erreur : Impossible de charger les données.</p>;

  return <VideoFormUpdate initialData={videoQuery.data} />;
};

export default VideoEdit;
