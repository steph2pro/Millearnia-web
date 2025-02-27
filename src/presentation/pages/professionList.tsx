import React, { useEffect, useState } from 'react';
import Profession from '../../data/models/Profession';
import ProfFilter from '../components/CategoryFilter';
import useProfessionController from '../hook/useProfessionController';
import { Loader } from '../components/Loader';
import useCategories from '../hook/useCategories';
import { STRING_ROUTE_PROFESSION_ADD } from '../utils/const';
import { useNavigate } from 'react-router-dom';
import useSearch from '../hook/useSearch';
import { DataTablePagination } from '../components/data-table-pagination2';
import { Button } from '../components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import RetryComponent from '../components/RetryComponent';

const ProfessionList = () => {
  const navigate = useNavigate();

  // Récupération des professions
  const { profQuery } = useProfessionController();
  const { data: professions, isLoading, isError } = profQuery;

  useEffect(() => {
    console.log("Professions data:", professions);
  }, [professions]);

  // Récupération des catégories
  const { catQuery } = useCategories();
  const { data: allCategories } = catQuery;

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Utilisation du hook de recherche
  const { searchTerm, filteredItems: filteredProfessions, handleSearchChange } = useSearch(
    Array.isArray(professions) ? professions : [],
    (profession: Profession, searchTerm: string) =>
      profession.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profession.category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (profession.interests?.some((interest) => interest.title.toLowerCase().includes(searchTerm.toLowerCase())) ?? false)
  );

  // Filtrer par catégorie
  const displayedProfessions = selectedCategory
    ? filteredProfessions.filter((profession) => profession.categoryId === selectedCategory)
    : filteredProfessions;

  // Gestion de la pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const paginatedProfessions = displayedProfessions.slice((page - 1) * perPage, page * perPage);

  if (isLoading) return <Loader />;
  if (isError) {
    return <RetryComponent onRetry={profQuery.refetch} />;
  }


  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Statistiques globales */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="text-gray-500">Total Professions</h4>
          <h2 className="text-xl font-bold">{professions?.length}</h2>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="text-gray-500">Total Videos</h4>
          <h2 className="text-xl font-bold">
            {professions?.reduce((total, profession) => total + (profession.videos?.length || 0), 0)}
          </h2>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="text-gray-500">Total Comments</h4>
          <h2 className="text-xl font-bold">
            {professions?.reduce((total, profession) => total + (profession.comments?.length || 0), 0)}
          </h2>
        </div>
      </div>

      {/* Liste des professions */}
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-around">
          <ProfFilter categories={allCategories} onCategoryChange={setSelectedCategory} />
          <Button className="ml-10 bg-primaryColor" onClick={() => navigate(STRING_ROUTE_PROFESSION_ADD)}>
            Ajouter une profession
          </Button>
        </div>
        <div className="flex justify-between mt-6 mb-6">
          <h3 className="mb-4 text-lg font-bold">Professions</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            className="px-3 py-1 text-sm border rounded-lg w-[300px]"
          />
        </div>

        {paginatedProfessions.length > 0 ? (
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Interests</th>
                <th className="px-4 py-2">Videos</th>
                <th className="px-4 py-2">Comments</th>
                <th className="px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProfessions.map((profession: Profession) => (
                <tr key={profession.id} className="border-t">
                  <td className="px-4 py-2">{profession.name}</td>
                  <td className="px-4 py-2">{profession.category.title}</td>
                  <td className="px-4 py-2">{profession.interests?.map(interest => interest.title).join(', ')}</td>
                  <td className="px-4 py-2">{profession.videos?.length || 0}</td>
                  <td className="px-4 py-2">{profession.comments?.length || 0}</td>
                  <td className="flex items-center justify-between px-4 py-2">
                    
                  <div className="flex space-x-2">
                      {/* Bouton Modifier */}
                      <Button variant="outline" size="icon"
                          onClick={() => navigate(`/professionEdit/${profession.id}`)} >
                          <Pencil className="w-4 h-4" />
                        </Button>
  
                        {/* Bouton Supprimer */}
                        <Button variant="destructive" size="icon"
                          onClick={() => navigate(`/professionDelete/${profession.id}`)}>
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
          count={displayedProfessions.length}
          page={page}
          per_page={perPage}
          onPageChange={setPage}
          onRowsPerPageChange={setPerPage}
        />
      </div>
    </div>
  );
};

export default ProfessionList;
