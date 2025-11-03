import React, { useState, useMemo } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useKV } from '@github/spark/hooks';
import { Blueprint, CartItem, Category } from '@/lib/types';
import { blueprints, categories } from '@/lib/data';
import { BlueprintCard } from '@/components/BlueprintCard';
import { BlueprintDialog } from '@/components/BlueprintDialog';
import { ShoppingCart } from '@/components/ShoppingCart';
import { AuthDialog } from '@/components/AuthDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Toaster, toast } from 'sonner';
import { 
  MagnifyingGlass, 
  Ruler, 
  Factory, 
  Lightning, 
  Drop, 
  Cpu, 
  Robot, 
  CheckCircle, 
  List, 
  X, 
  Star, 
  Building, 
  ClockClockwise, 
  Shield, 
  MapPinLine, 
  PhoneCall, 
  EnvelopeSimple,
  Armchair,
  Upload
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

// CategoryButton Component
interface CategoryButtonProps {
  category: { value: Category | 'All'; name: string };
  isSelected: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}

const CategoryButton = ({ 
  category, 
  isSelected, 
  onClick, 
  fullWidth = false 
}: CategoryButtonProps) => {
  return (
    <Button
      variant={isSelected ? 'default' : 'outline'}
      onClick={onClick}
      className={`${fullWidth ? 'w-full justify-start' : ''} gap-2 text-sm h-9 px-4`}
    >
      {categoryIcons[category.value]}
      {category.name}
    </Button>
  );
};

// JSX types are now properly inferred from @types/react

const categoryIcons: Record<Category | 'All', React.ReactElement> = {
  'Cơ khí': <Factory size={16} weight="duotone" />,
  'Điện': <Lightning size={16} weight="duotone" />,
  'Xây dựng': <Ruler size={16} weight="duotone" />,
  'Điều hòa': <Drop size={16} weight="duotone" />,
  'Cấp thoát nước': <Drop size={16} weight="duotone" />,
  'Điện tử': <Cpu size={16} weight="duotone" />,
  'Robot': <Robot size={16} weight="duotone" />,
  'Nội thất': <Armchair size={16} weight="duotone" />,
  'All': <Cpu size={16} weight="duotone" />,
};

function App() {
  const [cart, setCart] = useKV<CartItem[]>('blueprint-cart', []);
  const cartItems = cart ?? [];
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredBlueprints = useMemo(() => {
    return blueprints.filter((blueprint) => {
      const matchesSearch = searchQuery === '' ||
        blueprint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blueprint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blueprint.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || blueprint.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const updateLocalCart = (newCart: CartItem[]) => {
    try {
      localStorage.setItem('local-cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const handleAddToCart = (blueprint: Blueprint) => {
    setCart((currentCart) => {
      const cartItems = Array.isArray(currentCart) ? [...currentCart] : [];
      const existingItem = cartItems.find(item => item.blueprint.id === blueprint.id);
      let newCart;
      
      if (existingItem) {
        newCart = cartItems.map(item =>
          item.blueprint.id === blueprint.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast.success('Đã cập nhật giỏ hàng', {
          description: `Tăng số lượng ${blueprint.title}`,
        });
      } else {
        newCart = [...cartItems, { blueprint, quantity: 1 }];
        toast.success('Đã thêm vào giỏ hàng', {
          description: blueprint.title,
        });
      }
      
      // Cập nhật localStorage
      updateLocalCart(newCart);
      return newCart;
    });
  };

  const handleUpdateQuantity = (blueprintId: string, quantity: number) => {
    setCart((currentCart) => {
      const cartItems = Array.isArray(currentCart) ? [...currentCart] : [];
      const newCart = cartItems.map(item =>
        item.blueprint.id === blueprintId
          ? { ...item, quantity }
          : item
      );
      
      // Cập nhật localStorage
      updateLocalCart(newCart);
      return newCart;
    });
  };

  const handleRemoveItem = (blueprintId: string) => {
    setCart((currentCart) => {
      const cartItems = Array.isArray(currentCart) ? [...currentCart] : [];
      const newCart = cartItems.filter(item => item.blueprint.id !== blueprintId);
      
      // Cập nhật localStorage
      updateLocalCart(newCart);
      
      // Hiển thị thông báo
      const removedItem = cartItems.find(item => item.blueprint.id === blueprintId);
      if (removedItem) {
        toast.info('Đã xóa khỏi giỏ hàng', {
          description: removedItem.blueprint.title,
        });
      }
      
      return newCart;
    });
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống');
      return;
    }
    navigate('/checkout');
  };

  const handleViewDetails = (blueprint: Blueprint) => {
    setSelectedBlueprint(blueprint);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster 
        position="top-right" 
        richColors 
        toastOptions={{
          style: {
            marginTop: '80px', // Add margin to avoid overlap with header
            marginRight: '20px' // Add some right margin
          },
          className: 'mt-20' // Add Tailwind class for top margin
        }}
      />
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <Ruler size={24} weight="bold" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold tracking-tight">Blueprint Marketplace</h1>
                <p className="text-xs text-muted-foreground">Premium Architectural Drawings</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-2xl px-4">
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search blueprints by title, description or category..."
                  className="pl-10 pr-4 py-2 rounded-xl border-border/50 focus-visible:ring-2 focus-visible:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center border-r border-gray-200 pr-3 mr-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-full" 
                  title="Yêu thích"
                  onClick={() => navigate('/favorites')}
                >
                  <Star size={18} weight="duotone" />
                </Button>
              </div>
              
              <div className="flex items-center border-r border-gray-200 pr-3 mr-3">
                <Button 
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex gap-1.5 items-center h-8 px-3 text-sm font-medium text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 border-emerald-200 transition-colors duration-200"
                  onClick={() => navigate('/upload')}
                >
                  <div className="flex items-center gap-1.5">
                    <Upload size={14} weight="bold" />
                    <span>Tải lên</span>
                  </div>
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="hidden sm:block">
                  <AuthDialog />
                </div>
                <ShoppingCart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Categories Filter */}
      <div className="sticky top-[73px] z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-2 md:py-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-end py-2">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <List size={20} />}
            </Button>
          </div>

          {/* Desktop Categories */}
          <div className="hidden md:flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <CategoryButton 
                key={category.value}
                category={category}
                isSelected={selectedCategory === category.value}
                onClick={() => setSelectedCategory(category.value)}
              />
            ))}
          </div>

          {/* Mobile Categories Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 space-y-2">
              {categories.map((category) => (
                <CategoryButton 
                  key={category.value}
                  category={category}
                  isSelected={selectedCategory === category.value}
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setIsMobileMenuOpen(false);
                  }}
                  fullWidth
                />
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Banner Chính - Phiên bản Nâng cấp */}
      <div className="relative bg-gray-900 overflow-hidden border-b z-10 h-[500px] md:h-[600px]">
        {/* Hình nền với lớp phủ */}
        <div 
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=900&fit=crop&auto=format&q=80&fit=crop&w=2070&q=80&ixlib=rb-4.0.3&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            opacity: 0.8,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          aria-label="Bản vẽ kỹ thuật chuyên nghiệp"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 text-sm px-3 py-1">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Hơn 1000+ Bản vẽ chuyên nghiệp
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 text-white [text-shadow:_0_1px_4px_rgba(0,0,0,0.5)]">
                <span className="text-primary [text-shadow:_0_1px_4px_rgba(0,0,0,0.5)]">Bản vẽ Kiến trúc</span>
                <br />Chuyên nghiệp & Sáng tạo
              </h1>
              
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl [text-shadow:_0_1px_2px_rgba(0,0,0,0.7)]">
                Giải pháp thiết kế toàn diện, sáng tạo và tối ưu cho mọi dự án của bạn. Khám phá ngay bộ sưu tập bản vẽ kiến trúc độc đáo, chuyên nghiệp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5">
                  <MagnifyingGlass size={20} className="mr-2" />
                  Khám phá ngay
                </Button>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  onClick={() => {
                    // Scroll to projects section
                    document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Building size={20} weight="duotone" className="mr-2" />
                  <span className="font-medium">Xem Dự Án Mẫu</span>
                </Button>
              </div>
                
              {/* Mini Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
                {[
                  { value: '50+', label: 'Chuyên gia' },
                  { value: '24/7', label: 'Hỗ trợ' },
                  { value: '99%', label: 'Hài lòng' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-gray-300">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Ưu điểm nổi bật */}
      <section className="py-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Button 
              variant="outline" 
              className="rounded-full border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary text-base md:text-lg py-3 px-8 h-auto font-medium mb-6 transform hover:scale-105 transition-transform duration-200"
            >
              Tại sao chọn chúng tôi?
            </Button>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Giải pháp <span className="text-primary">Thiết kế Toàn diện</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp bản vẽ kiến trúc chất lượng cao, đa dạng phong cách, đáp ứng mọi nhu cầu thiết kế của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Building size={32} weight="duotone" className="text-primary" />,
                title: 'Đa dạng Mẫu mã',
                description: 'Hàng trăm mẫu thiết kế từ cổ điển đến hiện đại, phù hợp với mọi phong cách kiến trúc'
              },
              {
                icon: <CheckCircle size={32} weight="duotone" className="text-primary" />,
                title: 'Chất Lượng Đảm Bảo',
                description: 'Được thiết kế bởi đội ngũ kiến trúc sư giàu kinh nghiệm và sáng tạo'
              },
              {
                icon: <ClockClockwise size={32} weight="duotone" className="text-primary" />,
                title: 'Tiết Kiệm Thời Gian',
                description: 'Tải xuống và sử dụng ngay, giảm thiểu thởi gian thiết kế từ đầu'
              },
              {
                icon: <Shield size={32} weight="fill" className="text-primary" />,
                title: 'Hỗ Trợ 24/7',
                description: 'Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border/30 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blueprints Grid */}
      
      <main className="container mx-auto px-4 pt-4 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Bản Vẽ Nổi Bật</h2>
            <p className="text-muted-foreground">
              Tìm thấy {filteredBlueprints.length} {filteredBlueprints.length === 1 ? 'thiết kế' : 'thiết kế'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-lg">
              Sắp xếp: Mới nhất
            </Button>
          </div>
        </div>
        {filteredBlueprints.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBlueprints.map((blueprint) => (
              <BlueprintCard
                key={blueprint.id}
                blueprint={blueprint}
                onViewDetails={handleViewDetails}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-muted/30 rounded-2xl">
            <div className="bg-muted p-4 rounded-full mb-4">
              <MagnifyingGlass size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Không tìm thấy bản vẽ</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Chúng tôi không tìm thấy bản vẽ nào phù hợp với tìm kiếm của bạn. Vui lòng điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Xóa tất cả bộ lọc
            </Button>
          </div>
        )}
      </main>
      <footer className="border-t bg-background/95 backdrop-blur-lg mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Thông tin công ty */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Ruler size={32} className="text-primary" />
                <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Blueprint Marketplace
                </span>
              </div>
              <p className="text-muted-foreground">
                Giải pháp thiết kế kiến trúc chuyên nghiệp, đa dạng mẫu mã và phong cách cho mọi công trình từ nhà ở đến các dự án thương mại.
              </p>
              <div className="flex space-x-3 pt-2">
                <a href="#" className="p-2.5 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="p-2.5 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                  </svg>
                </a>
                <a href="#" className="p-2.5 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="YouTube">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.015 3.015 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Liên kết nhanh */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-foreground flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Liên kết nhanh
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                    Mẫu thiết kế
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                    Dịch vụ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            {/* Danh mục */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-foreground flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Danh mục
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                    <Ruler size={16} className="text-primary" />
                    Xây dựng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                    <Lightning size={16} className="text-primary" />
                    Điện
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                    <Drop size={16} className="text-primary" />
                    Cấp thoát nước
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                    <Cpu size={16} className="text-primary" />
                    Điện tử
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors"></span>
                    <Armchair size={16} className="text-primary" />
                    Nội thất
                  </a>
                </li>
              </ul>
            </div>

            {/* Thông tin liên hệ */}
            <div>
              <h3 className="text-base font-semibold mb-4 text-foreground flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Thông tin liên hệ
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="mt-1">
                    <MapPinLine size={18} weight="duotone" className="text-primary flex-shrink-0" />
                  </div>
                  <span>Số 123, Đường Thiết Kế, P. Sáng Tạo, Q. Đổi Mới, TP. Hồ Chí Minh</span>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneCall size={18} weight="duotone" className="text-primary flex-shrink-0" />
                  <a href="tel:+84123456789" className="hover:text-primary transition-colors">+84 123 456 789</a>
                </li>
                <li className="flex items-center gap-3">
                  <EnvelopeSimple size={18} weight="duotone" className="text-primary flex-shrink-0" />
                  <a href="mailto:info@bandoviet.com" className="hover:text-primary transition-colors">info@bandoviet.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <ClockClockwise size={18} weight="duotone" className="text-primary flex-shrink-0" />
                  <span>Thứ 2 - Thứ 7: 8:00 - 18:00</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bản quyền */}
          <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p> 2023 Bản Vẽ Chuyên Nghiệp. Tất cả các quyền được bảo lưu.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <a href="#" className="hover:text-foreground transition-colors">Điều khoản sử dụng</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-foreground transition-colors">Chính sách bảo mật</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-foreground transition-colors">Chính sách cookie</a>
            </div>
          </div>
        </div>
      </footer>
          
      
      <BlueprintDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        blueprint={selectedBlueprint}
        onAddToCart={handleAddToCart}
      />
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default App;