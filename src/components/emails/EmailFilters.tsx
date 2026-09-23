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
    <div className="filter-section w-full max-w-[90vw] mx-auto"> {/* Largeur max sur mobile */}
      <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
        Filtres
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"> {/* 1 colonne sur mobile */}
        <div>
          <label htmlFor="sender" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Expéditeur
          </label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={filter.sender}
            onChange={handleChange}
            placeholder="Filtrer par expéditeur..."
            className="w-full p-2 border border-slate-300 dark:border-slate-600
                       rounded-md bg-white dark:bg-slate-800
                       text-slate-800 dark:text-slate-100
                       placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
        <div>
          <label htmlFor="keyword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Mot-clé
          </label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            value={filter.keyword}
            onChange={handleChange}
            placeholder="Filtrer par mot-clé..."
            className="w-full p-2 border border-slate-300 dark:border-slate-600
                       rounded-md bg-white dark:bg-slate-800
                       text-slate-800 dark:text-slate-100
                       placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
      </div>
    </div>
  );
}
