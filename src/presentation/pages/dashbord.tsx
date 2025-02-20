
import { Loader } from "../components/Loader";
import { Card, CardContent } from "../components/ui/card";
import useProfessionController from "../hook/useProfessionController";
import useVideoGetAll from "../hook/useVideoGetAll";

export default function Dashboard() {
  // Récupération des professions
  const { profQuery } = useProfessionController();
  const { data: allProfessions, isLoading: isLoadingProf, isError: isErrorProf } = profQuery;
  const professions = allProfessions || [];

  // Récupération des vidéos
  const { videoQuery } = useVideoGetAll();
  const { data: allVideos, isLoading: isLoadingVid, isError: isErrorVid } = videoQuery;
  const videos = allVideos || [];

  // Affichage du loader si une des requêtes est en cours
  if (isLoadingProf || isLoadingVid) return <Loader />;
  
  // Affichage d'un message d'erreur en cas de problème
  if (isErrorProf || isErrorVid) return <div>Erreur lors de la récupération des données.</div>;

  return (
    <div className="p-6">
      {/* Liste des professions */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Liste des Professions</h2>
      </div>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {professions.map((profession) => (
            <Card key={profession.id} className="flex-shrink-0 w-64">
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={profession.thumbnail}
                  alt={profession.name}
                  className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{profession.name}</h3>
                <p className="text-sm text-gray-500">{profession.category?.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Liste des vidéos */}
      <h2 className="mt-8 mb-4 text-2xl font-bold">Liste des Vidéos</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {videos.map((video) => (
            <Card key={video.id} className="flex-shrink-0 w-48">
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={video.thumbnail}
                  alt={`Video ${video.id}`}
                  className="object-cover w-full h-32 transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold">ID YouTube: {video.youtubeId}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
