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
import { ShoppingCart, Bed, Bathtub, ArrowsOut, Ruler, ChatCircle, Star, Flag, ShareNetwork } from '@phosphor-icons/react';
import { CommentSection } from './comments/CommentSection';
import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';

interface BlueprintDialogProps {
  blueprint: Blueprint | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (blueprint: Blueprint) => void;
}

export function BlueprintDialog({ blueprint, open, onOpenChange, onAddToCart }: BlueprintDialogProps) {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [attachments, setAttachments] = useState<{file: File; preview: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Clean up object URLs on unmount or when attachments change
  useEffect(() => {
    return () => {
      attachments.forEach(attachment => URL.revokeObjectURL(attachment.preview));
    };
  }, [attachments]);
  
  if (!blueprint) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newAttachments = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    URL.revokeObjectURL(attachments[index].preview);
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleReportViolation = () => {
    // In a real app, you would send this data to the server
    const formData = new FormData();
    formData.append('reason', reportReason);
    formData.append('blueprintId', blueprint.id);
    attachments.forEach((attachment, index) => {
      formData.append(`attachments`, attachment.file);
    });

    console.log('Submitting report with data:', {
      blueprintId: blueprint.id,
      reason: reportReason,
      attachments: attachments.map(f => f.file.name)
    });
    
    // Show success message
    alert('Đã gửi báo cáo vi phạm bản quyền thành công! Chúng tôi sẽ xem xét báo cáo của bạn.');
    
    // Close dialog and reset form
    setShowReportDialog(false);
    setReportReason('');
    setAttachments([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl">{blueprint.title}</DialogTitle>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (navigator.share) {
                        navigator.share({
                          title: blueprint.title,
                          text: `Xem bản vẽ "${blueprint.title}" trên Bản Vẽ`,
                          url: window.location.href,
                        }).catch(console.error);
                      } else {
                        // Fallback for browsers that don't support Web Share API
                        navigator.clipboard.writeText(window.location.href);
                        alert('Đã sao chép liên kết vào clipboard!');
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
                    title="Chia sẻ bản vẽ"
                  >
                    <ShareNetwork size={16} weight="fill" />
                    <span>Chia sẻ</span>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowReportDialog(true);
                    }}
                    className="text-muted-foreground hover:text-destructive flex items-center gap-1 text-sm px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
                    title="Báo cáo vi phạm bản quyền"
                  >
                    <Flag size={16} weight="fill" />
                    <span>Báo cáo</span>
                  </button>
                </div>
              </div>
              <div className="mt-1">
                <Badge variant="secondary">{blueprint.category}</Badge>
              </div>
              <span className="text-3xl font-bold text-primary tabular-nums">
                {blueprint && new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(blueprint.price)}
              </span>
            </div>
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
      
      {/* Dialog báo cáo vi phạm bản quyền */}
      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Flag size={20} className="text-destructive" weight="fill" />
              <AlertDialogTitle className="text-lg">Báo cáo vi phạm bản quyền</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-left space-y-3">
              <p>Bạn đang báo cáo bản vẽ: <span className="font-medium">{blueprint?.title}</span></p>
              <p>Vui lòng mô tả chi tiết lý do báo cáo để chúng tôi có thể xử lý kịp thời.</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="report-reason" className="text-sm font-medium leading-none">
                    Lý do báo cáo <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="report-reason"
                    placeholder="Mô tả chi tiết vi phạm bản quyền..."
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Hình ảnh đính kèm (tối đa 5 ảnh)
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={attachment.preview}
                          alt={`Đính kèm ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Xóa ảnh"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                    
                    {attachments.length < 5 && (
                      <label 
                        className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                        title="Thêm ảnh"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-muted-foreground">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span className="text-xs text-muted-foreground mt-1">Thêm ảnh</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {attachments.length}/5 ảnh đã chọn. Kích thước tối đa: 5MB/ảnh
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-between gap-2">
            <AlertDialogCancel className="mt-0">Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReportViolation}
              disabled={!reportReason.trim()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-6"
            >
              Gửi báo cáo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
