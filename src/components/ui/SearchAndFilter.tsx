'use client';

import React, { useState } from 'react';
import { Search, Filter, Heart, Star, UserX, Users as UsersIcon } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSegment: string;
  onSegmentChange: (segment: string) => void;
  totalResults: number;
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  selectedSegment,
  onSegmentChange,
  totalResults
}: SearchAndFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const segments = [
    { value: 'all', label: 'Todos os Clientes', icon: UsersIcon, color: 'text-gray-600', bg: 'bg-gray-100' },
    { value: 'VIP', label: 'VIP', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { value: 'Regular', label: 'Regulares', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100' },
    { value: 'New', label: 'Novos', icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { value: 'Inactive', label: 'Inativos', icon: UserX, color: 'text-red-600', bg: 'bg-red-100' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-pink-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou ID..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all placeholder-pink-300"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <Filter className="w-5 h-5" />
          Filtros
        </button>

        {/* Results Count */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-3 rounded-lg">
          <span className="text-pink-800 font-semibold">
            {totalResults} {totalResults === 1 ? 'cliente encontrado' : 'clientes encontrados'}
          </span>
        </div>
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="mt-6 p-4 bg-gradient-to-r from-pink-25 to-purple-25 rounded-lg border border-pink-200">
          <h3 className="text-pink-800 font-semibold mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtrar por Segmento
          </h3>
          <div className="flex flex-wrap gap-2">
            {segments.map((segment) => {
              const Icon = segment.icon;
              const isActive = selectedSegment === segment.value;
              
              return (
                <button
                  key={segment.value}
                  onClick={() => onSegmentChange(segment.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : `${segment.bg} ${segment.color} hover:shadow-md hover:scale-102`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {segment.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}