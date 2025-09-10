'use client';

import { useState } from 'react';
import { CustomerAnalytics } from '@/types';
import { Check, X, Send } from 'lucide-react';

interface CustomerSelectionProps {
  customers: CustomerAnalytics[];
  onCampaignStart: (selectedCustomers: CustomerAnalytics[]) => void;
  campaignType: string;
}

export default function CustomerSelection({ customers, onCampaignStart, campaignType }: CustomerSelectionProps) {
  const [selectedCustomers, setSelectedCustomers] = useState<CustomerAnalytics[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const handleSelectCustomer = (customer: CustomerAnalytics) => {
    setSelectedCustomers(prev => {
      const isSelected = prev.some(c => c.id === customer.id);
      if (isSelected) {
        return prev.filter(c => c.id !== customer.id);
      } else {
        return [...prev, customer];
      }
    });
  };

  const handleSelectAll = () => {
    const customersWithWhatsApp = customers.filter(c => c.whatsapp);
    if (selectedCustomers.length === customersWithWhatsApp.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customersWithWhatsApp);
    }
  };

  const handleStartCampaign = () => {
    if (selectedCustomers.length > 0) {
      onCampaignStart(selectedCustomers);
      setIsSelectionMode(false);
      setSelectedCustomers([]);
    }
  };

  const handleCancel = () => {
    setIsSelectionMode(false);
    setSelectedCustomers([]);
  };

  const customersWithWhatsApp = customers.filter(c => c.whatsapp);
  const allSelected = selectedCustomers.length === customersWithWhatsApp.length && customersWithWhatsApp.length > 0;

  return (
    <div className="mb-4">
      {!isSelectionMode ? (
        <button
          onClick={() => setIsSelectionMode(true)}
          disabled={customersWithWhatsApp.length === 0}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          📱 Iniciar Campanha WhatsApp
          {customersWithWhatsApp.length > 0 && (
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
              {customersWithWhatsApp.length} com WhatsApp
            </span>
          )}
        </button>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-green-800">
                📱 Selecionar Clientes para Campanha
              </h3>
              <p className="text-green-600 text-sm">
                Escolha os clientes que receberão a campanha WhatsApp
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full">
                {selectedCustomers.length} selecionados
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleSelectAll}
              className="text-sm text-green-700 hover:text-green-800 flex items-center gap-1"
            >
              <Check className="w-4 h-4" />
              {allSelected ? 'Desmarcar Todos' : 'Selecionar Todos com WhatsApp'}
            </button>
            <span className="text-sm text-gray-500">
              ({customersWithWhatsApp.length} clientes têm WhatsApp)
            </span>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
            <button
              onClick={handleStartCampaign}
              disabled={selectedCustomers.length === 0}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Criar Campanha ({selectedCustomers.length})
            </button>
          </div>
        </div>
      )}

      {/* Indicador de seleção nos clientes */}
      {isSelectionMode && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            💡 <strong>Clique nos clientes</strong> abaixo para selecioná-los para a campanha
          </p>
        </div>
      )}

      {/* Função para renderizar checkbox de seleção */}
      <div className="hidden">
        {/* Este componente injetará a funcionalidade de seleção */}
        {isSelectionMode && customers.map(customer => (
          <div key={customer.id}>
            {/* Checkbox será renderizado pelo componente pai */}
          </div>
        ))}
      </div>
    </div>
  );

  // Função helper que pode ser usada pelo componente pai
  function getSelectionProps(customer: CustomerAnalytics) {
    if (!isSelectionMode) return {};
    
    const isSelected = selectedCustomers.some(c => c.id === customer.id);
    const hasWhatsApp = !!customer.whatsapp;
    
    return {
      isSelectionMode,
      isSelected,
      hasWhatsApp,
      onSelect: () => handleSelectCustomer(customer),
      disabled: !hasWhatsApp
    };
  }

  // Expor função helper para o componente pai
  (CustomerSelection as any).getSelectionProps = getSelectionProps;
}