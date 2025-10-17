import { useState, useMemo } from 'react';
import { useKV } from '@github/spark/hooks';
import { Blueprint, CartItem, Category } from '@/lib/types';
import { blueprints, categories } from '@/lib/data';
import { BlueprintCard } from '@/components/BlueprintCard';
import { BlueprintDialog } from '@/components/BlueprintDialog';
import { ShoppingCart } from '@/components/ShoppingCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Toaster, toast } from 'sonner';
import { MagnifyingGlass, Ruler } from '@phosphor-icons/react';

function App() {
  const [cart, setCart] = useKV<CartItem[]>('blueprint-cart', []);
  const cartItems = cart ?? [];
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

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

  const handleAddToCart = (blueprint: Blueprint) => {
    setCart((currentCart) => {
      const cartItems = currentCart || [];
      const existingItem = cartItems.find(item => item.blueprint.id === blueprint.id);
      
      if (existingItem) {
        toast.success('Updated cart', {
          description: `Increased quantity of ${blueprint.title}`,
        });
        return cartItems.map(item =>
          item.blueprint.id === blueprint.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success('Added to cart', {
          description: blueprint.title,
        });
        return [...cartItems, { blueprint, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (blueprintId: string, quantity: number) => {
    setCart((currentCart) => {
      const cartItems = currentCart || [];
      return cartItems.map(item =>
        item.blueprint.id === blueprintId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const handleRemoveItem = (blueprintId: string) => {
    setCart((currentCart) => {
      const cartItems = currentCart || [];
      return cartItems.filter(item => item.blueprint.id !== blueprintId);
    });
    toast.info('Removed from cart');
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.blueprint.price * item.quantity, 0);
    toast.success('Order placed!', {
      description: `Your order of $${total} has been processed. You'll receive your blueprints via email.`,
    });
    setCart([]);
  };

  const handleViewDetails = (blueprint: Blueprint) => {
    setSelectedBlueprint(blueprint);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                <Ruler size={24} weight="bold" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Blueprint Marketplace</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Premium Architectural Drawings</p>
              </div>
            </div>
            <ShoppingCart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Professional Blueprint Collection
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover expertly crafted architectural plans for your next project
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <MagnifyingGlass
                size={20}
                weight="bold"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="text"
                placeholder="Search blueprints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {filteredBlueprints.length === 0 ? (
          <div className="text-center py-16">
            <Ruler size={64} weight="thin" className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No blueprints found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredBlueprints.length}</span>{' '}
                {filteredBlueprints.length === 1 ? 'blueprint' : 'blueprints'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBlueprints.map((blueprint) => (
                <BlueprintCard
                  key={blueprint.id}
                  blueprint={blueprint}
                  onViewDetails={handleViewDetails}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Blueprint Marketplace. Premium architectural drawings for professionals.</p>
          </div>
        </div>
      </footer>

      <BlueprintDialog
        blueprint={selectedBlueprint}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;