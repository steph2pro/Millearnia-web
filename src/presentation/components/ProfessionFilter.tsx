import React from 'react';
import Profession from '../../data/models/Profession'; // Modèle pour Profession (à adapter selon votre structure)

type ProfessionsFilterProps = {
  professions: Profession[]; // Liste des professions
  onProfessionChange?: (professionId: number | null) => void; // Callback pour gérer les changements
};

const ProfessionsFilter: React.FC<ProfessionsFilterProps> = ({ professions, onProfessionChange }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      {/* Bouton Filter */}
      <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg shadow hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h10.125m-15.75 0H3.375m7.125 6h10.125m-15.75 0H3.375m7.125 6h10.125m-15.75 0H3.375"
          />
        </svg>
        <span>Filter</span>
      </button>

      {/* Menu déroulant pour les professions */}
      <select
        id="profession-filter"
        onChange={(e) => onProfessionChange?.(e.target.value ? parseInt(e.target.value) : null)}
        className="flex items-center gap-2 px-6 py-2 text-gray-700 bg-white border rounded-lg shadow hover:bg-gray-100"
      >
        <option value="">All Professions</option>
        {professions.map((profession) => (
          <option key={profession.id} value={profession.id}>
            {profession.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfessionsFilter;
