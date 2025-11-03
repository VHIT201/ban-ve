import { Blueprint } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Ruler, Cpu, Factory, Lightning, Drop, Robot } from '@phosphor-icons/react';

interface BlueprintCardProps {
  blueprint: Blueprint;
  onViewDetails: (blueprint: Blueprint) => void;
  onAddToCart: (blueprint: Blueprint) => void;
}

const getCategoryIcon = (category: string, size: number) => {
  switch(category) {
    case 'Mechanical': return <Factory size={size} weight="bold" />;
    case 'Electrical': return <Lightning size={size} weight="bold" />;
    case 'Construction': return <Ruler size={size} weight="bold" />;
    case 'HVAC': return <Drop size={size} weight="bold" />;
    case 'Plumbing': return <Drop size={size} weight="bold" />;
    case 'Electronics': return <Cpu size={size} weight="bold" />;
    case 'Robotics': return <Robot size={size} weight="bold" />;
    default: return <Cpu size={size} weight="bold" />;
  }
};

const getCategoryName = (category: string) => {
  const names: Record<string, string> = {
    'Mechanical': 'Cơ khí',
    'Electrical': 'Điện',
    'Construction': 'Xây dựng',
    'HVAC': 'Điều hòa',
    'Plumbing': 'Cấp thoát nước',
    'Electronics': 'Điện tử',
    'Robotics': 'Robot'
  };
  return names[category] || category;
};

export function BlueprintCard({ blueprint, onViewDetails, onAddToCart }: BlueprintCardProps) {
  return (
    <Card 
      className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => onViewDetails(blueprint)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={blueprint.imageUrl}
          alt={blueprint.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-background/90 text-foreground border-border">
          {blueprint.category}
        </Badge>
      </div>
      
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 h-12 flex items-center">
            {blueprint.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[40px]">
            {blueprint.description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md text-xs">
              <Ruler size={12} weight="bold" />
              <span>{blueprint.dimensions}</span>
            </div>
            {blueprint.sqft > 0 && (
              <div className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md text-xs">
                <span>{blueprint.sqft} m²</span>
              </div>
            )}
            <div className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md text-xs">
              {getCategoryIcon(blueprint.category, 12)}
              <span>{getCategoryName(blueprint.category)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <span className="text-xl font-bold text-primary tabular-nums">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(blueprint.price)}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(blueprint);
              }}
              className="gap-1.5 h-8 px-3 text-xs"
            >
              <ShoppingCart size={14} weight="bold" />
              Thêm
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
