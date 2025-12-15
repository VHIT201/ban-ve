import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, X, FileIcon, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type UploadStatus = "idle" | "success" | "error";

interface UploadFormData {
  drawingName: string;
  price: string;
  description: string;
  notes: string;
  category: string;
  file: File | null;
}

export default function UploadPage() {
  const [formData, setFormData] = useState<UploadFormData>({
    drawingName: "",
    price: "",
    description: "",
    notes: "",
    category: "",
    file: null
  });

  const categories = [
    { id: "architecture", name: "Kiến trúc" },
    { id: "interior", name: "Nội thất" },
    { id: "structure", name: "Kết cấu" },
    { id: "mep", name: "Điện nước" },
    { id: "landscape", name: "Cảnh quan" },
    { id: "furniture", name: "Đồ nội thất" },
    { id: "other", name: "Khác" }
  ];
  
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        file,
        drawingName: file.name.replace(/\.[^/.]+$/, "")
      }));
    }
  };

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
    e.preventDefault();
    setIsDragging(isOver);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file,
        drawingName: file.name.replace(/\.[^/.]+$/, "")
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      drawingName: "",
      price: "",
      description: "",
      notes: "",
      category: "",
      file: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return new Intl.NumberFormat('vi-VN').format(Number(numericValue));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    setFormData(prev => ({
      ...prev,
      price: numericValue
    }));
  };

  const handleUpload = async () => {
    if (!formData.file) {
      toast.error("Lỗi", {
        description: "Vui lòng chọn file bản vẽ trước khi tải lên.",
      });
      return;
    }

    if (!formData.drawingName.trim()) {
      toast.error("Lỗi", {
        description: "Vui lòng nhập tên bản vẽ.",
      });
      return;
    }

    if (!formData.category) {
      toast.error("Lỗi", {
        description: "Vui lòng chọn danh mục.",
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");

    try {
      let fileToUpload = formData.file;
      
      // Kiểm tra nếu là file ảnh thì thêm watermark
      if (formData.file.type.startsWith('image/')) {
        try {
          const { addWatermarkToImage } = await import('@/utils/watermark');
          fileToUpload = await addWatermarkToImage(
            formData.file,
            `Bản quyền thuộc về ${formData.drawingName}`
          );
        } catch (error) {
          console.error('Lỗi khi thêm watermark:', error);
          // Nếu có lỗi khi thêm watermark, vẫn tiếp tục upload file gốc
          toast.warning('Không thể thêm watermark, đang tải lên ảnh gốc');
        }
      }

      const formDataToSend = new FormData();
      formDataToSend.append('file', fileToUpload);
      formDataToSend.append('drawingName', formData.drawingName);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('notes', formData.notes);
      formDataToSend.append('category', formData.category);
      
      // Gọi API upload file lên server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (!response.ok) {
        throw new Error('Lỗi khi tải file lên server');
      }
      
      const result = await response.json();
      
      setUploadStatus("success");
      toast.success("Tải lên thành công", {
        description: `Bản vẽ "${formData.drawingName}" đã được tải lên.`,
      });
      
      resetForm();
    } catch (error) {
      setUploadStatus("error");
      toast.error("Lỗi khi tải lên", {
        description: "Đã xảy ra lỗi khi tải bản vẽ lên. Vui lòng thử lại.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tải lên bản vẽ</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tải lên bản vẽ mới lên hệ thống
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin bản vẽ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="drawingName">Tên bản vẽ</Label>
              <Input
                id="drawingName"
                name="drawingName"
                value={formData.drawingName}
                onChange={handleInputChange}
                placeholder="Nhập tên bản vẽ"
              />
            </div>

            <div className="space-y-2">
              <Label>Danh mục</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Giá tiền (VNĐ)</Label>
              <div className="relative">
                <Input
                  id="price"
                  name="price"
                  value={formData.price ? formatCurrency(formData.price) : ''}
                  onChange={handlePriceChange}
                  placeholder="Nhập giá tiền"
                  className="pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₫
                </span>
              </div>
            </div>

<div className="space-y-2">
              <Label>Chọn file bản vẽ</Label>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                  isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                  "hover:border-primary/50"
                )}
                onDragOver={(e) => handleDragEvents(e, true)}
                onDragLeave={(e) => handleDragEvents(e, false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.dwg,.dxf,.rvt"
                />
                
                {formData.file ? (
                  <div className="space-y-2">
                    <FileIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="font-medium">{formData.file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        resetForm();
                      }}
                    >
                      <X className="h-4 w-4 mr-1" /> Xóa
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="font-medium">Kéo thả tệp vào đây hoặc nhấn để chọn</p>
                    <p className="text-sm text-muted-foreground">
                      Hỗ trợ: PDF, DWG, DXF, RVT (Tối đa 50MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Nhập mô tả bản vẽ"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Ghi chú</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Nhập ghi chú (nếu có)"
                rows={2}
              />
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full sm:w-auto"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang tải lên...
                  </>
                ) : uploadStatus === "success" ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Đã tải lên
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Tải lên bản vẽ
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
