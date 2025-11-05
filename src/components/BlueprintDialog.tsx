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
import { ShoppingCart, Bed, Bathtub, ArrowsOut, Ruler, ChatCircle, Star } from '@phosphor-icons/react';
import { CommentSection } from './comments/CommentSection';

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
              <DialogTitle className="text-2xl mb-1">{blueprint.title}</DialogTitle>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{blueprint.category}</Badge>
                {blueprint.rating ? (
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const rating = blueprint.rating!.average;
                        const isHalfStar = rating >= star - 0.5 && rating < star;
                        const isFullStar = rating >= star;
                        
                        return (
                          <div key={star} className="relative w-4 h-4">
                            <Star 
                              size={16} 
                              className="absolute text-gray-300" 
                              weight="regular"
                            />
                            {isFullStar ? (
                              <Star 
                                size={16} 
                                className="absolute text-yellow-400" 
                                weight="fill"
                              />
                            ) : isHalfStar ? (
                              <div className="absolute w-1/2 h-full overflow-hidden">
                                <Star 
                                  size={16} 
                                  className="text-yellow-400" 
                                  weight="fill"
                                />
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                      <span className="ml-1.5 text-sm font-medium text-foreground/90">
                        {blueprint.rating.average.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      • {blueprint.rating.count} đánh giá
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Star size={16} className="text-gray-300" weight="regular" />
                    <span className="text-sm">Chưa có đánh giá</span>
                  </div>
                )}
              </div>
            </div>
            <span className="text-3xl font-bold text-primary tabular-nums">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(blueprint.price)}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6 cursor-default">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted cursor-default">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 cursor-default">
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
              <p className="text-3xl font-bold text-primary tabular-nums">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(blueprint.price)}
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <Button 
                size="lg" 
                className="gap-2 cursor-pointer"
                onClick={() => onAddToCart(blueprint)}
              >
                <ShoppingCart size={20} weight="bold" />
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>

          {/* Phần bình luận */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <ChatCircle size={24} className="text-primary" weight="fill" />
              <h3 className="text-xl font-semibold">Thảo luận về bản vẽ</h3>
            </div>
            <CommentSection blueprintId={blueprint.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
