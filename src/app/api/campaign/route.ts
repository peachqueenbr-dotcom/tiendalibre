import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📤 Enviando campanha para UazAPI:', body);
    
    // Validar dados obrigatórios
    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Lista de mensagens é obrigatória' },
        { status: 400 }
      );
    }

    // Configurar headers para UazAPI com token
    const baseUrl = process.env.UAZAPI_URL || 'https://impeto.uazapi.com';
    const token = process.env.UAZAPI_TOKEN;
    const uazApiUrl = `${baseUrl}/sender/advanced`;
    
    if (!token) {
      console.error('❌ Token UazAPI não configurado');
      return NextResponse.json(
        { success: false, message: 'Token de API não configurado' },
        { status: 500 }
      );
    }
    
    console.log('🎯 Enviando para:', uazApiUrl);
    console.log('🔑 Token configurado:', token ? '✅ Sim' : '❌ Não');
    console.log('📊 Payload:', JSON.stringify(body, null, 2));

    // Fazer requisição para UazAPI usando header token (formato correto)
    console.log('🔄 Enviando com header token...');
    const response = await fetch(uazApiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token,
      },
      body: JSON.stringify(body)
    });

    const responseText = await response.text();
    console.log('📥 Resposta UazAPI (status):', response.status);
    console.log('📥 Resposta UazAPI (texto):', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Erro ao parsear resposta JSON:', e);
      responseData = { message: responseText };
    }

    if (response.ok) {
      console.log('✅ Campanha enviada com sucesso!');
      return NextResponse.json({
        success: true,
        message: 'Campanha enviada com sucesso!',
        data: responseData,
        totalMessages: body.messages.length
      });
    } else {
      console.error('❌ Erro na API UazAPI:', response.status, responseData);
      
      // Tratar diferentes tipos de erro
      let errorMessage = 'Erro ao enviar campanha';
      if (response.status === 401) {
        errorMessage = 'Token de API inválido ou expirado';
      } else if (response.status === 400) {
        errorMessage = responseData?.message || 'Dados inválidos na requisição';
      } else if (response.status === 429) {
        errorMessage = 'Limite de API excedido, tente novamente mais tarde';
      } else if (response.status >= 500) {
        errorMessage = 'Erro interno do servidor UazAPI';
      }

      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage,
          details: responseData,
          status: response.status 
        },
        { status: response.status }
      );
    }

  } catch (error) {
    console.error('❌ Erro interno ao processar campanha:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro interno do servidor',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// Método GET para testar se a API está funcionando
export async function GET() {
  const baseUrl = process.env.UAZAPI_URL || 'https://impeto.uazapi.com';
  const uazApiUrl = `${baseUrl}/sender/advanced`;
  
  return NextResponse.json({
    message: 'API de Campanhas TiendaLibre',
    status: 'online',
    uazApiUrl: uazApiUrl,
    baseUrl: baseUrl,
    timestamp: new Date().toISOString()
  });
}