import React, { useState, useMemo } from 'react';
import Interest from '../../data/models/Interest';
import useSearch from '../hook/useSearch';
import ProfessionsFilter from '../components/ProfessionFilter';
import { Loader } from '../components/Loader';
import useProfessionController from '../hook/useProfessionController';
import useInterestGetAll from '../hook/useInterestGetAll';
import { useNavigate } from 'react-router-dom';
import { DataTablePagination } from '../components/data-table-pagination2';
import { Button } from '../components/ui/button';
import { STRING_ROUTE_INTEREST_ADD } from '../utils/const';
import { Pencil, Trash } from 'lucide-react';
import RetryComponent from '../components/RetryComponent';

const InterestList = () => {
  const navigate = useNavigate();
  const { InterestQuery } = useInterestGetAll();
  const { data: Interests, isLoading, isError } = InterestQuery;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedProfession, setSelectedProfession] = useState(null);

  const { searchTerm, filteredItems: filteredInterests, handleSearchChange } = useSearch(
    Interests || [],
    (interest, searchTerm) =>
      interest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interest.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedInterests = selectedProfession
    ? filteredInterests.filter((interest) =>
        interest.professionInterests?.some((pi) => pi.professionId === selectedProfession)
      )
    : filteredInterests;

  const totalInterests = displayedInterests.length;

  const paginatedInterests = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return displayedInterests.slice(startIndex, startIndex + perPage);
  }, [displayedInterests, page, perPage]);

   // Fonction pour tronquer le texte à 20 caractères
   const truncateText = (text) => {
    return text.length > 20 ? text.slice(0, 20) + '...' : text;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  
  if (isError) {
    return <RetryComponent onRetry={InterestQuery.refetch} />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            className="text-sm border rounded-lg w-[300px] p-2"
          />
        </div>
        <div className="flex justify-between m-5">
          <h3 className="mb-4 text-lg font-bold">Interests</h3>
          <Button className="ml-10 bg-primaryColor" onClick={() => navigate(STRING_ROUTE_INTEREST_ADD)}>
            Ajouter un centre d'intérêt
          </Button>
        </div>
        {paginatedInterests.length > 0 ? (
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">title</th>
                <th className="px-4 py-2">description</th>
                <th className="px-4 py-2">professions</th>
                <th className="px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInterests.map((interest) => (
                <tr key={interest.id} className="border-t">
                  <td className="px-4 py-2">
                   {interest.id}
                  </td>
                  <td className="px-4 py-2">
                   {interest.title}
                  </td>
                  <td className="px-4 py-2">
                   {interest.description}
                  </td>
                  <td className="px-4 py-2">
                    {interest.professionInterests?.map((pi) => pi.professionId).join(', ')}
                  </td>
                  
                  <td className="flex items-center justify-between px-4 py-2">
                    
                  <div className="flex space-x-2">
                    {/* Bouton Modifier */}
                    <Button variant="outline" size="icon"
                        onClick={() => navigate(`/interestEdit/${interest.id}`)} >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      {/* Bouton Supprimer */}
                      <Button variant="destructive" size="icon"
                        onClick={() => navigate(`/interestDelete/${interest.id}`)}>
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
        <DataTablePagination
          count={totalInterests}
          page={page}
          per_page={perPage}
          onPageChange={setPage}
          onRowsPerPageChange={setPerPage}
        />
      </div>
    </div>
  );
};

export default InterestList;
