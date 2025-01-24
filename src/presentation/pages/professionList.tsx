import React, { useState } from 'react';
import Profession from '../../data/models/Profession';
import ProfFilter from '../components/CategoryFilter';
import useProfessionController from '../hook/useProfessionController';
import { Loader } from '../components/Loader';
import useCategories from '../hook/useCategories';
import { STRING_ROUTE_PROFESSION_ADD } from '../utils/const';
import { useNavigate } from 'react-router-dom';
import useSearch from '../hook/useSearch';

const ProfessionList = () => {
  const navigate = useNavigate();

  // Récupération des professions
  const { profQuery } = useProfessionController();
  const { data: professions, isLoading, isError } = profQuery;

  // Récupération des catégories
  const { catQuery } = useCategories();
  const { data: allCategories } = catQuery;

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Utilisation du hook de recherche
  const { searchTerm, filteredItems: filteredProfessions, handleSearchChange } = useSearch(
    professions || [],
    (profession: Profession, searchTerm: string) =>
      profession.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profession.category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profession.tabs.some((tab) => tab.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filtrer par catégorie
  const displayedProfessions = selectedCategory
    ? filteredProfessions.filter((profession) => profession.categoryId === selectedCategory)
    : filteredProfessions;

  // Affichage pendant le chargement ou en cas d'erreur
  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching professions.</div>;

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
        <div className="flex justify-between">
          {/* Filtre par catégorie */}
          <ProfFilter
            categories={allCategories}
            onCategoryChange={setSelectedCategory}
          />
          {/* Recherche */}
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
          <h3 className="mb-4 text-lg font-bold">Professions</h3>
          <button
            onClick={() => navigate(STRING_ROUTE_PROFESSION_ADD)}
            className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 focus:outline-none"
          >
            + Ajouter une profession
          </button>
        </div>

        {/* Table des professions */}
        {displayedProfessions.length > 0 ? (
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Tabs</th>
                <th className="px-4 py-2">Videos</th>
                <th className="px-4 py-2">Comments</th>
                <th className="px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody>
              {displayedProfessions.map((profession: Profession) => (
                <tr key={profession.id} className="border-t">
                  <td className="px-4 py-2">{profession.name}</td>
                  <td className="px-4 py-2">{profession.category.title}</td>
                  <td className="px-4 py-2">{profession.tabs.join(', ')}</td>
                  <td className="px-4 py-2">{profession.videos?.length || 0}</td>
                  <td className="px-4 py-2">{profession.comments?.length || 0}</td>
                  <td className="px-4 py-2 flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/professionEdit/${profession.id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/professionDelete/${profession.id}`)}
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

export default ProfessionList;
