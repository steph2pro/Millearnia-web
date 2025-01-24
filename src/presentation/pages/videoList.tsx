import React, { useState } from 'react';
import ProfessionVideo from '../../data/models/ProfessionVideo';
import useSearch from '../hook/useSearch';
import ProfessionsFilter from '../components/ProfessionFilter';
import { Loader } from '../components/Loader';
import useProfessionController from '../hook/useProfessionController';
import useVideoGetAll from '../hook/useVideoGetAll';
import { useNavigate } from 'react-router-dom';
import { STRING_ROUTE_VIDEO_ADD } from '../utils/const';

const VideoList = () => {
  const navigate = useNavigate();
  
  // Récupération des vidéos
  const { videoQuery } = useVideoGetAll();
  const { data: videos, isLoading, isError } = videoQuery;

  // Récupération des professions
  const { profQuery } = useProfessionController();
  const { data: allProfessions } = profQuery;
  const professions = allProfessions || [];

  // Gestion du filtre de profession
  const [selectedProfession, setSelectedProfession] = useState<number | null>(null);

  // Gestion de la recherche avec le hook
  const { searchTerm, filteredItems: filteredVideos, handleSearchChange } = useSearch(
    videos || [],
    (video: ProfessionVideo, searchTerm: string) =>
      video.profession.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.youtubeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrer par profession si une profession est sélectionnée
  const displayedVideos = selectedProfession
    ? filteredVideos.filter((video) => video.professionId === selectedProfession)
    : filteredVideos;

  // Affichage pendant le chargement ou en cas d'erreur
  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching video.</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Filtre et recherche */}
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between">
          <ProfessionsFilter
            professions={professions}
            onProfessionChange={setSelectedProfession}
          />
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search"
              className="px-3 py-1 text-sm border rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-between m-5">
          <h3 className="mb-4 text-lg font-bold">Videos</h3>
          <button
            onClick={() => navigate(STRING_ROUTE_VIDEO_ADD)}
            className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 focus:outline-none"
          >
            + Ajouter une vidéo
          </button>
        </div>
        {/* Tableau des vidéos */}
        {displayedVideos.length > 0 ? (
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Profession</th>
                <th className="px-4 py-2">Video ID</th>
                <th className="px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {displayedVideos.map((video: ProfessionVideo) => (
                <tr key={video.id} className="border-t">
                  <td className="px-4 py-2">
                    <img
                      src={video.thumbnail}
                      alt="User"
                      className="w-10 h-10 rounded-full mr-5"
                    />
                  </td>
                  <td className="px-4 py-2">{video.profession.name}</td>
                  <td className="px-4 py-2">{video.youtubeId}</td>
                  <td className="px-4 py-2 flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/videoEdit/${video.id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/videoDelete/${video.id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500">Aucun élément trouvé.</div>
        )}
      </div>
    </div>
  );
};

export default VideoList;
