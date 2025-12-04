import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Search, Download, Filter, ArrowUpDown, Eye, Trash2, Pencil, FileDown, Plus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { EditDrawingForm } from "./components/EditDrawingForm";
import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog";

type Drawing = {
  id: string;
  name: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  price: number;
  status: 'published' | 'pending' | 'rejected';
  views: number;
  downloads: number;
};

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [alert, setAlert] = useState<{title: string; message: string; type: 'success' | 'error'} | null>(null);
  const drawings: Drawing[] = [
    {
      id: "1",
      name: "Mặt bằng tầng 1 - Biệt thự Phú Mỹ Hưng",
      fileType: "DWG",
      fileSize: "2.4 MB",
      uploadDate: "02/12/2023",
      price: 1500000,
      status: "published",
      views: 124,
      downloads: 42,
    },
    {
      id: "2",
      name: "Mặt đứng chính - Nhà phố 3 tầng",
      fileType: "PDF",
      fileSize: "1.8 MB",
      uploadDate: "01/12/2023",
      price: 1200000,
      status: "published",
      views: 89,
      downloads: 31,
    },
    {
      id: "3",
      name: "Kết cấu móng - Chung cư cao cấp",
      fileType: "DWG",
      fileSize: "3.2 MB",
      uploadDate: "30/11/2023",
      price: 0,
      status: "pending",
      views: 45,
      downloads: 0,
    },
    {
      id: "4",
      name: "Điện nước - Biệt thự 2 tầng",
      fileType: "DWG",
      fileSize: "1.5 MB",
      uploadDate: "28/11/2023",
      price: 0,
      status: "rejected",
      views: 67,
      downloads: 0,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-600 hover:bg-green-600">Đã đăng</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-500">Chờ duyệt</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="hover:bg-destructive">Từ chối</Badge>;
      default:
        return <Badge variant="outline" className="hover:bg-transparent">Không xác định</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount);
  };

  const handleEdit = (drawing: Drawing) => {
    setSelectedDrawing(drawing);
    setEditDialogOpen(true);
  };

  const handleDelete = (drawing: Drawing) => {
    setSelectedDrawing(drawing);
    setDeleteDialogOpen(true);
  };

  const handleSaveChanges = (values: any) => {
    console.log('Saving changes:', values);
    setAlert({
      title: "Thành công",
      message: "Đã cập nhật thông tin bản vẽ",
      type: 'success'
    });
  };

  const confirmDelete = () => {
    if (!selectedDrawing) return;
    console.log('Deleting drawing:', selectedDrawing.id);
    setAlert({
      title: "Đã xóa",
      message: `Đã xóa bản vẽ "${selectedDrawing.name}"`,
      type: 'error'
    });
    
    setDeleteDialogOpen(false);
    setSelectedDrawing(null);
  };

  const filteredDrawings = drawings.filter(drawing => 
    drawing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Bản vẽ đã tải lên</h1>
          <p className="text-sm text-muted-foreground">
            Xem và quản lý các bản vẽ bạn đã tải lên
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/collaborator/upload">
            <Button className="gap-1 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              <span>Thêm mới</span>
            </Button>
          </Link>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm bản vẽ..."
              className="w-full pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Xuất Excel
                </span>
              </Button>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Bộ lọc
                </span>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center">
                        Tên bản vẽ
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Loại file</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Kích thước</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Ngày tải lên</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Giá</th>
                    <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">Trạng thái</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Hành động</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredDrawings.length > 0 ? (
                    filteredDrawings.map((drawing) => (
                      <tr key={drawing.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                            <div className="truncate max-w-xs">
                              <div className="font-medium">{drawing.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {drawing.views} lượt xem • {drawing.downloads} lượt tải
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant="outline">{drawing.fileType}</Badge>
                        </td>
                        <td className="p-4 align-middle text-sm text-muted-foreground">
                          {drawing.fileSize}
                        </td>
                        <td className="p-4 align-middle text-sm text-muted-foreground">
                          {drawing.uploadDate}
                        </td>
                        <td className="p-4 align-middle text-right font-medium">
                          {drawing.price > 0 ? formatCurrency(drawing.price) : 'Miễn phí'}
                        </td>
                        <td className="p-4 align-middle text-center">
                          {getStatusBadge(drawing.status)}
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Tùy chọn</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Xem chi tiết</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(drawing)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  <span>Chỉnh sửa</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDelete(drawing)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Xóa</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Không tìm thấy bản vẽ</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Không có bản vẽ nào phù hợp với từ khóa tìm kiếm của bạn.
                        </p>
                        <Button variant="outline" onClick={() => setSearchTerm('')}>
                          Xóa bộ lọc
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div>Hiển thị 1 đến {filteredDrawings.length} trong tổng số {drawings.length} bản ghi</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Trước
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Tiếp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedDrawing && (
        <EditDrawingForm
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          drawing={selectedDrawing}
          onSave={handleSaveChanges}
        />
      )}

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        itemName={selectedDrawing?.name || 'bản vẽ'}
      />

      {alert && (
        <div className="fixed bottom-4 right-4 z-50 w-80">
          <Alert variant={alert.type === 'success' ? 'default' : 'destructive'}>
            {alert.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        </div>
      )}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bản vẽ "{selectedDrawing?.name}"? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Xác nhận xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
