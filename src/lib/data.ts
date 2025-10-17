import { Blueprint, Category } from './types';

export const blueprints: Blueprint[] = [
  {
    id: '1',
    title: 'Modern Coastal Villa',
    description: 'Contemporary beachfront design featuring open-concept living spaces, floor-to-ceiling windows, and seamless indoor-outdoor flow. Perfect for coastal properties.',
    category: 'Residential',
    price: 899,
    dimensions: '65\' × 48\'',
    sqft: 3120,
    bedrooms: 4,
    bathrooms: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
  },
  {
    id: '2',
    title: 'Urban Office Complex',
    description: 'Multi-story commercial building design optimized for modern workspace needs. Includes flexible floor plans, central atrium, and sustainable systems.',
    category: 'Commercial',
    price: 2499,
    dimensions: '120\' × 80\'',
    sqft: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    title: 'Zen Garden Layout',
    description: 'Tranquil Japanese-inspired landscape design with koi pond, stone pathways, meditation areas, and carefully curated plant selections.',
    category: 'Landscape',
    price: 599,
    dimensions: '50\' × 80\'',
    sqft: 4000,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
  },
  {
    id: '4',
    title: 'Craftsman Bungalow',
    description: 'Classic American craftsman style home with covered front porch, natural materials, and charming interior details. Ideal for suburban lots.',
    category: 'Traditional',
    price: 749,
    dimensions: '42\' × 36\'',
    sqft: 1890,
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'
  },
  {
    id: '5',
    title: 'Manufacturing Facility',
    description: 'Efficient industrial warehouse design with high ceilings, loading docks, office space, and optimized workflow patterns for production operations.',
    category: 'Industrial',
    price: 3299,
    dimensions: '200\' × 150\'',
    sqft: 30000,
    imageUrl: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=800&h=600&fit=crop'
  },
  {
    id: '6',
    title: 'Minimalist Cube House',
    description: 'Bold geometric modern home with clean lines, large glass panels, and innovative space utilization. A statement piece for contemporary living.',
    category: 'Modern',
    price: 1099,
    dimensions: '45\' × 45\'',
    sqft: 2800,
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'
  },
  {
    id: '7',
    title: 'Boutique Retail Space',
    description: 'Inviting street-front retail design with display windows, customer flow optimization, and attractive facade. Perfect for downtown locations.',
    category: 'Commercial',
    price: 1299,
    dimensions: '35\' × 70\'',
    sqft: 2450,
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'
  },
  {
    id: '8',
    title: 'English Country Garden',
    description: 'Romantic cottage-style garden featuring mixed borders, arbors, secret pathways, and traditional English plantings for four-season interest.',
    category: 'Landscape',
    price: 449,
    dimensions: '40\' × 60\'',
    sqft: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop'
  },
  {
    id: '9',
    title: 'Victorian Townhouse',
    description: 'Elegant three-story Victorian design with ornate details, bay windows, and period-appropriate interior spaces. Ideal for urban infill.',
    category: 'Traditional',
    price: 899,
    dimensions: '28\' × 55\'',
    sqft: 2650,
    bedrooms: 4,
    bathrooms: 3,
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
  },
  {
    id: '10',
    title: 'Smart Home Estate',
    description: 'Luxury modern residence with integrated technology, sustainable features, and resort-style amenities. Complete smart home infrastructure.',
    category: 'Modern',
    price: 1899,
    dimensions: '85\' × 65\'',
    sqft: 5525,
    bedrooms: 5,
    bathrooms: 4,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
  },
  {
    id: '11',
    title: 'Warehouse Conversion',
    description: 'Adaptive reuse design transforming industrial warehouse into flexible commercial or mixed-use space. Preserves character while adding modern amenities.',
    category: 'Industrial',
    price: 1799,
    dimensions: '100\' × 120\'',
    sqft: 12000,
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop'
  },
  {
    id: '12',
    title: 'Mountain Retreat',
    description: 'Rustic yet refined mountain home design featuring stone and timber construction, multiple decks, and spectacular view optimization.',
    category: 'Residential',
    price: 1249,
    dimensions: '58\' × 52\'',
    sqft: 3800,
    bedrooms: 4,
    bathrooms: 3,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop'
  }
];

export const categories: Array<{ name: string; value: Category | 'All' }> = [
  { name: 'All Blueprints', value: 'All' },
  { name: 'Residential', value: 'Residential' },
  { name: 'Commercial', value: 'Commercial' },
  { name: 'Landscape', value: 'Landscape' },
  { name: 'Industrial', value: 'Industrial' },
  { name: 'Modern', value: 'Modern' },
  { name: 'Traditional', value: 'Traditional' }
];
