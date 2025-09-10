import axios, { AxiosInstance } from 'axios';
import { config, API_LIMITS } from '@/lib/config';
import { Order, Customer, Product } from '@/types';

class NuvemshopAPI {
  private client: AxiosInstance;
  private ordersCache: Order[] | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  constructor() {
    this.client = axios.create({
      baseURL: `${config.nuvemshop.baseUrl}/${config.nuvemshop.storeId}`,
      headers: {
        'Authentication': `bearer ${config.nuvemshop.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async getAllPages<T>(endpoint: string, params: Record<string, any> = {}): Promise<T[]> {
    const allData: T[] = [];
    let page = 1;
    let hasMore = true;

    console.log(`🔄 Iniciando coleta paginada: ${endpoint}`);

    while (hasMore) {
      try {
        const response = await this.client.get<T[]>(endpoint, {
          params: {
            ...params,
            page,
            per_page: API_LIMITS.PER_PAGE,
          },
        });

        const data = response.data;
        
        if (data && data.length > 0) {
          allData.push(...data);
          console.log(`📄 Página ${page}: ${data.length} itens coletados (Total: ${allData.length})`);
          
          // Check if we got less than the requested amount - indicates last page
          if (data.length < API_LIMITS.PER_PAGE) {
            hasMore = false;
            console.log(`✅ Última página detectada: ${allData.length} itens total`);
          } else {
            page++;
            // Rate limiting - pausa entre requests
            await this.delay(API_LIMITS.RATE_LIMIT_DELAY);
          }
        } else {
          hasMore = false;
          console.log(`✅ Coleta finalizada: ${allData.length} itens total`);
        }
      } catch (error: any) {
        // If we get 404 and it says "Last page is X", we've reached the end
        if (error.response?.status === 404 && error.response?.data?.description?.includes('Last page')) {
          hasMore = false;
          console.log(`✅ Fim da paginação detectado (404): ${allData.length} itens total`);
          console.log(`ℹ️  API response: ${error.response.data.description}`);
        } else {
          console.error(`❌ Erro na página ${page}:`, error.message);
          throw error;
        }
      }
    }

    return allData;
  }

  async getAllOrders(params?: { 
    created_at_min?: string; 
    created_at_max?: string;
    updated_at_min?: string;
  }): Promise<Order[]> {
    // Se não há parâmetros específicos e o cache é válido, usar cache
    if (!params && this.ordersCache && (Date.now() - this.cacheTimestamp) < this.CACHE_DURATION) {
      console.log('📦 Usando cache de pedidos');
      return this.ordersCache;
    }

    console.log('🔄 Buscando pedidos da API (cache expirado ou parâmetros específicos)');
    const orders = await this.getAllPages<Order>('/orders', params);
    
    // Atualizar cache apenas se não há parâmetros específicos
    if (!params) {
      this.ordersCache = orders;
      this.cacheTimestamp = Date.now();
      console.log(`💾 Cache atualizado com ${orders.length} pedidos`);
    }
    
    return orders;
  }

  async getAllCustomers(params?: { 
    created_at_min?: string; 
    updated_at_min?: string;
  }): Promise<Customer[]> {
    return this.getAllPages<Customer>('/customers', params);
  }

  async getAllProducts(params?: { 
    created_at_min?: string; 
    published?: boolean;
  }): Promise<Product[]> {
    return this.getAllPages<Product>('/products', params);
  }

  // Get specific order by ID
  async getOrder(orderId: number): Promise<Order> {
    const response = await this.client.get<Order>(`/orders/${orderId}`);
    return response.data;
  }

  // Get specific customer by ID
  async getCustomer(customerId: number): Promise<Customer> {
    const response = await this.client.get<Customer>(`/customers/${customerId}`);
    return response.data;
  }

  // Get orders for specific customer
  async getCustomerOrders(customerId: number): Promise<Order[]> {
    console.log(`🔍 Buscando pedidos para cliente ID: ${customerId}`);
    
    // Use cached orders if available to avoid API call
    const allOrders = await this.getAllOrders(); // Isso usará cache se disponível
    
    const customerOrders = allOrders.filter(order => 
      order.customer && order.customer.id === customerId
    );
    
    console.log(`✅ Encontrados ${customerOrders.length} pedidos para cliente ${customerId}`);
    return customerOrders;
  }
}

export const nuvemshopAPI = new NuvemshopAPI();