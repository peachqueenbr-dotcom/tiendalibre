import { Order, Customer, CustomerAnalytics, ProductAnalytics, DashboardMetrics } from '@/types';

export class AnalyticsService {
  
  static calculateCustomerAnalytics(customers: Customer[], orders: Order[]): CustomerAnalytics[] {
    return customers.map(customer => {
      const customerOrders = orders.filter(order => order.customer?.id === customer.id);
      const totalSpent = parseFloat(customer.total_spent || '0');
      const orderCount = customerOrders.length;
      const avgOrderValue = orderCount > 0 ? totalSpent / orderCount : 0;
      
      // Find last order date
      const lastOrder = customerOrders
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
      
      const lastOrderDate = lastOrder ? lastOrder.created_at : customer.created_at;
      const daysSinceLastOrder = Math.floor(
        (Date.now() - new Date(lastOrderDate).getTime()) / (1000 * 60 * 60 * 24)
      );

      // Customer segmentation logic
      let segment: CustomerAnalytics['segment'] = 'New';
      if (totalSpent > 1000 && orderCount >= 5) segment = 'VIP';
      else if (orderCount >= 2) segment = 'Regular';
      else if (daysSinceLastOrder > 90) segment = 'Inactive';

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        whatsapp: customer.contato || customer.phone || undefined, // Mapear contato para whatsapp
        totalSpent,
        orderCount,
        avgOrderValue,
        lastOrderDate,
        daysSinceLastOrder,
        customerLifetimeValue: totalSpent, // Simplified CLV
        segment,
      };
    });
  }

  static calculateProductAnalytics(orders: Order[]): ProductAnalytics[] {
    const productMap = new Map<number, {
      id: number;
      name: string;
      totalSales: number;
      totalQuantity: number;
      prices: number[];
      category: string;
    }>();

    // Process all order products
    orders.forEach(order => {
      order.products?.forEach(product => {
        const key = product.product_id;
        const existing = productMap.get(key);
        const sales = parseFloat(product.price) * product.quantity;
        const price = parseFloat(product.price);

        if (existing) {
          existing.totalSales += sales;
          existing.totalQuantity += product.quantity;
          existing.prices.push(price);
        } else {
          productMap.set(key, {
            id: product.product_id,
            name: product.name,
            totalSales: sales,
            totalQuantity: product.quantity,
            prices: [price],
            category: 'General', // Would need product details for actual category
          });
        }
      });
    });

    // Convert to analytics format and rank
    const analytics = Array.from(productMap.values())
      .map(product => ({
        id: product.id,
        name: product.name,
        totalSales: product.totalSales,
        totalQuantity: product.totalQuantity,
        avgPrice: product.prices.reduce((a, b) => a + b, 0) / product.prices.length,
        category: product.category,
        rank: 0, // Will be set below
      }))
      .sort((a, b) => b.totalSales - a.totalSales);

    // Add ranking
    analytics.forEach((product, index) => {
      product.rank = index + 1;
    });

    return analytics;
  }

  static calculateDashboardMetrics(orders: Order[], period: string = '30d'): DashboardMetrics {
    const periodDate = new Date();
    periodDate.setDate(periodDate.getDate() - parseInt(period.replace('d', '')));

    const periodOrders = orders.filter(order => 
      new Date(order.created_at) >= periodDate
    );

    const totalRevenue = periodOrders.reduce(
      (sum, order) => sum + parseFloat(order.total || '0'), 0
    );

    const uniqueCustomers = new Set(
      periodOrders.map(order => order.customer?.id).filter(Boolean)
    ).size;

    return {
      totalRevenue,
      totalOrders: periodOrders.length,
      totalCustomers: uniqueCustomers,
      avgOrderValue: periodOrders.length > 0 ? totalRevenue / periodOrders.length : 0,
      period,
    };
  }

  // Get top customers by CLV
  static getTopCustomersByCLV(analytics: CustomerAnalytics[], limit: number = 10): CustomerAnalytics[] {
    return analytics
      .sort((a, b) => b.customerLifetimeValue - a.customerLifetimeValue)
      .slice(0, limit);
  }

  // Get customers likely to purchase (low days since last order + good history)
  static getCustomersLikelyToPurchase(analytics: CustomerAnalytics[], limit: number = 10): CustomerAnalytics[] {
    return analytics
      .filter(c => c.segment !== 'Inactive' && c.daysSinceLastOrder > 7 && c.daysSinceLastOrder < 30)
      .sort((a, b) => b.avgOrderValue - a.avgOrderValue)
      .slice(0, limit);
  }

  // Get product recommendations for customer (simplified)
  static getProductRecommendations(customerId: number, orders: Order[], limit: number = 5): ProductAnalytics[] {
    // Get customer's order history
    const customerOrders = orders.filter(order => order.customer?.id === customerId);
    const customerProductIds = new Set(
      customerOrders.flatMap(order => order.products?.map(p => p.product_id) || [])
    );

    // Get all products analytics
    const allProducts = this.calculateProductAnalytics(orders);
    
    // Recommend popular products the customer hasn't bought
    return allProducts
      .filter(product => !customerProductIds.has(product.id))
      .slice(0, limit);
  }

  // Calculate temporal analytics for time series analysis
  static calculateTemporalAnalytics(orders: Order[], customers: Customer[]) {
    // Group orders by month/year
    const monthlyData = new Map<string, {
      period: string;
      month: number;
      year: number;
      revenue: number;
      orders: number;
      customers: Set<number>;
      avgOrderValue: number;
    }>();

    orders.forEach(order => {
      const orderDate = new Date(order.created_at);
      const year = orderDate.getFullYear();
      const month = orderDate.getMonth() + 1;
      const key = `${year}-${month.toString().padStart(2, '0')}`;
      
      if (!monthlyData.has(key)) {
        monthlyData.set(key, {
          period: key,
          month,
          year,
          revenue: 0,
          orders: 0,
          customers: new Set(),
          avgOrderValue: 0
        });
      }

      const data = monthlyData.get(key)!;
      data.revenue += parseFloat(order.total || '0');
      data.orders += 1;
      
      if (order.customer?.id) {
        data.customers.add(order.customer.id);
      }
    });

    // Convert to array and calculate averages
    const temporalData = Array.from(monthlyData.values())
      .map(data => ({
        ...data,
        customers: data.customers.size,
        avgOrderValue: data.orders > 0 ? data.revenue / data.orders : 0,
        name: `${data.month.toString().padStart(2, '0')}/${data.year}`
      }))
      .sort((a, b) => a.year - b.year || a.month - b.month);

    // Calculate seasonal insights
    const seasonalInsights = this.calculateSeasonalInsights(temporalData);

    // Calculate overall metrics
    const totalRevenue = temporalData.reduce((sum, data) => sum + data.revenue, 0);
    const totalOrders = temporalData.reduce((sum, data) => sum + data.orders, 0);
    const totalCustomers = new Set(orders.map(o => o.customer?.id).filter(Boolean)).size;
    
    // Calculate growth rates (month over month)
    const recentData = temporalData.slice(-2);
    const revenueGrowth = recentData.length >= 2 ? 
      ((recentData[1].revenue - recentData[0].revenue) / recentData[0].revenue) * 100 : 0;
    const ordersGrowth = recentData.length >= 2 ? 
      ((recentData[1].orders - recentData[0].orders) / recentData[0].orders) * 100 : 0;
    const customersGrowth = recentData.length >= 2 ? 
      ((recentData[1].customers - recentData[0].customers) / recentData[0].customers) * 100 : 0;

    return {
      temporalData,
      seasonalInsights,
      metrics: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
        revenueGrowth,
        ordersGrowth,
        customersGrowth
      }
    };
  }

  // Calculate seasonal insights from temporal data
  private static calculateSeasonalInsights(data: any[]) {
    if (data.length < 3) return [];

    const insights = [];
    
    // Find peak month
    const peakRevenue = Math.max(...data.map(d => d.revenue));
    const peakMonth = data.find(d => d.revenue === peakRevenue);
    if (peakMonth) {
      insights.push({
        type: 'peak',
        period: peakMonth.name,
        description: `Melhor mês em vendas do período analisado`,
        value: peakRevenue,
        growth: 0
      });
    }

    // Find lowest month
    const minRevenue = Math.min(...data.map(d => d.revenue));
    const lowMonth = data.find(d => d.revenue === minRevenue);
    if (lowMonth && lowMonth !== peakMonth) {
      insights.push({
        type: 'low',
        period: lowMonth.name,
        description: `Mês com menor faturamento do período`,
        value: minRevenue,
        growth: 0
      });
    }

    // Find growth trends (last 3 months)
    const recent = data.slice(-3);
    if (recent.length >= 2) {
      const lastGrowth = ((recent[recent.length - 1].revenue - recent[recent.length - 2].revenue) / recent[recent.length - 2].revenue) * 100;
      
      if (lastGrowth > 10) {
        insights.push({
          type: 'growth',
          period: recent[recent.length - 1].name,
          description: `Crescimento significativo em relação ao mês anterior`,
          value: recent[recent.length - 1].revenue,
          growth: lastGrowth
        });
      } else if (lastGrowth < -10) {
        insights.push({
          type: 'decline',
          period: recent[recent.length - 1].name,
          description: `Queda em relação ao mês anterior`,
          value: recent[recent.length - 1].revenue,
          growth: lastGrowth
        });
      }
    }

    return insights.slice(0, 3); // Limit to 3 insights
  }

  // Calculate sales analytics for a specific product by date
  static calculateProductSalesAnalytics(orders: Order[], productId: number) {
    // Group orders by month/year that contain the specific product
    const monthlyData = new Map<string, {
      month: string;
      year: number;
      sales: number;
      quantity: number;
      orders: number;
    }>();

    orders.forEach(order => {
      // Check if this order contains the specific product
      const productInOrder = order.products?.find(p => p.product_id === productId);
      if (!productInOrder) return;

      const orderDate = new Date(order.created_at);
      const year = orderDate.getFullYear();
      const month = orderDate.getMonth() + 1;
      const key = `${year}-${month.toString().padStart(2, '0')}`;
      
      if (!monthlyData.has(key)) {
        const monthName = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][month - 1];
        monthlyData.set(key, {
          month: monthName,
          year,
          sales: 0,
          quantity: 0,
          orders: 0
        });
      }

      const data = monthlyData.get(key)!;
      data.sales += parseFloat(productInOrder.price) * productInOrder.quantity;
      data.quantity += productInOrder.quantity;
      data.orders += 1;
    });

    // Convert to array and sort by date
    return Array.from(monthlyData.values())
      .sort((a, b) => a.year - b.year || (new Date(`${a.month} 1, ${a.year}`).getMonth() - new Date(`${b.month} 1, ${b.year}`).getMonth()));
  }
}