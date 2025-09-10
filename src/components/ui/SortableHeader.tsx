'use client';

import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: string;
  currentDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
  className?: string;
}

export default function SortableHeader({
  label,
  sortKey,
  currentSort,
  currentDirection,
  onSort,
  className = ''
}: SortableHeaderProps) {
  const isActive = currentSort === sortKey;

  const getSortIcon = () => {
    if (!isActive) return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
    return currentDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-pink-600" />
      : <ChevronDown className="w-4 h-4 text-pink-600" />;
  };

  return (
    <button
      onClick={() => onSort(sortKey)}
      className={`flex items-center gap-2 font-bold text-left hover:text-pink-600 transition-colors ${
        isActive ? 'text-pink-800' : 'text-pink-800'
      } ${className}`}
    >
      <span>{label}</span>
      {getSortIcon()}
    </button>
  );
}