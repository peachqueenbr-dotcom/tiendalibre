'use client';

import { useState, useMemo } from 'react';
import { CustomerAnalytics } from '@/types';
import { TrendingUp, Users, Gift, Target, Crown, Award, Search } from 'lucide-react';

interface RegularCustomersTabProps {
  customers: CustomerAnalytics[];
}

const ITEMS_PER_PAGE = 15;

export default function RegularCustomersTab({ customers }: RegularCustomersTabProps) {
  // Estados para paginação e filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'all' | 'almost-vip' | 'most-active'>('all');

  // Clientes regulares ordenados por potencial de upgrade
  const regularCustomers = customers
    .filter(c => c.segment === 'Regular')
    .sort((a, b) => b.customerLifetimeValue - a.customerLifetimeValue);

  // Clientes próximos de serem VIP (alta CLV mas ainda Regular)
  const almostVIP = regularCustomers
    .filter(c => c.customerLifetimeValue > 500); // Próximos do threshold VIP

  // Clientes regulares mais ativos (baixo tempo desde última compra)
  const mostActive = regularCustomers
    .filter(c => c.daysSinceLastOrder < 30)
    .sort((a, b) => a.daysSinceLastOrder - b.daysSinceLastOrder);

  // Escolher dados baseado na view ativa
  const getCurrentViewData = () => {
    switch (activeView) {
      case 'almost-vip': return almostVIP;
      case 'most-active': return mostActive;
      default: return regularCustomers;
    }
  };

  // Filtrar clientes
  const filteredCustomers = useMemo(() => {
    let filtered = getCurrentViewData();
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [activeView, searchTerm, regularCustomers, almostVIP, mostActive]);

  // Paginação
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCustomers, currentPage]);

  // Reset página quando view/filtros mudam
  const handleViewChange = (view: 'all' | 'almost-vip' | 'most-active') => {
    setActiveView(view);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Estatísticas
  const avgCLV = regularCustomers.reduce((sum, c) => sum + c.customerLifetimeValue, 0) / regularCustomers.length;
  const avgOrderValue = regularCustomers.reduce((sum, c) => sum + c.avgOrderValue, 0) / regularCustomers.length;
  const totalRegularRevenue = regularCustomers.reduce((sum, c) => sum + c.customerLifetimeValue, 0);

  const getViewTitle = () => {
    switch (activeView) {
      case 'almost-vip': return '👑 Próximos de VIP';
      case 'most-active': return '🔥 Mais Ativos';
      default: return '👥 Todos os Regulares';
    }
  };

  const getViewDescription = () => {
    switch (activeView) {
      case 'almost-vip': return 'Clientes com alto potencial para upgrade VIP';
      case 'most-active': return 'Clientes que compraram recentemente';
      default: return 'Todos os clientes regulares da base';
    }
  };

  const PageButton = ({ page, isActive, onClick }: { page: number; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 mx-1 rounded transition-colors ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
          : 'bg-white border border-blue-200 text-gray-700 hover:bg-blue-50'
      }`}
    >
      {page}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header Explicativo */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-blue-800">👥 Análise Clientes Regulares</h2>
        </div>
        <p className="text-blue-700 mb-3">
          <strong>Lógica da Análise:</strong> Clientes Regulares são sua base sólida (2+ pedidos, mas ainda não VIP). 
          Focamos em identificar quem está próximo de se tornar VIP e quem mantém atividade consistente.
        </p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-3 rounded border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">👥 Total Regulares</p>
            <p className="text-lg font-bold text-blue-800">{regularCustomers.length}</p>
          </div>
          <div className="bg-white p-3 rounded border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">💰 CLV Médio</p>
            <p className="text-lg font-bold text-blue-800">R$ {avgCLV.toFixed(2)}</p>
          </div>
          <div className="bg-white p-3 rounded border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">🛒 Ticket Médio</p>
            <p className="text-lg font-bold text-blue-800">R$ {avgOrderValue.toFixed(2)}</p>
          </div>
          <div className="bg-white p-3 rounded border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">📊 Receita Total</p>
            <p className="text-lg font-bold text-green-600">R$ {totalRegularRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b">
          {[
            { id: 'all', label: 'Todos', count: regularCustomers.length, icon: Users },
            { id: 'almost-vip', label: 'Próximos VIP', count: almostVIP.length, icon: Crown },
            { id: 'most-active', label: 'Mais Ativos', count: mostActive.length, icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleViewChange(tab.id as any)}
                className={`flex-1 px-6 py-4 text-center transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </div>
                <div className="text-sm opacity-75">
                  {tab.count} clientes
                </div>
              </button>
            );
          })}
        </div>

        {/* Filtros */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              {filteredCustomers.length} resultados
            </div>
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{getViewTitle()}</h3>
            <p className="text-sm text-gray-600">{getViewDescription()}</p>
          </div>

          <div className="space-y-3">
            {paginatedCustomers.map((customer, index) => {
              const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
              return (
                <div key={customer.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
                        {globalIndex + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{customer.name}</h4>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                        {customer.whatsapp && (
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            📱 {customer.whatsapp}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-green-600">R$ {customer.customerLifetimeValue.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">CLV</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-blue-600">{customer.orderCount}</p>
                        <p className="text-xs text-gray-500">pedidos</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-purple-600">{customer.daysSinceLastOrder}</p>
                        <p className="text-xs text-gray-500">dias</p>
                      </div>
                      
                      {activeView === 'almost-vip' && (
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                          🎯 Potencial VIP
                        </div>
                      )}
                      
                      {activeView === 'most-active' && (
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          customer.daysSinceLastOrder < 7 ? 'bg-green-100 text-green-800' :
                          customer.daysSinceLastOrder < 15 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {customer.daysSinceLastOrder < 7 ? '🔥 Muito Ativo' :
                           customer.daysSinceLastOrder < 15 ? '⚡ Ativo' : '🔄 Moderado'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredCustomers.length)} de {filteredCustomers.length} clientes
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-blue-200 text-gray-700 rounded-l-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="px-4 py-2 bg-white border border-blue-200 text-gray-700 rounded-r-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estratégias para Regulares */}
      <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
        <h3 className="text-indigo-800 font-semibold mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5" />
          🎯 Estratégias para Clientes Regulares
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded border border-indigo-200">
            <h4 className="font-medium text-indigo-800 mb-2 flex items-center gap-2">
              👑 Upgrade para VIP
            </h4>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Programa de pontos por compra</li>
              <li>• Desconto progressivo</li>
              <li>• Acesso antecipado a produtos</li>
              <li>• Frete grátis após X compras</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-indigo-200">
            <h4 className="font-medium text-indigo-800 mb-2 flex items-center gap-2">
              🔄 Manter Engajamento
            </h4>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Newsletter semanal</li>
              <li>• Promoções exclusivas</li>
              <li>• Conteúdo educativo</li>
              <li>• Pesquisas de satisfação</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-indigo-200">
            <h4 className="font-medium text-indigo-800 mb-2 flex items-center gap-2">
              💰 Aumentar Ticket
            </h4>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Bundles personalizados</li>
              <li>• "Quem comprou também levou"</li>
              <li>• Sugestões baseadas no histórico</li>
              <li>• Desconto por volume</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}