import { PRODUCTS } from '../data/products';

export function formatPrice(amount, currency = 'USD') {
  const numeric = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(numeric);
}

export function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null;
}

export function getProductImage(product) {
  if (!product) {
    return 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85';
  }
  if (typeof product.images === 'string') {
    return product.images;
  }
  if (product.images?.hero) return product.images.hero;
  if (product.images?.primary) return product.images.primary;
  if (product.images?.lifestyle) return product.images.lifestyle;
  if (product.images?.angle) return product.images.angle;
  if (product.images?.detail) return product.images.detail;
  if (Array.isArray(product.images?.gallery) && product.images.gallery[0]) {
    return product.images.gallery[0];
  }
  if (product.image_url) return product.image_url;
  return 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85';
}

export function getRelatedProducts(currentSlug, limit = 3) {
  const current = getProductBySlug(currentSlug);
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS
    .filter(p => p.slug !== currentSlug && (p.category === current.category || p.collection === current.collection))
    .slice(0, limit);
}
