import React, { useState } from 'react'; 
import useProfessionController from '../hook/useProfessionController';
import { Loader } from '../components/Loader';
import ProfessionComment from '../../data/models/ProfessionComment';
import Profession from '../../data/models/Profession';
import ProfessionVideo from '../../data/models/ProfessionVideo';
import useCommentGetAll from '../hook/useCommentGetAll';
import useVideoGetAll from '../hook/useVideoGetAll';
import { useNavigate } from 'react-router-dom';
import {DataTablePagination} from '../components/data-table-pagination2'; // Import the pagination component

const CommentList = () => {
  const navigate = useNavigate();

  // Charger les commentaires
  const { commentsQuery } = useCommentGetAll();
  const { data: comments, isLoading, isError } = commentsQuery;

  // Charger les professions
  const { profQuery } = useProfessionController();
  const { data: professions } = profQuery;

  // Charger les vidéos
  const { videoQuery } = useVideoGetAll();
  const { data: videos } = videoQuery;

  // État des filtres
  const [selectedProfession, setSelectedProfession] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Filtrage des commentaires
  const filteredComments = comments?.filter((comment: ProfessionComment) => {
    const matchesProfession =
      selectedProfession === null || comment.professionId === selectedProfession;
    const matchesVideo =
      selectedVideo === null || comment.professionVideoId === selectedVideo;
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProfession && matchesVideo && matchesSearch;
  });

  // Affichage pendant le chargement ou en cas d'erreur
  if (isLoading) return <Loader />;
  if (isError) return <div>Erreur lors de la récupération des commentaires.</div>;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (value: number) => {
    setPerPage(value);
    setPage(1); // Reset to the first page when rows per page is changed
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Liste des Commentaires</h1>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Filtre Profession */}
        <div>
          <label htmlFor="profession-filter" className="block text-sm font-medium text-gray-700">
            Filtrer par Profession
          </label>
          <select
            id="profession-filter"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={selectedProfession ?? ''}
            onChange={(e) => setSelectedProfession(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">Toutes les professions</option>
            {professions?.map((profession: Profession) => (
              <option key={profession.id} value={profession.id}>
                {profession.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre Vidéo */}
        <div>
          <label htmlFor="video-filter" className="block text-sm font-medium text-gray-700">
            Filtrer par Vidéo
          </label>
          <select
            id="video-filter"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={selectedVideo ?? ''}
            onChange={(e) => setSelectedVideo(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">Toutes les vidéos</option>
            {videos?.map((video: ProfessionVideo) => (
              <option key={video.id} value={video.id}>
                {video.youtubeId}
              </option>
            ))}
          </select>
        </div>

        {/* Recherche */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Recherche
          </label>
          <input
            id="search"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Rechercher un commentaire"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table des commentaires */}
      <div className="p-4 bg-white rounded-lg shadow">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Profession</th>
              <th className="px-4 py-2">Vidéo</th>
              <th className="px-4 py-2">Contenu</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments?.length > 0 ? (
              filteredComments
                .slice((page - 1) * perPage, page * perPage)
                .map((comment: ProfessionComment) => (
                  <tr key={comment.id} className="border-t">
                    <td className="px-4 py-2">{comment.profession?.name || 'N/A'}</td>
                    <td className="px-4 py-2">{comment.professionVideoId || 'N/A'}</td>
                    <td className="px-4 py-2">{comment.content}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => navigate(`/commentEdit/${comment.id}`)}
                        className="mr-4 text-blue-500 hover:text-blue-700"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => navigate(`/commentDelete/${comment.id}`)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  Aucun commentaire trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <DataTablePagination
        count={filteredComments?.length}
        page={page}
        per_page={perPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default CommentList;
