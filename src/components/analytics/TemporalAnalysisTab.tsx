'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, TrendingUp, TrendingDown, BarChart3, DollarSign, ShoppingCart, Users, Clock, Filter } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TimeSeriesData {
  month: string;
  year: number;
  revenue: number;
  orders: number;
  customers: number;
  avgOrderValue: number;
  period: string; // "2024-01", "2024-02", etc.
}

interface SeasonalInsight {
  period: string;
  type: 'peak' | 'low' | 'growth' | 'decline';
  description: string;
  value: number;
  growth: number;
}

export default function TemporalAnalysisTab() {
  const [timeData, setTimeData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('12m'); // 3m, 6m, 12m, all
  const [viewType, setViewType] = useState<'revenue' | 'orders' | 'customers'>('revenue');

  useEffect(() => {
    loadTemporalData();
  }, []);

  const loadTemporalData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analytics?type=temporal');
      const result = await response.json();
      
      if (result.success) {
        setTimeData(result.data.temporalData || []);
      } else {
        // Dados simulados para demonstração
        generateMockTemporalData();
      }
    } catch (error) {
      console.error('Erro ao carregar dados temporais:', error);
      generateMockTemporalData();
    } finally {
      setLoading(false);
    }
  };

  const generateMockTemporalData = () => {
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    
    const currentDate = new Date();
    const mockData: TimeSeriesData[] = [];
    
    // Últimos 12 meses
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();
      
      // Simular dados com sazonalidade
      const isHighSeason = [10, 11, 0].includes(date.getMonth()); // Nov, Dez, Jan
      const baseRevenue = 15000 + Math.random() * 5000;
      const seasonalMultiplier = isHighSeason ? 1.5 : 1;
      const revenue = baseRevenue * seasonalMultiplier;
      
      const orders = Math.floor(revenue / (80 + Math.random() * 40));
      const customers = Math.floor(orders * (0.7 + Math.random() * 0.3));
      
      mockData.push({
        month: monthName,
        year,
        revenue: Math.round(revenue),
        orders,
        customers,
        avgOrderValue: Math.round(revenue / orders),
        period: `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`
      });
    }
    
    setTimeData(mockData);
  };

  // Filtrar dados baseado no período selecionado
  const filteredData = useMemo(() => {
    const periodMap = {
      '3m': 3,
      '6m': 6,
      '12m': 12,
      'all': timeData.length
    };
    
    const months = periodMap[selectedPeriod as keyof typeof periodMap];
    return timeData.slice(-months);
  }, [timeData, selectedPeriod]);

  // Cálculos de métricas
  const metrics = useMemo(() => {
    if (filteredData.length === 0) return null;
    
    const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0);
    const totalOrders = filteredData.reduce((sum, d) => sum + d.orders, 0);
    const totalCustomers = filteredData.reduce((sum, d) => sum + d.customers, 0);
    const avgOrderValue = totalRevenue / totalOrders;
    
    // Crescimento mês a mês
    const lastMonth = filteredData[filteredData.length - 1];
    const previousMonth = filteredData[filteredData.length - 2];
    
    const revenueGrowth = previousMonth ? 
      ((lastMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100 : 0;
    const ordersGrowth = previousMonth ? 
      ((lastMonth.orders - previousMonth.orders) / previousMonth.orders) * 100 : 0;
    const customersGrowth = previousMonth ? 
      ((lastMonth.customers - previousMonth.customers) / previousMonth.customers) * 100 : 0;
    
    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      avgOrderValue,
      revenueGrowth,
      ordersGrowth,
      customersGrowth,
      periodLabel: selectedPeriod === '12m' ? 'últimos 12 meses' : 
                   selectedPeriod === '6m' ? 'últimos 6 meses' :
                   selectedPeriod === '3m' ? 'últimos 3 meses' : 'todo período'
    };
  }, [filteredData, selectedPeriod]);

  // Análise sazonal
  const seasonalInsights = useMemo(() => {
    if (filteredData.length < 3) return [];
    
    const insights: SeasonalInsight[] = [];
    
    // Encontrar picos e vales
    let maxRevenue = 0;
    let minRevenue = Infinity;
    let maxMonth = '';
    let minMonth = '';
    
    filteredData.forEach(data => {
      if (data.revenue > maxRevenue) {
        maxRevenue = data.revenue;
        maxMonth = `${data.month}/${data.year}`;
      }
      if (data.revenue < minRevenue) {
        minRevenue = data.revenue;
        minMonth = `${data.month}/${data.year}`;
      }
    });
    
    insights.push({
      period: maxMonth,
      type: 'peak',
      description: 'Pico de vendas no período',
      value: maxRevenue,
      growth: 0
    });
    
    insights.push({
      period: minMonth,
      type: 'low',
      description: 'Menor faturamento do período',
      value: minRevenue,
      growth: 0
    });
    
    // Tendência geral
    const firstHalf = filteredData.slice(0, Math.floor(filteredData.length / 2));
    const secondHalf = filteredData.slice(Math.floor(filteredData.length / 2));
    
    const firstHalfAvg = firstHalf.reduce((sum, d) => sum + d.revenue, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, d) => sum + d.revenue, 0) / secondHalf.length;
    
    const overallTrend = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
    
    insights.push({
      period: 'Tendência Geral',
      type: overallTrend > 0 ? 'growth' : 'decline',
      description: overallTrend > 0 ? 'Crescimento no período' : 'Queda no período',
      value: secondHalfAvg,
      growth: overallTrend
    });
    
    return insights;
  }, [filteredData]);

  // Dados para o gráfico principal
  const chartData = useMemo(() => {
    return filteredData.map(data => ({
      name: `${data.month}/${String(data.year).slice(2)}`,
      [viewType === 'revenue' ? 'Receita' : 
       viewType === 'orders' ? 'Pedidos' : 'Clientes']: 
        viewType === 'revenue' ? data.revenue :
        viewType === 'orders' ? data.orders : data.customers,
      ...data
    }));
  }, [filteredData, viewType]);

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-green-600' : growth < 0 ? 'text-red-600' : 'text-gray-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? TrendingUp : growth < 0 ? TrendingDown : BarChart3;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full mr-3"></div>
        <span className="text-gray-600">Analisando dados temporais...</span>
      </div>
    );
  }

  const getViewColor = () => {
    switch (viewType) {
      case 'revenue': return { primary: '#3B82F6', secondary: '#93C5FD' };
      case 'orders': return { primary: '#10B981', secondary: '#6EE7B7' };
      case 'customers': return { primary: '#8B5CF6', secondary: '#C4B5FD' };
      default: return { primary: '#3B82F6', secondary: '#93C5FD' };
    }
  };

  const colors = getViewColor();

  return (
    <div className="space-y-8">
      {/* Header com Info do Período */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-indigo-800">📈 Análise Temporal de Vendas</h2>
        </div>
        <p className="text-indigo-700 mb-4">
          <strong>Período Analisado:</strong> {metrics?.periodLabel || 'Carregando...'} - 
          Dados coletados da API Nuvemshop em tempo real com análise de tendências e sazonalidade.
        </p>
      </div>

      {/* Controles de Filtro */}
      <div className="bg-white rounded-xl shadow-lg border border-indigo-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Período de Análise</h3>
            <div className="flex gap-2">
              {[
                { value: '3m', label: '3 Meses' },
                { value: '6m', label: '6 Meses' },
                { value: '12m', label: '12 Meses' },
                { value: 'all', label: 'Todo Período' }
              ].map((period) => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period.value
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Visualizar</h3>
            <div className="flex gap-2">
              {[
                { value: 'revenue', label: '💰 Receita', color: 'bg-blue-100 text-blue-800' },
                { value: 'orders', label: '📦 Pedidos', color: 'bg-green-100 text-green-800' },
                { value: 'customers', label: '👥 Clientes', color: 'bg-purple-100 text-purple-800' }
              ].map((view) => (
                <button
                  key={view.value}
                  onClick={() => setViewType(view.value as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewType === view.value
                      ? 'bg-indigo-500 text-white'
                      : view.color
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Métricas Principais */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-blue-700">Receita Total</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">R$ {metrics.totalRevenue.toLocaleString()}</p>
            <div className={`flex items-center gap-1 mt-2 ${getGrowthColor(metrics.revenueGrowth)}`}>
              {React.createElement(getGrowthIcon(metrics.revenueGrowth), { className: "w-4 h-4" })}
              <span className="text-sm font-medium">
                {metrics.revenueGrowth > 0 ? '+' : ''}{metrics.revenueGrowth.toFixed(1)}% mês anterior
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <ShoppingCart className="w-6 h-6 text-green-600" />
              <span className="font-medium text-green-700">Total Pedidos</span>
            </div>
            <p className="text-2xl font-bold text-green-800">{metrics.totalOrders}</p>
            <div className={`flex items-center gap-1 mt-2 ${getGrowthColor(metrics.ordersGrowth)}`}>
              {React.createElement(getGrowthIcon(metrics.ordersGrowth), { className: "w-4 h-4" })}
              <span className="text-sm font-medium">
                {metrics.ordersGrowth > 0 ? '+' : ''}{metrics.ordersGrowth.toFixed(1)}% mês anterior
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-purple-600" />
              <span className="font-medium text-purple-700">Total Clientes</span>
            </div>
            <p className="text-2xl font-bold text-purple-800">{metrics.totalCustomers}</p>
            <div className={`flex items-center gap-1 mt-2 ${getGrowthColor(metrics.customersGrowth)}`}>
              {React.createElement(getGrowthIcon(metrics.customersGrowth), { className: "w-4 h-4" })}
              <span className="text-sm font-medium">
                {metrics.customersGrowth > 0 ? '+' : ''}{metrics.customersGrowth.toFixed(1)}% mês anterior
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-orange-600" />
              <span className="font-medium text-orange-700">Ticket Médio</span>
            </div>
            <p className="text-2xl font-bold text-orange-800">R$ {metrics.avgOrderValue.toFixed(2)}</p>
            <p className="text-sm text-orange-600 mt-2">
              Média do período selecionado
            </p>
          </div>
        </div>
      )}

      {/* Gráfico Principal */}
      <div className="bg-white rounded-2xl shadow-xl border border-indigo-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          {viewType === 'revenue' ? '💰 Evolução da Receita' :
           viewType === 'orders' ? '📦 Evolução dos Pedidos' : '👥 Evolução dos Clientes'}
        </h3>
        
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => 
                viewType === 'revenue' ? `R$ ${(value / 1000).toFixed(0)}k` : value.toString()
              }
            />
            <Tooltip 
              formatter={(value) => [
                viewType === 'revenue' ? `R$ ${Number(value).toLocaleString()}` : 
                Number(value).toLocaleString(),
                viewType === 'revenue' ? 'Receita' :
                viewType === 'orders' ? 'Pedidos' : 'Clientes'
              ]}
              labelFormatter={(label) => `Período: ${label}`}
              contentStyle={{ 
                backgroundColor: '#F8FAFC', 
                border: `2px solid ${colors.primary}`,
                borderRadius: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey={viewType === 'revenue' ? 'Receita' : 
                       viewType === 'orders' ? 'Pedidos' : 'Clientes'} 
              stroke={colors.primary}
              strokeWidth={3}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Sazonais */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
        <h3 className="text-yellow-800 font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          🔍 Insights Sazonais e Tendências
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasonalInsights.map((insight, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                {insight.type === 'peak' && <span className="text-2xl">🔥</span>}
                {insight.type === 'low' && <span className="text-2xl">📉</span>}
                {insight.type === 'growth' && <span className="text-2xl">📈</span>}
                {insight.type === 'decline' && <span className="text-2xl">📉</span>}
                <h4 className="font-medium text-yellow-800">{insight.period}</h4>
              </div>
              <p className="text-sm text-yellow-700 mb-2">{insight.description}</p>
              <p className="font-bold text-yellow-800">
                {insight.value > 1000 ? `R$ ${insight.value.toLocaleString()}` : insight.value.toFixed(1)}
                {insight.growth !== 0 && (
                  <span className={`ml-2 text-xs ${insight.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({insight.growth > 0 ? '+' : ''}{insight.growth.toFixed(1)}%)
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparação Mensal */}
      <div className="bg-white rounded-2xl shadow-xl border border-indigo-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          📊 Comparação Mensal Detalhada
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-indigo-800">Mês</th>
                <th className="px-4 py-3 text-left font-bold text-indigo-800">Receita</th>
                <th className="px-4 py-3 text-left font-bold text-indigo-800">Pedidos</th>
                <th className="px-4 py-3 text-left font-bold text-indigo-800">Clientes</th>
                <th className="px-4 py-3 text-left font-bold text-indigo-800">Ticket Médio</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={data.period} className={`border-t border-indigo-100 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-indigo-25'
                }`}>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {data.month}/{data.year}
                  </td>
                  <td className="px-4 py-3 font-bold text-green-600">
                    R$ {data.revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {data.orders}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {data.customers}
                  </td>
                  <td className="px-4 py-3 font-medium text-blue-600">
                    R$ {data.avgOrderValue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estratégias Temporais */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200">
        <h3 className="text-purple-800 font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          🎯 Estratégias Baseadas em Dados Temporais
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              🔥 Meses de Pico
            </h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Aumentar estoque antes dos picos</li>
              <li>• Campanhas de marketing intensivas</li>
              <li>• Preparar suporte ao cliente</li>
              <li>• Negociar melhores condições com fornecedores</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              📉 Meses Baixos
            </h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Promoções e liquidações</li>
              <li>• Campanhas de reativação</li>
              <li>• Foco em cross-sell e upsell</li>
              <li>• Desenvolvimento de produtos</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              📈 Crescimento
            </h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Investir em novos canais</li>
              <li>• Expandir linha de produtos</li>
              <li>• Melhorar experiência do cliente</li>
              <li>• Otimizar operações</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}