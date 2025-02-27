import React, { useState, useMemo } from 'react';
import ProfessionVideo from '../../data/models/ProfessionVideo';
import useSearch from '../hook/useSearch';
import ProfessionsFilter from '../components/ProfessionFilter';
import { Loader } from '../components/Loader';
import useProfessionController from '../hook/useProfessionController';
import useVideoGetAll from '../hook/useVideoGetAll';
import { useNavigate } from 'react-router-dom';
import { STRING_ROUTE_VIDEO_ADD } from '../utils/const';
import { DataTablePagination } from '../components/data-table-pagination2'; // Importation du composant de pagination
import { Button } from '../components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import RetryComponent from '../components/RetryComponent';

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

  // Pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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

  // Calculer le nombre total de vidéos affichées après filtrage
  const totalVideos = displayedVideos.length;

  // Pagination logique : slice des vidéos en fonction de la page et du nombre par page
  const paginatedVideos = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return displayedVideos.slice(startIndex, endIndex);
  }, [displayedVideos, page, perPage]);

  // Affichage pendant le chargement ou en cas d'erreur
  if (isLoading) return <Loader />;
  
  if (isError) {
    return <RetryComponent onRetry={videoQuery.refetch} />;
  }


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
              className=" text-sm border rounded-lg w-[300px] p-2"
            />
          </div>
        </div>
        <div className="flex justify-between m-5">
          <h3 className="mb-4 text-lg font-bold">Videos</h3>
          <Button className="ml-10 bg-primaryColor " onClick={() => navigate(STRING_ROUTE_VIDEO_ADD)}>
              Ajouter une vidéo
            </Button>
            
        </div>

        {/* Tableau des vidéos */}
        {paginatedVideos.length > 0 ? (
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Profession</th>
                <th className="px-4 py-2">Video ID</th>
                <th className="px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVideos.map((video: ProfessionVideo) => (
                <tr key={video.id} className="border-t">
                  <td className="px-4 py-2">
                    <img
                      src={video.thumbnail}
                      alt="User"
                      className="w-10 h-10 mr-5 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{video.title}</td>
                  <td className="px-4 py-2">{video.profession.name}</td>
                  <td className="px-4 py-2">{video.youtubeId}</td>
                  <td className="flex items-center justify-between px-4 py-2">
                    <div className="flex space-x-2">
                      {/* Bouton Modifier */}
                      <Button variant="outline" size="icon"
                        onClick={() => navigate(`/videoEdit/${video.id}`)} >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      {/* Bouton Supprimer */}
                      <Button variant="destructive" size="icon"
                        onClick={() => navigate(`/videoDelete/${video.id}`)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500">Aucun élément trouvé.</div>
        )}

        {/* Pagination */}
        <DataTablePagination
          count={totalVideos}
          page={page}
          per_page={perPage}
          onPageChange={setPage}
          onRowsPerPageChange={setPerPage}
        />
      </div>
    </div>
  );
};

export default VideoList;
