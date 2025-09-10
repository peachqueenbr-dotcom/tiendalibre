import { NextRequest, NextResponse } from 'next/server';
import { nuvemshopAPI } from '@/services/nuvemshop-api';
import { AnalyticsService } from '@/services/analytics';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  try {
    switch (type) {
      case 'clv':
        // Get customers and orders data
        console.log('🔄 API: Carregando dados para CLV...');
        const [customers, orders] = await Promise.all([
          nuvemshopAPI.getAllCustomers(),
          nuvemshopAPI.getAllOrders()
        ]);

        console.log(`📊 API: Processando ${customers.length} clientes e ${orders.length} pedidos`);
        
        // Calculate analytics
        const customerAnalytics = AnalyticsService.calculateCustomerAnalytics(customers, orders);
        const dashboardMetrics = AnalyticsService.calculateDashboardMetrics(orders);
        const topCustomers = AnalyticsService.getTopCustomersByCLV(customerAnalytics, 10);
        const likelyToPurchase = AnalyticsService.getCustomersLikelyToPurchase(customerAnalytics, 10);

        // Segment distribution
        const segmentDistribution = customerAnalytics.reduce((acc, customer) => {
          acc[customer.segment] = (acc[customer.segment] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return NextResponse.json({
          success: true,
          data: {
            analytics: customerAnalytics,
            metrics: dashboardMetrics,
            topCustomers,
            likelyToPurchase,
            segmentDistribution,
            totalCustomers: customers.length,
            totalOrders: orders.length
          }
        });

      case 'products':
        console.log('🔄 API: Carregando dados para Produtos...');
        const allOrders = await nuvemshopAPI.getAllOrders();
        const productAnalytics = AnalyticsService.calculateProductAnalytics(allOrders);
        
        return NextResponse.json({
          success: true,
          data: {
            products: productAnalytics.slice(0, 50), // Top 50 products
            totalProducts: productAnalytics.length
          }
        });

      case 'temporal':
        console.log('🔄 API: Carregando dados para Análise Temporal...');
        const ordersForTemporal = await nuvemshopAPI.getAllOrders();
        const customersForTemporal = await nuvemshopAPI.getAllCustomers();
        const temporalAnalytics = AnalyticsService.calculateTemporalAnalytics(ordersForTemporal, customersForTemporal);
        
        return NextResponse.json({
          success: true,
          data: temporalAnalytics
        });

      case 'customer-orders':
        const customerId = searchParams.get('customer_id');
        if (!customerId) {
          return NextResponse.json({
            success: false,
            error: 'customer_id é obrigatório para buscar pedidos do cliente'
          }, { status: 400 });
        }

        console.log(`🔄 API: Carregando pedidos do cliente ${customerId}...`);
        const customerOrders = await nuvemshopAPI.getCustomerOrders(parseInt(customerId));
        
        return NextResponse.json({
          success: true,
          data: {
            orders: customerOrders.map(order => ({
              id: order.id,
              number: order.number,
              date: order.created_at,
              total: order.total,
              status: order.status,
              products: order.products || []
            }))
          }
        });

      case 'product-sales':
        const productId = searchParams.get('product_id');
        if (!productId) {
          return NextResponse.json({
            success: false,
            error: 'product_id é obrigatório para buscar vendas do produto'
          }, { status: 400 });
        }

        console.log(`🔄 API: Carregando vendas do produto ${productId}...`);
        const allOrdersForProduct = await nuvemshopAPI.getAllOrders();
        const productSalesAnalytics = AnalyticsService.calculateProductSalesAnalytics(allOrdersForProduct, parseInt(productId));
        
        return NextResponse.json({
          success: true,
          data: {
            sales: productSalesAnalytics
          }
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Tipo de análise não especificado. Use ?type=clv, ?type=products, ?type=temporal, ?type=customer-orders ou ?type=product-sales'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro ao processar dados da API Nuvemshop',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}