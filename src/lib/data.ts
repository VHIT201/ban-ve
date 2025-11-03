import { Blueprint, Category } from './types';

export const blueprints: Blueprint[] = [
  {
    id: '1',
    title: 'Bộ Hộp Số Công Nghiệp',
    description: 'Bản vẽ 3D đầy đủ bộ hộp số công nghiệp, tỷ số truyền 1:5, làm từ thép hợp kim 20CrMnTi, độ cứng 58-62 HRC.',
    category: 'Cơ khí',
    price: 29990000,
    dimensions: 'A1',
    sqft: 13.5,
    bedrooms: 0,
    bathrooms: 0,
    imageUrl: 'data:image/jpeg;base64,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'
  },
  {
    id: '2',
    title: 'Mạch Điều Khiển Động Cơ',
    description: 'Sơ đồ mạch điều khiển động cơ 3 pha, công suất 5.5kW, tích hợp bảo vệ quá tải, ngắn mạch và mất pha.',
    category: 'Điện',
    price: 11490000,
    dimensions: 'A3',
    sqft: 0,
    imageUrl: '/src/assets/2.png'
  },
  {
    id: '3',
    title: 'Kết Cấu Khung Thép Nhà Xưởng',
    description: 'Bản vẽ kết cấu khung thép nhà công nghiệp 1 tầng, nhịp 30m, cao 8m, tải trọng mái 150kg/m².',
    category: 'Xây dựng',
    price: 52990000,
    dimensions: '50m × 30m',
    sqft: 1500,
    imageUrl: '/src/assets/3.png'
  },
  {
    id: '4',
    title: 'Thiết Kế Hệ Thống Điều Hòa',
    description: 'Bản vẽ hệ thống điều hòa trung tâm VRV/VRF cho tòa nhà văn phòng 10 tầng, công suất lạnh 120kW.',
    category: 'Điều hòa',
    price: 21990000,
    dimensions: 'A2',
    sqft: 0,
    imageUrl: '/src/assets/4.png'
  },
  {
    id: '5',
    title: 'Chi Tiết Hộp Số Cơ Khí',
    description: 'Bản vẽ chi tiết các thành phần hộp số: trục, bánh răng, vòng bi và phớt chặn với dung sai lắp ghép và vật liệu.',
    category: 'Cơ khí',
    price: 15990000,
    dimensions: 'A3',
    sqft: 0,
    imageUrl: '/src/assets/5.png'
  },
  {
    id: '6',
    title: 'Sơ Đồ Mạch Điều Khiển PLC',
    description: 'Sơ đồ mạch điều khiển tự động sử dụng PLC Siemens S7-1200, kết nối cảm biến và cơ cấu chấp hành.',
    category: 'Điện',
    price: 19490000,
    dimensions: 'A2',
    sqft: 0,
    imageUrl: '/src/assets/6.png'
  },
  {
    id: '7',
    title: 'Bản Vẽ Móng Băng Nhà Ở',
    description: 'Bản vẽ thi công móng băng nhà dân, kích thước 20m x 10m, 3 tầng, phù hợp điều kiện đất yếu.',
    category: 'Xây dựng',
    price: 31990000,
    dimensions: 'A0',
    sqft: 200,
    imageUrl: '/src/assets/7.png'
  },
  {
    id: '8',
    title: 'Thiết Kế Hệ Thống Cấp Thoát Nước',
    description: 'Bản vẽ hệ thống cấp thoát nước tòa nhà cao tầng, bao gồm đường ống nước lạnh, nước nóng trung tâm và thoát nước thải.',
    category: 'Cấp thoát nước',
    price: 24990000,
    dimensions: 'A1',
    sqft: 0,
    imageUrl: '/src/assets/8.png'
  },
  {
    id: '9',
    title: 'Hệ Thống Máy Ép Thủy Lực',
    description: 'Bản vẽ hệ thống thủy lực máy ép 100 tấn, bao gồm xi lanh, bơm, van điều khiển và đường ống dầu.',
    category: 'Cơ khí',
    price: 38990000,
    dimensions: 'A1',
    sqft: 0,
    imageUrl: '/src/assets/9.png'
  },
  {
    id: '10',
    title: 'Sơ Đồ Tủ Điều Khiển',
    description: 'Sơ đồ nguyên lý tủ điện điều khiển công nghiệp, bao gồm biến tần, động cơ, cảm biến và kết nối PLC.',
    category: 'Điện',
    price: 16990000,
    dimensions: 'A2',
    sqft: 0,
    imageUrl: '/src/assets/2.png'
  },
  {
    id: '11',
    title: 'Kết Cấu Mái Vòm Sân Vận Động',
    description: 'Bản vẽ kết cấu giàn không gian mái vòm đa năng, nhịp 80m, cao 25m, sử dụng thép và kính cường lực.',
    category: 'Xây dựng',
    price: 71990000,
    dimensions: 'A0',
    sqft: 5000,
    imageUrl: '/src/assets/10.png'
  },
  {
    id: '12',
    title: 'Hệ Thống Thông Gió Tầng Hầm',
    description: 'Bản vẽ hệ thống thông gió tầng hầm để xe, công suất 20.000m³/h, tích hợp hút khói phòng cháy.',
    category: 'Điều hòa',
    price: 43990000,
    dimensions: 'A1',
    sqft: 0,
    imageUrl: '/src/assets/4.png'
  },
];

export const categories: Array<{ name: string; value: Category | 'All' }> = [
  { name: 'Tất cả bản vẽ', value: 'All' },
  { name: 'Cơ khí', value: 'Cơ khí' },
  { name: 'Điện', value: 'Điện' },
  { name: 'Xây dựng', value: 'Xây dựng' },
  { name: 'Điều hòa', value: 'Điều hòa' },
  { name: 'Cấp thoát nước', value: 'Cấp thoát nước' },
  { name: 'Điện tử', value: 'Điện tử' },
  { name: 'Robot', value: 'Robot' },
  { name: 'Nội thất', value: 'Nội thất' }
];
