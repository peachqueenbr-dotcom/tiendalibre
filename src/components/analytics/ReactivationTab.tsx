'use client';

import { useState, useMemo } from 'react';
import { CustomerAnalytics } from '@/types';
import { Phone, Mail, Calendar, DollarSign, ShoppingBag, AlertTriangle, Search } from 'lucide-react';
import SortableHeader from '@/components/ui/SortableHeader';
import CustomerProductsModal from '@/components/ui/CustomerProductsModal';

interface ReactivationTabProps {
  customers: CustomerAnalytics[];
}

const ITEMS_PER_PAGE = 15;

export default function ReactivationTab({ customers }: ReactivationTabProps) {
  // Estados para paginação e filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('customerLifetimeValue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAnalytics | null>(null);

  // Clientes inativos (>90 dias sem comprar) com histórico de compras
  const inactiveCustomers = customers
    .filter(c => c.segment === 'Inactive' && c.orderCount > 0);

  // Filtrar e ordenar clientes
  const filteredCustomers = useMemo(() => {
    let filtered = inactiveCustomers;
    
    // Aplicar busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term)
      );
    }
    
    // Aplicar ordenação
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof CustomerAnalytics];
      let bValue = b[sortBy as keyof CustomerAnalytics];
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    return filtered;
  }, [inactiveCustomers, searchTerm, sortBy, sortDirection]);

  // Paginação
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCustomers, currentPage]);

  // Reset página quando filtros mudam
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  // Estatísticas dos inativos
  const totalLostRevenue = filteredCustomers.reduce((sum, c) => sum + c.customerLifetimeValue, 0);
  const avgDaysInactive = filteredCustomers.length > 0 ? 
    filteredCustomers.reduce((sum, c) => sum + c.daysSinceLastOrder, 0) / filteredCustomers.length : 0;
  const potentialRecovery = totalLostRevenue * 0.15;


  const PageButton = ({ page, isActive, onClick }: { page: number; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 mx-1 rounded transition-colors ${
        isActive 
          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
          : 'bg-white border border-pink-200 text-gray-700 hover:bg-pink-50'
      }`}
    >
      {page}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header Explicativo */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-red-800">🔄 Reativação de Clientes</h2>
        </div>
        <p className="text-red-700 mb-3">
          <strong>Lógica da Análise:</strong> Identificamos clientes que já compraram anteriormente mas estão inativos há mais de 90 dias. 
          Estes clientes têm maior chance de retorno pois já conhecem seus produtos.
        </p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-3 rounded border border-red-200">
            <p className="text-sm text-red-600 font-medium">👥 Total Inativos</p>
            <p className="text-lg font-bold text-red-800">{filteredCustomers.length}</p>
          </div>
          <div className="bg-white p-3 rounded border border-red-200">
            <p className="text-sm text-red-600 font-medium">💸 Receita Perdida</p>
            <p className="text-lg font-bold text-red-800">R$ {totalLostRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white p-3 rounded border border-red-200">
            <p className="text-sm text-red-600 font-medium">⏰ Dias Médios</p>
            <p className="text-lg font-bold text-red-800">{avgDaysInactive.toFixed(0)} dias</p>
          </div>
          <div className="bg-white p-3 rounded border border-red-200">
            <p className="text-sm text-red-600 font-medium">🎯 Potencial Recuperação</p>
            <p className="text-lg font-bold text-green-600">R$ {potentialRecovery.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-gray-600">
            Clique nos cabeçalhos da tabela para ordenar
          </div>
        </div>
      </div>

      {/* Lista de Clientes para Reativar */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
          <h3 className="text-white font-semibold text-xl flex items-center gap-2">
            <Mail className="w-6 h-6" />
            💔 Clientes para Reativar ({filteredCustomers.length})
          </h3>
          <p className="text-red-100 text-sm mt-1">
            Mostrando {paginatedCustomers.length} de {filteredCustomers.length} clientes inativos
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-red-50 to-orange-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <span className="font-bold text-red-800">Prioridade</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <SortableHeader
                    label="Cliente"
                    sortKey="name"
                    currentSort={sortBy}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    className="text-red-800"
                  />
                </th>
                <th className="px-6 py-4 text-left">
                  <SortableHeader
                    label="CLV Total"
                    sortKey="customerLifetimeValue"
                    currentSort={sortBy}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    className="text-red-800"
                  />
                </th>
                <th className="px-6 py-4 text-left">
                  <SortableHeader
                    label="Dias Inativo"
                    sortKey="daysSinceLastOrder"
                    currentSort={sortBy}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                    className="text-red-800"
                  />
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="font-bold text-red-800">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer, index) => {
                const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
                const isHighPriority = globalIndex < 5;
                
                return (
                  <tr key={customer.id} className={`border-t border-red-100 hover:bg-red-25 transition-all ${
                    index % 2 === 0 ? 'bg-white' : 'bg-red-25'
                  }`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          isHighPriority ? 'bg-red-500' : 'bg-orange-500'
                        }`}>
                          {globalIndex + 1}
                        </span>
                        {isHighPriority && <span className="text-red-600 font-medium text-xs">ALTA</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                        {customer.whatsapp && (
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            📱 {customer.whatsapp}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <ShoppingBag className="w-3 h-3" />
                            {customer.orderCount} pedidos
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            R$ {customer.avgOrderValue.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-green-600">R$ {customer.customerLifetimeValue.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">em {customer.orderCount} pedidos</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-red-600 font-medium">{customer.daysSinceLastOrder} dias atrás</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedCustomer(customer)}
                          className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition-colors"
                        >
                          🛒 Produtos
                        </button>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                          📧 Email
                        </button>
                        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors">
                          📱 WhatsApp
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginação Melhorada */}
        {totalPages > 1 && (
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-4 border-t border-pink-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredCustomers.length)} de {filteredCustomers.length} clientes
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-pink-200 text-gray-700 rounded-l-lg hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="px-4 py-2 bg-white border border-pink-200 text-gray-700 rounded-r-lg hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Estratégias de Reativação */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-yellow-800 font-semibold mb-3 flex items-center gap-2">
          🎯 Estratégias de Reativação Recomendadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">📧 Email Marketing</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• "Sentimos sua falta" com desconto especial</li>
              <li>• Produtos similares aos comprados anteriormente</li>
              <li>• Novidades da categoria preferida</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">🎁 Ofertas Personalizadas</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Desconto progressivo baseado no CLV</li>
              <li>• Frete grátis para compras acima do ticket médio</li>
              <li>• Combo de produtos já comprados</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal de Produtos do Cliente */}
      {selectedCustomer && (
        <CustomerProductsModal
          customer={selectedCustomer}
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}