import React, { useState } from 'react';
import ProfessionCategory from '../../data/models/ProfessionCategory';
import useSearch from '../hook/useSearch';
import ProfessionsFilter from '../components/ProfessionFilter';
import { Loader } from '../components/Loader';
import useProfessionController from '../hook/useProfessionController';
import { useNavigate } from 'react-router-dom';
import useCategories from '../hook/useCategories';
import { STRING_ROUTE_CATEGORY_ADD } from '../utils/const';
import DataTable from '../components/data-table';
import { DataTablePagination } from '../components/data-table-pagination2';
import { Button } from '../components/ui/button';

const CategoryList = () => {
  const navigate = useNavigate();
  
  // Récupération des catégories
  const { catQuery } = useCategories();
  const { data: categories = [], isLoading, isError } = catQuery;

  // Récupération des professions
  const { profQuery } = useProfessionController();
  const { data: allProfessions = [] } = profQuery;
  const professions = allProfessions;

  // Gestion du filtre de profession
  const [selectedProfession, setSelectedProfession] = useState<number | null>(null);

  // Gestion de la pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Gestion de la recherche avec le hook
  const { searchTerm, filteredItems: filteredCategories, handleSearchChange } = useSearch(
    categories,
    (category: ProfessionCategory, searchTerm: string) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.professions.some((profession) => profession.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filtrer par profession si une profession est sélectionnée
  const displayedCategories = selectedProfession
    ? filteredCategories.filter((category) => category.professions && category.professions.some((profession) => profession.id === selectedProfession))
    : filteredCategories;

  // Pagination des catégories
  const paginatedCategories = displayedCategories.slice((page - 1) * perPage, page * perPage);

  // Affichage pendant le chargement ou en cas d'erreur
  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-500">Erreur lors de la récupération des catégories.</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between">
          <ProfessionsFilter professions={professions} onProfessionChange={setSelectedProfession} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher"
            className="px-3 py-1 text-sm border rounded-lg"
          />
        </div>
        
        <div className="flex justify-between m-5">
          <h3 className="mb-4 text-lg font-bold">Catégories</h3>
          <Button className="ml-10 bg-primaryColor " onClick={() => navigate(STRING_ROUTE_CATEGORY_ADD)}>
            Ajouter une catégorie
          </Button>
        </div>

        {paginatedCategories.length > 0 ? (
          <>
            <table className="w-full text-left table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Icon</th>
                  <th className="px-4 py-2">Titre</th>
                  <th className="px-4 py-2">Professions</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.map((category: ProfessionCategory) => (
                  <tr key={category.id} className="border-t">
                    <td className="px-4 py-2">
                      <img src={category.icon} alt="Icon" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-4 py-2">{category.title}</td>
                    <td className="px-4 py-2">
                      {category.professions && category.professions.length > 0
                        ? category.professions.map((prof) => prof.name).join(', ')
                        : 'Aucune profession'}
                    </td>
                    <td className="flex px-4 py-2 space-x-4">
                      <button
                        onClick={() => navigate(`/categoryEdit/${category.id}`)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => navigate(`/categoryDelete/${category.id}`)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <DataTablePagination
              count={displayedCategories.length}
              page={page}
              per_page={perPage}
              onPageChange={setPage}
              onRowsPerPageChange={setPerPage}
            />
          </>
        ) : (
          <div className="text-center text-gray-500">Aucune catégorie trouvée.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
