import { Blueprint } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Bed, Bathtub, ArrowsOut, Ruler } from '@phosphor-icons/react';

interface BlueprintDialogProps {
  blueprint: Blueprint | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (blueprint: Blueprint) => void;
}

export function BlueprintDialog({ blueprint, open, onOpenChange, onAddToCart }: BlueprintDialogProps) {
  if (!blueprint) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl mb-2">{blueprint.title}</DialogTitle>
              <Badge variant="secondary">{blueprint.category}</Badge>
            </div>
            <span className="text-3xl font-bold text-primary tabular-nums">
              ${blueprint.price}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <img
              src={blueprint.imageUrl}
              alt={blueprint.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {blueprint.description}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
                <ArrowsOut size={24} weight="bold" className="text-primary" />
                <div className="text-center">
                  <div className="font-semibold">{blueprint.dimensions}</div>
                  <div className="text-xs text-muted-foreground">Dimensions</div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
                <Ruler size={24} weight="bold" className="text-primary" />
                <div className="text-center">
                  <div className="font-semibold">{blueprint.sqft.toLocaleString()} sq ft</div>
                  <div className="text-xs text-muted-foreground">Square Feet</div>
                </div>
              </div>

              {blueprint.bedrooms && (
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
                  <Bed size={24} weight="bold" className="text-primary" />
                  <div className="text-center">
                    <div className="font-semibold">{blueprint.bedrooms}</div>
                    <div className="text-xs text-muted-foreground">Bedrooms</div>
                  </div>
                </div>
              )}

              {blueprint.bathrooms && (
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
                  <Bathtub size={24} weight="bold" className="text-primary" />
                  <div className="text-center">
                    <div className="font-semibold">{blueprint.bathrooms}</div>
                    <div className="text-xs text-muted-foreground">Bathrooms</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Price</p>
              <p className="text-3xl font-bold text-primary tabular-nums">${blueprint.price}</p>
            </div>
            <Button
              size="lg"
              onClick={() => {
                onAddToCart(blueprint);
                onOpenChange(false);
              }}
              className="gap-2"
            >
              <ShoppingCart size={20} weight="bold" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
