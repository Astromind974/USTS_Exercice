"use client";

import { ChangeEvent } from "react";

interface Filter {
  sender: string;
  keyword: string;
}

interface EmailFiltersProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export default function EmailFilters({ filter, onFilterChange }: EmailFiltersProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filter, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h2 className="text-lg font-semibold mb-4">Filtres</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sender" className="block text-sm font-medium text-gray-700 mb-1">
            Expéditeur
          </label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={filter.sender}
            onChange={handleChange}
            placeholder="Filtrer par expéditeur..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
            Mot-clé
          </label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            value={filter.keyword}
            onChange={handleChange}
            placeholder="Filtrer par mot-clé..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
