export const config = {
  nuvemshop: {
    apiKey: process.env.nuvem_shop_api || '',
    storeId: process.env.nuvem_shop_id || '',
    baseUrl: 'https://api.nuvemshop.com.br/2025-03',
  }
};

export const API_LIMITS = {
  PER_PAGE: 200, // Maximum allowed by API
  RATE_LIMIT_DELAY: 1000, // 1 second between requests
};