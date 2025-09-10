'use client';

import { useState, useEffect, useMemo } from 'react';
import { CustomerAnalytics, DashboardMetrics } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Users, AlertTriangle, Zap, Crown, Heart, Sparkles, Package, TrendingUp } from 'lucide-react';
import ReactivationTab from '@/components/analytics/ReactivationTab';
import RegularCustomersTab from '@/components/analytics/RegularCustomersTab';
import TopProspectsTab from '@/components/analytics/TopProspectsTab';
import ProductAnalysisTab from '@/components/analytics/ProductAnalysisTab';
import TemporalAnalysisTab from '@/components/analytics/TemporalAnalysisTab';
import Pagination from '@/components/ui/Pagination';
import SearchAndFilter from '@/components/ui/SearchAndFilter';

const SEGMENT_COLORS = {
  VIP: '#D946EF', // Magenta vibrante
  Regular: '#EC4899', // Pink
  New: '#F59E0B', // Amber
  Inactive: '#EF4444', // Red
};

interface CLVData {
  analytics: CustomerAnalytics[];
  metrics: DashboardMetrics;
  topCustomers: CustomerAnalytics[];
  likelyToPurchase: CustomerAnalytics[];
  segmentDistribution: Record<string, number>;
  totalCustomers: number;
  totalOrders: number;
}

type TabType = 'overview' | 'reactivation' | 'regular' | 'prospects' | 'products' | 'temporal';

const ITEMS_PER_PAGE = 20;

export default function CLVDashboard() {
  const [data, setData] = useState<CLVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Pagination and filtering states
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  // Reset to first page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSegment]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Carregando dados CLV via API interna...');
      
      const response = await fetch('/api/analytics?type=clv');
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erro na API');
      }

      setData(result.data);
      console.log('✅ Dados CLV carregados com sucesso');
      
    } catch (err) {
      console.error('❌ Erro ao carregar dados:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados da API');
    } finally {
      setLoading(false);
    }
  };

  // Filtered and paginated data
  const filteredCustomers = useMemo(() => {
    if (!data?.analytics) return [];
    
    let filtered = data.analytics;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.id.toString().includes(term)
      );
    }
    
    // Apply segment filter
    if (selectedSegment !== 'all') {
      filtered = filtered.filter(customer => customer.segment === selectedSegment);
    }
    
    return filtered;
  }, [data?.analytics, searchTerm, selectedSegment]);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCustomers, currentPage]);

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

  // Prepare segment data for pie chart with new colors
  const segmentData = data ? Object.entries(data.segmentDistribution).map(([segment, count]) => ({
    segment,
    count,
    color: SEGMENT_COLORS[segment as keyof typeof SEGMENT_COLORS]
  })) : [];

  // Criar ordem lógica dos dados baseada na prioridade de ação
  const getTabPriority = () => {
    if (!data) return [];
    
    const inactiveCount = data.analytics.filter(c => c.segment === 'Inactive').length;
    const regularCount = data.analytics.filter(c => c.segment === 'Regular').length;
    const vipCount = data.analytics.filter(c => c.segment === 'VIP').length;
    const prospectsCount = data.analytics.filter(c => 
      c.segment !== 'Inactive' && 
      c.daysSinceLastOrder > 7 && 
      c.daysSinceLastOrder < 60 &&
      c.orderCount >= 2
    ).length;

    // Criar tabs com indicadores de prioridade
    return [
      {
        id: 'prospects' as TabType,
        label: 'Prospects Quentes',
        icon: Sparkles,
        gradient: 'from-emerald-500 to-teal-500',
        count: prospectsCount,
        priority: 'high' as 'high' | 'medium' | 'low',
        description: 'Maior potencial de conversão'
      },
      {
        id: 'reactivation' as TabType,
        label: 'Reativação Urgente',
        icon: Heart,
        gradient: 'from-red-500 to-pink-500',
        count: inactiveCount,
        priority: inactiveCount > 20 ? 'high' : 'medium' as 'high' | 'medium' | 'low',
        description: inactiveCount > 20 ? 'Ação imediata necessária' : 'Reconquista gradual'
      },
      {
        id: 'regular' as TabType,
        label: 'Upgrade VIP',
        icon: Users,
        gradient: 'from-purple-500 to-indigo-500',
        count: regularCount,
        priority: 'medium' as 'high' | 'medium' | 'low',
        description: 'Transformar em clientes VIP'
      },
      {
        id: 'products' as TabType,
        label: 'Análise de Produtos',
        icon: Package,
        gradient: 'from-emerald-500 to-green-500',
        count: 0, // Será carregado dinamicamente
        priority: 'medium' as 'high' | 'medium' | 'low',
        description: 'Pareto e performance de produtos'
      },
      {
        id: 'temporal' as TabType,
        label: 'Análise Temporal',
        icon: TrendingUp,
        gradient: 'from-blue-500 to-indigo-500',
        count: 0,
        priority: 'medium' as 'high' | 'medium' | 'low',
        description: 'Vendas por mês e tendências'
      },
      {
        id: 'overview' as TabType,
        label: 'Dashboard Geral',
        icon: BarChart3,
        gradient: 'from-pink-500 to-rose-500',
        count: data.analytics.length,
        priority: 'low' as 'high' | 'medium' | 'low',
        description: 'Visão completa dos dados'
      }
    ];
  };

  const tabs = getTabPriority();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl mb-8"></div>
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl"></div>
              ))}
            </div>
            <div className="h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl"></div>
          </div>
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-white bg-opacity-90 backdrop-blur-sm px-8 py-6 rounded-2xl border border-pink-200 shadow-xl">
              <div className="relative">
                <div className="animate-spin w-8 h-8 border-4 border-pink-300 border-t-pink-600 rounded-full"></div>
                <Heart className="absolute inset-0 w-4 h-4 text-pink-500 m-auto animate-pulse" />
              </div>
              <div>
                <p className="text-pink-800 font-bold text-lg">
                  ✨ Carregando seu Dashboard Sensual...
                </p>
                <p className="text-pink-600 text-sm mt-1">
                  Processando dados íntimos dos seus clientes com carinho
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 p-8">
        <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-2xl border border-red-200 p-8 shadow-xl max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-red-800 font-bold text-xl mb-2">Oops! Algo deu errado</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <button 
                onClick={loadData}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                💖 Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 p-8">
        <div className="max-w-2xl mx-auto text-center flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-2xl border border-yellow-200 p-8 shadow-xl">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-yellow-800 text-lg">⚠️ Nenhum dado disponível ainda</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate averages
  const avgCLV = data.analytics.length > 0 
    ? data.analytics.reduce((sum, c) => sum + c.customerLifetimeValue, 0) / data.analytics.length 
    : 0;
  
  const avgOrderValue = data.analytics.length > 0
    ? data.analytics.reduce((sum, c) => sum + c.avgOrderValue, 0) / data.analytics.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Glamorous Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 p-8 rounded-2xl shadow-2xl text-white">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold flex items-center gap-4 mb-2">
                  <div className="p-3 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                    <Crown className="w-10 h-10" />
                  </div>
                  <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                    Sensual Analytics
                  </span>
                </h1>
                <p className="text-pink-100 text-lg font-medium">
                  Dashboard exclusivo para análise de clientes íntimos
                </p>
              </div>
              <button 
                onClick={loadData}
                className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-opacity-30 transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ✨ Atualizar
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white bg-opacity-15 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-pink-200" />
                  <p className="text-pink-100 font-medium">Clientes Íntimos</p>
                </div>
                <p className="text-3xl font-bold">{data.totalCustomers}</p>
                <p className="text-pink-200 text-sm mt-1">Total de relacionamentos</p>
              </div>
              
              <div className="bg-white bg-opacity-15 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-pink-200" />
                  <p className="text-pink-100 font-medium">Valor do Prazer</p>
                </div>
                <p className="text-3xl font-bold">R$ {avgCLV.toFixed(2)}</p>
                <p className="text-pink-200 text-sm mt-1">CLV médio por cliente</p>
              </div>
              
              <div className="bg-white bg-opacity-15 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-yellow-200" />
                  <p className="text-pink-100 font-medium">Clientes VIP</p>
                </div>
                <p className="text-3xl font-bold text-yellow-200">{data.segmentDistribution.VIP || 0}</p>
                <p className="text-pink-200 text-sm mt-1">Experiências premium</p>
              </div>
              
              <div className="bg-white bg-opacity-15 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                <div className="flex items-center gap-3 mb-2">
                  <Crown className="w-6 h-6 text-pink-200" />
                  <p className="text-pink-100 font-medium">Ticket Médio</p>
                </div>
                <p className="text-3xl font-bold">R$ {avgOrderValue.toFixed(2)}</p>
                <p className="text-pink-200 text-sm mt-1">Investimento em prazer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Navigation Tabs with Priority Indicators */}
        <div className="bg-white rounded-2xl shadow-xl border border-pink-200 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-800 mb-2">🎯 Dashboard Inteligente - Ordem por Prioridade</h2>
            <p className="text-sm text-gray-600">
              Abas organizadas por urgência e potencial de resultado. Comece pelos <strong>Prospects Quentes</strong>!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const priorityColors = {
                high: 'border-red-500 bg-red-50',
                medium: 'border-yellow-500 bg-yellow-50',
                low: 'border-blue-500 bg-blue-50'
              };
              const priorityLabels = {
                high: '🔴 ALTA',
                medium: '🟡 MÉDIA', 
                low: '🔵 BAIXA'
              };
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-6 text-left transition-all duration-300 relative overflow-hidden border-l-4 ${
                    isActive 
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg` 
                      : `hover:bg-pink-50 text-gray-700 hover:text-pink-800 ${priorityColors[tab.priority]}`
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-white bg-opacity-10"></div>
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-white bg-opacity-20 backdrop-blur-sm' : 'bg-white'
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-pink-600'}`} />
                      </div>
                      {!isActive && (
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          tab.priority === 'high' ? 'bg-red-100 text-red-800' :
                          tab.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {priorityLabels[tab.priority]}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className={`font-bold text-base mb-1 ${isActive ? 'text-white' : 'text-gray-800'}`}>
                        {tab.label}
                      </p>
                      <p className={`text-sm mb-2 ${isActive ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
                        {tab.description}
                      </p>
                      <div className={`text-lg font-bold ${isActive ? 'text-white' : 'text-pink-600'}`}>
                        {tab.count}
                        <span className={`text-sm font-normal ml-1 ${
                          isActive ? 'text-white text-opacity-75' : 'text-gray-500'
                        }`}>
                          {tab.id === 'overview' ? 'total' : 
                           tab.id === 'prospects' ? 'quentes' : 'clientes'}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Quick Action Bar */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-3 border-t">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">💡 Dica:</span>
                <span className="text-gray-700">
                  {activeTab === 'prospects' && 'Contacte os TOP 5 prospects nas próximas 2 horas!'}
                  {activeTab === 'reactivation' && 'Crie uma campanha de reativação para os primeiros 10.'}
                  {activeTab === 'regular' && 'Ofereça upgrade VIP para clientes próximos do threshold.'}
                  {activeTab === 'products' && 'Foque 80% dos recursos nos produtos Classe A (Pareto)!'}
                  {activeTab === 'overview' && 'Use as outras abas para ações específicas e focadas.'}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Organizado por UX Expert 🎨
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Search and Filter */}
              <SearchAndFilter 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedSegment={selectedSegment}
                onSegmentChange={setSelectedSegment}
                totalResults={filteredCustomers.length}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Top Customers by CLV */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-pink-200">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                    <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    🏆 Top 10 Clientes Apaixonados
                  </h2>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data.topCustomers}>
                      <defs>
                        <linearGradient id="customerBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#D946EF" stopOpacity={0.6}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F8BBD9" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        fontSize={12}
                        fill="#EC4899"
                      />
                      <YAxis fill="#EC4899" />
                      <Tooltip 
                        formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, 'CLV']}
                        labelFormatter={(label) => `Cliente: ${label}`}
                        contentStyle={{ 
                          backgroundColor: '#FDF2F8', 
                          border: '2px solid #EC4899',
                          borderRadius: '12px'
                        }}
                      />
                      <Bar dataKey="customerLifetimeValue" fill="url(#customerBar)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Customer Segmentation */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-pink-200">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    💖 Segmentação de Desejos
                  </h2>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <defs>
                        {segmentData.map((entry, index) => (
                          <linearGradient key={index} id={`segment-${index}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="5%" stopColor={entry.color} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={entry.color} stopOpacity={0.6}/>
                          </linearGradient>
                        ))}
                      </defs>
                      <Pie
                        data={segmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry: any) => `${entry.segment}: ${entry.count} (${(entry.percent * 100).toFixed(1)}%)`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="count"
                        stroke="#fff"
                        strokeWidth={3}
                      >
                        {segmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`url(#segment-${index})`} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#FDF2F8', 
                          border: '2px solid #EC4899',
                          borderRadius: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Customer List with Pagination */}
              <div className="bg-white rounded-2xl shadow-xl border border-pink-200 overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6">
                  <h3 className="text-white font-bold text-xl flex items-center gap-3">
                    <Heart className="w-6 h-6" />
                    💕 Todos os Clientes ({filteredCustomers.length})
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-pink-800">Cliente</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-pink-800">Segmento</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-pink-800">CLV</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-pink-800">Pedidos</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-pink-800">Última Compra</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCustomers.map((customer, index) => (
                        <tr key={customer.id} className={`border-t border-pink-100 hover:bg-gradient-to-r hover:from-pink-25 hover:to-purple-25 transition-all ${
                          index % 2 === 0 ? 'bg-white' : 'bg-pink-25'
                        }`}>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-gray-900">{customer.name}</p>
                              <p className="text-sm text-gray-600">{customer.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                              customer.segment === 'VIP' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                              customer.segment === 'Regular' ? 'bg-gradient-to-r from-pink-400 to-pink-600' :
                              customer.segment === 'New' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                              'bg-gradient-to-r from-red-400 to-red-600'
                            }`}>
                              {customer.segment}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-pink-600">R$ {customer.customerLifetimeValue.toFixed(2)}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-700">{customer.orderCount}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-600">{customer.daysSinceLastOrder} dias</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="border-t border-pink-100">
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredCustomers.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>

              {/* Smart Quick Actions - Ordem Lógica */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-indigo-800 mb-2">🎯 Ações Inteligentes Recomendadas</h3>
                  <p className="text-indigo-600">Baseado na análise dos seus dados, estas são as ações prioritárias:</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Ação #1 - PRIORIDADE ALTA */}
                  <button 
                    onClick={() => setActiveTab('prospects')}
                    className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102"
                  >
                    <div className="absolute top-2 right-2">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        #1 ALTA
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-white bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    <div className="relative z-10 text-white">
                      <Sparkles className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <h4 className="font-bold text-lg mb-2">🔥 Prospects Quentes</h4>
                      <p className="text-emerald-100 text-sm mb-3">
                        {data.analytics.filter(c => 
                          c.segment !== 'Inactive' && 
                          c.daysSinceLastOrder > 7 && 
                          c.daysSinceLastOrder < 60 &&
                          c.orderCount >= 2
                        ).length} prospects de alta conversão
                      </p>
                      <div className="bg-white bg-opacity-20 p-2 rounded text-xs">
                        ROI Esperado: Alto 📈
                      </div>
                    </div>
                  </button>

                  {/* Ação #2 - PRIORIDADE MÉDIA */}
                  <button 
                    onClick={() => setActiveTab('reactivation')}
                    className="group relative overflow-hidden bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102"
                  >
                    <div className="absolute top-2 right-2">
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        #2 MÉDIA
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-white bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    <div className="relative z-10 text-white">
                      <Heart className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <h4 className="font-bold text-lg mb-2">💔 Reativação</h4>
                      <p className="text-pink-100 text-sm mb-3">
                        {data.segmentDistribution.Inactive || 0} clientes inativos
                      </p>
                      <div className="bg-white bg-opacity-20 p-2 rounded text-xs">
                        ROI Esperado: Médio 📋
                      </div>
                    </div>
                  </button>

                  {/* Ação #3 - LONGO PRAZO */}
                  <button 
                    onClick={() => setActiveTab('regular')}
                    className="group relative overflow-hidden bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102"
                  >
                    <div className="absolute top-2 right-2">
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        #3 L.PRAZO
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-white bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    <div className="relative z-10 text-white">
                      <Users className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <h4 className="font-bold text-lg mb-2">👑 Upgrade VIP</h4>
                      <p className="text-purple-100 text-sm mb-3">
                        {data.segmentDistribution.Regular || 0} clientes regulares
                      </p>
                      <div className="bg-white bg-opacity-20 p-2 rounded text-xs">
                        ROI Esperado: Longo Prazo 📅
                      </div>
                    </div>
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-indigo-700 text-sm font-medium mb-2">
                    🏆 Estratégia Recomendada pela IA:
                  </p>
                  <p className="text-indigo-600 text-sm">
                    Comece pelos <strong>Prospects Quentes</strong> (maior taxa de conversão), 
                    depois <strong>Reativação</strong> (recuperação rápida), 
                    e por fim <strong>Upgrade VIP</strong> (crescimento sustentável).
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reactivation' && (
            <ReactivationTab customers={data.analytics} />
          )}

          {activeTab === 'regular' && (
            <RegularCustomersTab customers={data.analytics} />
          )}

          {activeTab === 'prospects' && (
            <TopProspectsTab customers={data.analytics} />
          )}

          {activeTab === 'products' && (
            <ProductAnalysisTab />
          )}

          {activeTab === 'temporal' && (
            <TemporalAnalysisTab />
          )}
        </div>

        {/* Elegant Footer */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl border border-pink-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-pink-800">Dashboard Analytics Premium</p>
                <p className="text-pink-600 text-sm">
                  📊 {data.totalCustomers} clientes | {data.totalOrders} pedidos processados com amor
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-medium">✅ Sistema ativo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}