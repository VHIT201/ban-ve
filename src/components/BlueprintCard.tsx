import { Blueprint } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Bed, Bathtub, ArrowsOut } from '@phosphor-icons/react';

interface BlueprintCardProps {
  blueprint: Blueprint;
  onViewDetails: (blueprint: Blueprint) => void;
  onAddToCart: (blueprint: Blueprint) => void;
}

export function BlueprintCard({ blueprint, onViewDetails, onAddToCart }: BlueprintCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
            {blueprint.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {blueprint.description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ArrowsOut size={16} weight="bold" />
            <span>{blueprint.dimensions}</span>
          </div>
          {blueprint.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed size={16} weight="bold" />
              <span>{blueprint.bedrooms}</span>
            </div>
          )}
          {blueprint.bathrooms && (
            <div className="flex items-center gap-1">
              <Bathtub size={16} weight="bold" />
              <span>{blueprint.bathrooms}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-2xl font-bold text-primary tabular-nums">
            ${blueprint.price}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(blueprint)}
            >
              Details
            </Button>
            <Button
              size="sm"
              onClick={() => onAddToCart(blueprint)}
              className="gap-2"
            >
              <ShoppingCart size={16} weight="bold" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
