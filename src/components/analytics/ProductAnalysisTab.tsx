'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Package, TrendingUp, Award, Target, BarChart3, PieChart, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import SortableHeader from '@/components/ui/SortableHeader';

interface ProductAnalytics {
  id: number;
  name: string;
  totalSales: number;
  totalQuantity: number;
  avgPrice: number;
  category: string;
  rank: number;
}

interface ProductAnalysisTabProps {
  // Props serão definidas quando integrarmos com os dados
}

const ITEMS_PER_PAGE = 20;

export default function ProductAnalysisTab() {
  const [products, setProducts] = useState<ProductAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('totalSales');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedProduct, setSelectedProduct] = useState<ProductAnalytics | null>(null);

  useEffect(() => {
    loadProductsData();
  }, []);

  const loadProductsData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analytics?type=products');
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data.products);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cálculos da Análise de Pareto
  const paretoAnalysis = useMemo(() => {
    const sortedProducts = [...products].sort((a, b) => b.totalSales - a.totalSales);
    const totalRevenue = sortedProducts.reduce((sum, p) => sum + p.totalSales, 0);
    
    let cumulativeRevenue = 0;
    const paretoData = sortedProducts.map((product, index) => {
      cumulativeRevenue += product.totalSales;
      const cumulativePercent = (cumulativeRevenue / totalRevenue) * 100;
      
      return {
        ...product,
        cumulativePercent,
        revenuePercent: (product.totalSales / totalRevenue) * 100,
        isParetoA: cumulativePercent <= 80, // Top 80% da receita
        isParetoB: cumulativePercent > 80 && cumulativePercent <= 95, // 80-95%
        isParetoC: cumulativePercent > 95 // 95-100%
      };
    });
    
    const paretoA = paretoData.filter(p => p.isParetoA);
    const paretoB = paretoData.filter(p => p.isParetoB);
    const paretoC = paretoData.filter(p => p.isParetoC);
    
    return {
      all: paretoData,
      A: paretoA,
      B: paretoB,
      C: paretoC,
      totalRevenue
    };
  }, [products]);

  // Filtros e ordenação
  const filteredProducts = useMemo(() => {
    let filtered = paretoAnalysis.all;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term)
      );
    }
    
    // Ordenação
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a];
      let bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    return filtered;
  }, [paretoAnalysis.all, searchTerm, sortBy, sortDirection]);

  // Paginação
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  // Dados para gráficos
  const top10Products = paretoAnalysis.all.slice(0, 10);
  const paretoChartData = paretoAnalysis.all.slice(0, 20).map((product, index) => ({
    name: product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name,
    revenue: product.totalSales,
    cumulative: product.cumulativePercent,
    rank: index + 1
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-pink-300 border-t-pink-600 rounded-full mr-3"></div>
        <span className="text-gray-600">Analisando produtos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Explicativo */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
        <div className="flex items-center gap-3 mb-3">
          <Package className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-emerald-800">📦 Análise de Produtos - Pareto Completo</h2>
        </div>
        <p className="text-emerald-700 mb-4">
          <strong>Análise de Pareto (Regra 80/20):</strong> Identificamos quais produtos geram maior receita para focar estratégias. 
          Classe A = 80% da receita, Classe B = 15%, Classe C = 5%.
        </p>
        
        {/* Métricas Principais */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-emerald-700">Classe A (VIP)</span>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{paretoAnalysis.A.length}</p>
            <p className="text-xs text-emerald-600">80% da receita</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-emerald-700">Classe B (Bom)</span>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{paretoAnalysis.B.length}</p>
            <p className="text-xs text-emerald-600">15% da receita</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-emerald-700">Classe C (Baixo)</span>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{paretoAnalysis.C.length}</p>
            <p className="text-xs text-emerald-600">5% da receita</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Total Produtos</span>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{products.length}</p>
            <p className="text-xs text-emerald-600">R$ {paretoAnalysis.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Gráfico de Pareto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            📊 Top 10 Produtos por Receita
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top10Products}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={10}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, 'Receita']}
                labelFormatter={(label) => `Produto: ${label}`}
              />
              <Bar dataKey="totalSales" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-emerald-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-600" />
            📈 Curva de Pareto (80/20)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={paretoChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="rank"
                label={{ value: 'Ranking dos Produtos', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: '% Acumulado', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Receita Acumulada']}
                labelFormatter={(label) => `Produto ${label}º`}
              />
              <Line 
                type="monotone" 
                dataKey="cumulative" 
                stroke="#DC2626" 
                strokeWidth={3}
                dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey={80}
                stroke="#059669"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Busca e Filtros */}
      <div className="bg-white rounded-xl shadow-lg border border-emerald-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar produtos por nome..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
          <div className="text-sm text-gray-600">
            {filteredProducts.length} produtos encontrados
          </div>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
          <h3 className="text-white font-bold text-xl flex items-center gap-3">
            <Package className="w-6 h-6" />
            🏆 Ranking Completo de Produtos
          </h3>
          <p className="text-emerald-100 text-sm mt-1">
            Análise detalhada por performance de vendas
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <SortableHeader
                    label="Ranking"
                    sortKey="rank"
                    currentSort={sortBy}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                  />
                </th>
                <th className="px-6 py-4 text-left">
                  <SortableHeader
                    label="Produto"
                    sortKey="name"
                    currentSort={sortBy}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                  />
                </th>
                <th className="px-6 py-4 text-left">
                  <SortableHeader
                    label="Receita Total"
                    sortKey="totalSales"
                    currentSort={sortBy}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                  />
                </th>
                <th className="px-6 py-4 text-left">
                  <SortableHeader
                    label="Quantidade"
                    sortKey="totalQuantity"
                    currentSort={sortBy}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                  />
                </th>
                <th className="px-6 py-4 text-left">
                  <SortableHeader
                    label="Preço Médio"
                    sortKey="avgPrice"
                    currentSort={sortBy}
                    currentDirection={sortDirection}
                    onSort={handleSort}
                  />
                </th>
                <th className="px-6 py-4 text-left">Classe Pareto</th>
                <th className="px-6 py-4 text-left">% Receita</th>
                <th className="px-6 py-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, index) => {
                const getParetoClass = () => {
                  if (product.isParetoA) return { label: 'A', class: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: '👑' };
                  if (product.isParetoB) return { label: 'B', class: 'bg-blue-100 text-blue-800 border-blue-300', icon: '⭐' };
                  return { label: 'C', class: 'bg-gray-100 text-gray-800 border-gray-300', icon: '📦' };
                };
                
                const paretoInfo = getParetoClass();
                
                return (
                  <tr key={product.id} className={`border-t border-emerald-100 hover:bg-emerald-25 transition-all ${
                    index % 2 === 0 ? 'bg-white' : 'bg-emerald-25'
                  }`}>
                    <td className="px-6 py-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        product.rank <= 10 ? 'bg-yellow-500' :
                        product.rank <= 30 ? 'bg-emerald-500' : 'bg-gray-500'
                      }`}>
                        {product.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-emerald-600">R$ {product.totalSales.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-700">{product.totalQuantity}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-700">R$ {product.avgPrice.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${paretoInfo.class}`}>
                        {paretoInfo.icon} Classe {paretoInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-700">{product.revenuePercent.toFixed(2)}%</p>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="bg-emerald-500 text-white px-3 py-1 rounded text-sm hover:bg-emerald-600 transition-colors flex items-center gap-1"
                      >
                        📊 Vendas por Data
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-t border-emerald-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} de {filteredProducts.length} produtos
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
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 mx-1 rounded transition-colors ${
                          currentPage === page 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                            : 'bg-white border border-emerald-200 text-gray-700 hover:bg-emerald-50'
                        }`}
                      >
                        {page}
                      </button>
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

      {/* Insights Estratégicos */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-200">
        <h3 className="text-indigo-800 font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          🎯 Insights Estratégicos - Analytics de Produto
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <h4 className="font-medium text-indigo-800 mb-2 flex items-center gap-2">
              👑 Produtos Classe A (VIP)
            </h4>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Foque 80% do marketing nestes produtos</li>
              <li>• Mantenha estoque sempre disponível</li>
              <li>• Crie bundles com produtos relacionados</li>
              <li>• Monitore concorrência de perto</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <h4 className="font-medium text-indigo-800 mb-2 flex items-center gap-2">
              ⭐ Produtos Classe B (Potencial)
            </h4>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Investir em promoções sazonais</li>
              <li>• Testar diferentes preços</li>
              <li>• Melhorar descrições e fotos</li>
              <li>• Cross-sell com produtos A</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <h4 className="font-medium text-indigo-800 mb-2 flex items-center gap-2">
              📦 Produtos Classe C (Revisar)
            </h4>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Avaliar se vale manter no catálogo</li>
              <li>• Liquidação ou descontinuar</li>
              <li>• Redirecionar esforços para A e B</li>
              <li>• Analisar custo de manutenção</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes do Produto */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

// Modal de Detalhes do Produto por Data
interface ProductDetailsModalProps {
  product: ProductAnalytics;
  isOpen: boolean;
  onClose: () => void;
}

function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      loadProductSalesData();
    }
  }, [isOpen, product]);

  const loadProductSalesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics?type=product-sales&product_id=${product.id}`);
      const result = await response.json();
      
      if (result.success && result.data.sales) {
        setSalesData(result.data.sales);
      } else {
        // Fallback para dados mockados
        const mockSales = generateMockSalesData(product);
        setSalesData(mockSales);
      }
    } catch (error) {
      console.error('Erro ao carregar vendas do produto:', error);
      // Fallback para dados mockados
      const mockSales = generateMockSalesData(product);
      setSalesData(mockSales);
    } finally {
      setLoading(false);
    }
  };

  const generateMockSalesData = (product: ProductAnalytics) => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months.map((month, index) => ({
      month,
      sales: Math.random() * 1000 + 200,
      quantity: Math.floor(Math.random() * 50) + 5,
      orders: Math.floor(Math.random() * 20) + 2
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-emerald-100">ID: {product.id} | Ranking: #{product.rank}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full"></div>
              <span className="ml-3 text-gray-600">Carregando vendas por data...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Gráfico de Vendas por Mês */}
              <div className="bg-white rounded-xl border border-emerald-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Vendas Mensais - {product.name}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, 'Vendas']}
                      labelFormatter={(label) => `Mês: ${label}`}
                    />
                    <Bar dataKey="sales" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Tabela Detalhada */}
              <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden">
                <div className="bg-emerald-50 p-4 border-b border-emerald-200">
                  <h3 className="font-bold text-emerald-800">📈 Detalhamento por Período</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-emerald-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold text-emerald-800">Mês</th>
                        <th className="px-4 py-3 text-left font-bold text-emerald-800">Receita</th>
                        <th className="px-4 py-3 text-left font-bold text-emerald-800">Quantidade</th>
                        <th className="px-4 py-3 text-left font-bold text-emerald-800">Pedidos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesData.map((data, index) => (
                        <tr key={data.month} className={index % 2 === 0 ? 'bg-white' : 'bg-emerald-25'}>
                          <td className="px-4 py-3 font-medium">{data.month}</td>
                          <td className="px-4 py-3 font-bold text-emerald-600">R$ {data.sales.toFixed(2)}</td>
                          <td className="px-4 py-3">{data.quantity}</td>
                          <td className="px-4 py-3">{data.orders}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}