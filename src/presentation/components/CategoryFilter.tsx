import React from 'react';
import useCategories from '../hook/useCategories';
import { Loader } from './Loader';
import ProfessionCategory from '../../data/models/ProfessionCategory';

type ProfFilterProps = {
  categories: ProfessionCategory[];
  onCategoryChange?: (categoryId: number | null) => void;
};
const ProfFilter: React.FC<ProfFilterProps> = ({ categories, onCategoryChange }) => {
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

      <select
        id="category-filter"
        onChange={(e) => onCategoryChange(e.target.value ? parseInt(e.target.value) : null)}
        className="flex items-center gap-2 px-6 py-2 text-gray-700 bg-white border rounded-lg shadow hover:bg-gray-100"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfFilter;
