'use client';

import { useState } from 'react';
import { X, Send, Users, MessageCircle, Globe, AlertCircle } from 'lucide-react';
import { CustomerAnalytics } from '@/types';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCustomers: CustomerAnalytics[];
  campaignType: string;
}

export default function CampaignModal({ isOpen, onClose, selectedCustomers, campaignType }: CampaignModalProps) {
  const [message, setMessage] = useState('');
  const [footerText, setFooterText] = useState('Mensagem enviada pela TiendaLibre');
  const [websiteUrl, setWebsiteUrl] = useState('https://tiendalibre.com');
  const [buttonText, setButtonText] = useState('Visitar Loja');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isTestMode, setIsTestMode] = useState(false);
  const [testNumber, setTestNumber] = useState('5511999999999');

  const handleSendCampaign = async () => {
    if (!message.trim() || selectedCustomers.length === 0) return;
    
    setIsLoading(true);
    setSendStatus('sending');
    
    try {
      // Preparar mensagens para cada cliente
      let messages;
      
      if (isTestMode) {
        // Modo teste: enviar apenas para o número de teste
        messages = [{
          number: testNumber.replace(/\D/g, ''), // Remove caracteres não numéricos
          type: 'button',
          text: `[TESTE] ${message}`,
          footerText: `${footerText} | Clientes selecionados: ${selectedCustomers.length}`,
          imageButton: imageUrl || undefined,
          choices: [
            `${buttonText}|${websiteUrl}`
          ]
        }];
      } else {
        // Modo normal: enviar para todos os clientes selecionados
        messages = selectedCustomers
          .filter(customer => customer.whatsapp) // Só enviar para quem tem WhatsApp
          .map(customer => ({
            number: customer.whatsapp?.replace(/\D/g, '') || '', // Remove caracteres não numéricos
            type: 'button',
            text: message,
            footerText: footerText,
            imageButton: imageUrl || undefined,
            choices: [
              `${buttonText}|${websiteUrl}`
            ]
          }));
      }

      const payload = {
        delayMin: 3,
        delayMax: 5,
        info: `Campanha ${campaignType} - ${new Date().toISOString()}`,
        scheduled_for: 1, // Enviar em 1 minuto
        messages: messages
      };

      console.log('📤 Enviando campanha:', payload);

      const response = await fetch('/api/campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSendStatus('success');
        setTimeout(() => {
          onClose();
          setSendStatus('idle');
          setMessage('');
        }, 2000);
      } else {
        throw new Error(result.message || 'Erro ao enviar campanha');
      }
    } catch (error) {
      console.error('❌ Erro ao enviar campanha:', error);
      setSendStatus('error');
      setTimeout(() => setSendStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const customersWithWhatsApp = selectedCustomers.filter(c => c.whatsapp);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">📱 Campanha WhatsApp</h2>
                <p className="text-green-100">Campanha para {campaignType}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white bg-opacity-15 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Clientes Selecionados</span>
              </div>
              <p className="text-xl font-bold">{selectedCustomers.length}</p>
            </div>
            <div className="bg-white bg-opacity-15 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Com WhatsApp</span>
              </div>
              <p className="text-xl font-bold text-green-200">{customersWithWhatsApp.length}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {customersWithWhatsApp.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Nenhum cliente com WhatsApp
              </h3>
              <p className="text-gray-600">
                Os clientes selecionados não possuem número de WhatsApp cadastrado.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Modo Teste */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTestMode}
                      onChange={(e) => setIsTestMode(e.target.checked)}
                      className="rounded border-yellow-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="text-sm font-medium text-yellow-800">
                      🧪 Modo Teste (Recomendado)
                    </span>
                  </label>
                </div>
                {isTestMode && (
                  <div>
                    <label className="block text-sm font-medium text-yellow-700 mb-2">
                      📱 Número para Teste
                    </label>
                    <input
                      type="tel"
                      value={testNumber}
                      onChange={(e) => setTestNumber(e.target.value)}
                      placeholder="5511999999999"
                      className="w-full p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <p className="text-xs text-yellow-600 mt-1">
                      💡 No modo teste, a mensagem será enviada apenas para este número, com prefixo [TESTE]
                    </p>
                  </div>
                )}
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  💬 Mensagem da Campanha
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva a mensagem que será enviada para os clientes..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* URL da Imagem */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🖼️ URL da Imagem (opcional)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Botão */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🔘 Texto do Botão
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="Visitar Loja"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🌐 URL do Site
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://tiendalibre.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Footer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Rodapé da Mensagem
                </label>
                <input
                  type="text"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  placeholder="Mensagem enviada pela TiendaLibre"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Preview */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-800 mb-2">
                  👁️ Pré-visualização 
                  {isTestMode && <span className="text-yellow-600 text-sm ml-2">(Modo Teste)</span>}
                </h4>
                <div className={`bg-white p-3 rounded border-l-4 ${isTestMode ? 'border-yellow-500' : 'border-green-500'}`}>
                  {imageUrl && (
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">🖼️ [Imagem será exibida aqui]</span>
                    </div>
                  )}
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {isTestMode && '[TESTE] '}
                    {message || 'Digite sua mensagem...'}
                  </p>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <button className={`px-3 py-1 rounded text-sm ${isTestMode ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      🔘 {buttonText}
                    </button>
                  </div>
                  {footerText && (
                    <p className="text-xs text-gray-500 mt-2">
                      {isTestMode 
                        ? `${footerText} | Clientes selecionados: ${selectedCustomers.length}` 
                        : footerText
                      }
                    </p>
                  )}
                  {isTestMode && (
                    <div className="mt-2 pt-2 border-t border-yellow-200">
                      <p className="text-xs text-yellow-600">
                        📱 Será enviado para: {testNumber}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {customersWithWhatsApp.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {sendStatus === 'sending' && (
                  <span className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full"></div>
                    Enviando campanha...
                  </span>
                )}
                {sendStatus === 'success' && (
                  <span className="text-green-600">✅ Campanha enviada com sucesso!</span>
                )}
                {sendStatus === 'error' && (
                  <span className="text-red-600">❌ Erro ao enviar campanha</span>
                )}
                {sendStatus === 'idle' && (
                  <span>
                    💡 <strong>Delay:</strong> 3-5 segundos entre mensagens para evitar bloqueio
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendCampaign}
                  disabled={!message.trim() || isLoading || sendStatus === 'sending'}
                  className={`px-6 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 ${
                    isTestMode 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      {isTestMode ? 'Enviando Teste...' : 'Enviando...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {isTestMode ? '🧪 Enviar Teste' : 'Enviar Campanha'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}