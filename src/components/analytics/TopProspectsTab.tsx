'use client';

import { useState, useMemo } from 'react';
import { CustomerAnalytics } from '@/types';
import { Zap, Phone, Mail, Clock, DollarSign, Percent, Star, ArrowUp, Search, Target } from 'lucide-react';

interface TopProspectsTabProps {
  customers: CustomerAnalytics[];
}

const ITEMS_PER_PAGE = 12;

export default function TopProspectsTab({ customers }: TopProspectsTabProps) {
  // Estados para paginação e filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'probability' | 'clv' | 'recent'>('probability');
  const [probabilityFilter, setProbabilityFilter] = useState<'all' | 'high' | 'medium'>('all');

  // Todos os prospects com maior probabilidade de compra
  const allProspects = customers
    .filter(c => 
      c.segment !== 'Inactive' && 
      c.daysSinceLastOrder > 7 && 
      c.daysSinceLastOrder < 60 &&
      c.orderCount >= 2
    )
    .sort((a, b) => {
      // Score baseado em: CLV + frequência - tempo desde última compra
      const scoreA = (a.customerLifetimeValue * 0.4) + (a.orderCount * 50) - (a.daysSinceLastOrder * 2);
      const scoreB = (b.customerLifetimeValue * 0.4) + (b.orderCount * 50) - (b.daysSinceLastOrder * 2);
      return scoreB - scoreA;
    });

  // Calcular probabilidade de compra (score normalizado)
  const calculatePurchaseProbability = (customer: CustomerAnalytics): number => {
    const baseScore = (customer.customerLifetimeValue * 0.4) + (customer.orderCount * 50) - (customer.daysSinceLastOrder * 2);
    const maxScore = Math.max(...allProspects.map(c => 
      (c.customerLifetimeValue * 0.4) + (c.orderCount * 50) - (c.daysSinceLastOrder * 2)
    ));
    return Math.min(95, Math.max(65, (baseScore / maxScore) * 100));
  };

  // Filtrar e ordenar prospects
  const filteredProspects = useMemo(() => {
    let filtered = allProspects;
    
    // Aplicar busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term)
      );
    }
    
    // Aplicar filtro de probabilidade
    if (probabilityFilter !== 'all') {
      filtered = filtered.filter(customer => {
        const probability = calculatePurchaseProbability(customer);
        if (probabilityFilter === 'high') return probability >= 80;
        if (probabilityFilter === 'medium') return probability >= 70 && probability < 80;
        return true;
      });
    }
    
    // Aplicar ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'probability':
          return calculatePurchaseProbability(b) - calculatePurchaseProbability(a);
        case 'clv':
          return b.customerLifetimeValue - a.customerLifetimeValue;
        case 'recent':
          return a.daysSinceLastOrder - b.daysSinceLastOrder;
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [allProspects, searchTerm, probabilityFilter, sortBy]);

  // Paginação
  const totalPages = Math.ceil(filteredProspects.length / ITEMS_PER_PAGE);
  const paginatedProspects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProspects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProspects, currentPage]);

  // Reset página quando filtros mudam
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: 'probability' | 'clv' | 'recent') => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleProbabilityFilterChange = (value: 'all' | 'high' | 'medium') => {
    setProbabilityFilter(value);
    setCurrentPage(1);
  };

  // Estatísticas dos prospects
  const avgProbability = filteredProspects.length > 0 ? 
    filteredProspects.reduce((sum, c) => sum + calculatePurchaseProbability(c), 0) / filteredProspects.length : 0;
  const totalPotentialRevenue = filteredProspects.reduce((sum, c) => sum + c.avgOrderValue, 0);
  const expectedRevenue = totalPotentialRevenue * (avgProbability / 100);

  const PageButton = ({ page, isActive, onClick }: { page: number; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 mx-1 rounded transition-colors ${
        isActive 
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
          : 'bg-white border border-emerald-200 text-gray-700 hover:bg-emerald-50'
      }`}
    >
      {page}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header Explicativo */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-emerald-800">⚡ Prospects de Alta Conversão</h2>
        </div>
        <p className="text-emerald-700 mb-3">
          <strong>Lógica da Análise:</strong> Algoritmo que combina histórico de compras, valor médio do pedido e tempo desde a última compra. 
          Clientes que compraram recentemente (7-60 dias) e têm bom histórico têm maior probabilidade de comprar novamente.
        </p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-3 rounded border border-emerald-200">
            <p className="text-sm text-emerald-600 font-medium">👥 Total Prospects</p>
            <p className="text-lg font-bold text-emerald-800">{filteredProspects.length}</p>
          </div>
          <div className="bg-white p-3 rounded border border-emerald-200">
            <p className="text-sm text-emerald-600 font-medium">📊 Probabilidade Média</p>
            <p className="text-lg font-bold text-emerald-800">{avgProbability.toFixed(1)}%</p>
          </div>
          <div className="bg-white p-3 rounded border border-emerald-200">
            <p className="text-sm text-emerald-600 font-medium">💰 Receita Potencial</p>
            <p className="text-lg font-bold text-emerald-800">R$ {totalPotentialRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white p-3 rounded border border-emerald-200">
            <p className="text-sm text-emerald-600 font-medium">🎯 Receita Esperada</p>
            <p className="text-lg font-bold text-green-600">R$ {expectedRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar prospects por nome ou email..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={probabilityFilter}
              onChange={(e) => handleProbabilityFilterChange(e.target.value as 'all' | 'high' | 'medium')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">Todas as Probabilidades</option>
              <option value="high">Alta (≥ 80%)</option>
              <option value="medium">Média (70-79%)</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as 'probability' | 'clv' | 'recent')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="probability">Ordenar por Probabilidade</option>
              <option value="clv">Ordenar por CLV</option>
              <option value="recent">Ordenar por Atividade</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Prospects */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-emerald-100">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
          <h3 className="text-white font-bold text-xl flex items-center gap-3">
            <Target className="w-6 h-6" />
            🎯 Prospects de Alta Conversão ({filteredProspects.length})
          </h3>
          <p className="text-emerald-100 mt-2">
            Mostrando {paginatedProspects.length} de {filteredProspects.length} prospects - 
            Focado nos com maior probabilidade de compra!
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          {paginatedProspects.map((customer, index) => {
            const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
            const probability = calculatePurchaseProbability(customer);
            const isHighPriority = probability >= 85;
            const isMediumPriority = probability >= 75 && probability < 85;
            
            return (
              <div 
                key={customer.id} 
                className={`border rounded-lg p-6 transition-all hover:shadow-lg ${
                  isHighPriority ? 'bg-emerald-50 border-emerald-200 shadow-md' :
                  isMediumPriority ? 'bg-yellow-50 border-yellow-200' :
                  'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      isHighPriority ? 'bg-emerald-500' :
                      isMediumPriority ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}>
                      {globalIndex + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        {customer.name}
                        {isHighPriority && <ArrowUp className="w-4 h-4 text-emerald-500" />}
                      </h4>
                      <p className="text-gray-600">{customer.email}</p>
                      {customer.whatsapp && (
                        <p className="text-green-600 flex items-center gap-1 text-sm">
                          📱 {customer.whatsapp}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold ${
                      probability >= 85 ? 'bg-green-500 text-white' :
                      probability >= 75 ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      <Percent className="w-4 h-4" />
                      {probability.toFixed(1)}% chance
                    </div>
                    {isHighPriority && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium text-xs">
                          🔥 HOT PROSPECT
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <DollarSign className="w-4 h-4" />
                      CLV Total
                    </div>
                    <p className="font-bold text-green-600">R$ {customer.customerLifetimeValue.toFixed(2)}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Zap className="w-4 h-4" />
                      Ticket Médio
                    </div>
                    <p className="font-bold text-blue-600">R$ {customer.avgOrderValue.toFixed(2)}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Star className="w-4 h-4" />
                      Pedidos
                    </div>
                    <p className="font-bold text-purple-600">{customer.orderCount}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4" />
                      Última Compra
                    </div>
                    <p className={`font-bold ${
                      customer.daysSinceLastOrder < 15 ? 'text-green-600' :
                      customer.daysSinceLastOrder < 30 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {customer.daysSinceLastOrder} dias
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-t border-emerald-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProspects.length)} de {filteredProspects.length} prospects
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-emerald-200 text-gray-700 rounded-l-lg hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                
                <div className="flex">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = currentPage <= 3 ? i + 1 : 
                                currentPage >= totalPages - 2 ? totalPages - 4 + i :
                                currentPage - 2 + i;
                    
                    if (page < 1 || page > totalPages) return null;
                    
                    return (
                      <PageButton
                        key={page}
                        page={page}
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      />
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-emerald-200 text-gray-700 rounded-r-lg hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Plano de Ação */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-lg text-white">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          🚀 Plano de Ação - Próximas 48 Horas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-emerald-100">⏰ Hoje (Próximas 4 horas)</h4>
            <ul className="space-y-2 text-sm text-emerald-50">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Contactar os TOP 5 prospects por WhatsApp/telefone
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Preparar ofertas personalizadas baseadas no histórico
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Configurar follow-up automático
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-emerald-100">📅 Amanhã</h4>
            <ul className="space-y-2 text-sm text-emerald-50">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Email campanha para prospects de alta probabilidade
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Newsletter segmentada para prospects médios
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Medir taxa de resposta inicial
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
          <p className="font-medium">🎯 Meta: Converter pelo menos 3 dos 10 prospects em vendas nos próximos 7 dias</p>
          <p className="text-sm text-emerald-100 mt-1">
            Receita esperada: R$ {(expectedRevenue * 0.3).toFixed(2)} - R$ {(expectedRevenue * 0.5).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}