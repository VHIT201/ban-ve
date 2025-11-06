import { useState } from 'react';
import { Package, CheckCircle, Clock, DollarSign, Download, FileText, Image as ImageIcon, FileArchive, FileVideo, FileAudio, File, Users, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SoldFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'archive' | 'video' | 'audio' | 'other';
  size: string;
  soldDate: string;
  price: number;
  status: 'completed' | 'pending' | 'cancelled';
  downloadCount: number;
  buyerEmail: string;
}

interface SoldFilesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getFileIcon = (type: string) => {
  const iconProps = { className: 'h-5 w-5' };
  
  switch (type) {
    case 'document':
      return <FileText {...iconProps} className={`${iconProps.className} text-blue-500`} />;
    case 'image':
      return <ImageIcon {...iconProps} className={`${iconProps.className} text-green-500`} />;
    case 'archive':
      return <FileArchive {...iconProps} className={`${iconProps.className} text-amber-500`} />;
    case 'video':
      return <FileVideo {...iconProps} className={`${iconProps.className} text-purple-500`} />;
    case 'audio':
      return <FileAudio {...iconProps} className={`${iconProps.className} text-pink-500`} />;
    default:
      return <File {...iconProps} className={`${iconProps.className} text-gray-500`} />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return (
        <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
          Đã bán
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">
          <Clock className="h-3 w-3 mr-1 text-amber-500" />
          Chờ xử lý
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">
          <XCircle className="h-3 w-3 mr-1 text-red-500" />
          Đã hủy
        </Badge>
      );
    default:
      return null;
  }
};

export function SoldFilesDialog({ open, onOpenChange }: SoldFilesDialogProps) {
  // Mock data - in a real app, this would come from an API
  const soldFiles: SoldFile[] = [
    {
      id: '1',
      name: 'Mẫu thiết kế nhà phố 2 tầng.pdf',
      type: 'document',
      size: '24.5 MB',
      soldDate: '05/11/2023',
      price: 199000,
      status: 'completed',
      downloadCount: 3,
      buyerEmail: 'khachhang1@example.com'
    },
    {
      id: '2',
      name: 'Thư viện nội thất cao cấp.skp',
      type: 'archive',
      size: '156.8 MB',
      soldDate: '03/11/2023',
      price: 299000,
      status: 'completed',
      downloadCount: 1,
      buyerEmail: 'khachhang2@example.com'
    },
    {
      id: '3',
      name: 'Hướng dẫn thiết kế nội thất.docx',
      type: 'document',
      size: '8.2 MB',
      soldDate: '01/11/2023',
      price: 99000,
      status: 'pending',
      downloadCount: 0,
      buyerEmail: 'khachhang3@example.com'
    }
  ];

  const totalEarnings = soldFiles
    .filter(file => file.status === 'completed')
    .reduce((sum, file) => sum + file.price, 0);

  const completedSales = soldFiles.filter(file => file.status === 'completed').length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl w-[95vw] h-[90vh] max-h-[90vh] flex flex-col p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span>File đã bán</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 mb-8 md:grid-cols-3">
          {/* Tổng doanh thu */}
          <div className="bg-gradient-to-br from-green-50 to-green-50/80 p-4 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-green-700">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalEarnings)}
                </p>
                <p className="text-xs text-green-500 mt-1">+12.5% so với tháng trước</p>
              </div>
              <div className="p-2 bg-white/50 rounded-lg border border-green-100">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>

          {/* Tổng số file đã bán */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-50/80 p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">File đã bán</p>
                <p className="text-2xl font-bold text-blue-700">{completedSales}</p>
                <p className="text-xs text-blue-500 mt-1">+3 file mới hôm nay</p>
              </div>
              <div className="p-2 bg-white/50 rounded-lg border border-blue-100">
                <Package className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Tổng số lần tải */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-50/80 p-4 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Lượt tải</p>
                <p className="text-2xl font-bold text-purple-700">
                  {soldFiles.reduce((sum, file) => sum + file.downloadCount, 0)}
                </p>
                <p className="text-xs text-purple-500 mt-1">+5 lượt hôm nay</p>
              </div>
              <div className="p-2 bg-white/50 rounded-lg border border-purple-100">
                <Download className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="flex-1 flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-3 bg-muted/20 rounded-lg">
            <TabsList className="w-full sm:w-auto grid grid-cols-3 gap-1">
              <TabsTrigger value="all" className="py-2 px-4 text-sm">Tất cả</TabsTrigger>
              <TabsTrigger value="completed" className="py-2 px-4 text-sm">Đã bán</TabsTrigger>
              <TabsTrigger value="pending" className="py-2 px-4 text-sm">Chờ xử lý</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground bg-background px-4 py-2 rounded-md border w-full sm:w-auto text-center sm:text-left">
              📊 Tổng cộng: <span className="font-medium text-foreground">{soldFiles.length} file</span>
            </div>
          </div>

          <TabsContent value="all" className="flex-1 overflow-auto">
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <colgroup>
                  <col className="w-2/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                </colgroup>
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      <div className="flex items-center">
                        <span>Tên file</span>
                      </div>
                    </th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Người mua</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngày bán</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Giá</th>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Lượt tải</th>
                      <th scope="col" className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {soldFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3.5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                                {getFileIcon(file.type)}
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">{file.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{file.size}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-400" />
                            {file.buyerEmail}
                          </div>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.soldDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(file.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Download className="h-4 w-4 mr-1 text-gray-400" />
                          {file.downloadCount}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        {getStatusBadge(file.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </TabsContent>
          
          <TabsContent value="completed" className="flex-1 overflow-auto">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <colgroup>
                  <col className="w-2/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                </colgroup>
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên file</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người mua</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày bán</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt tải</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {soldFiles
                    .filter(file => file.status === 'completed')
                    .map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3.5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                              {getFileIcon(file.type)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              <div className="text-sm text-gray-500">{file.size}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.buyerEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.soldDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(file.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Download className="h-4 w-4 mr-1 text-gray-400" />
                            {file.downloadCount}
                          </div>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </TabsContent>

          <TabsContent value="pending" className="flex-1 overflow-auto">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <colgroup>
                  <col className="w-2/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                  <col className="w-1/6" />
                </colgroup>
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên file</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người mua</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt hàng</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {soldFiles
                    .filter(file => file.status === 'pending')
                    .map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3.5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                              {getFileIcon(file.type)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              <div className="text-sm text-gray-500">{file.size}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.buyerEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.soldDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(file.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="h-8">
                              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                              Xác nhận
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 text-destructive">
                              <XCircle className="h-4 w-4 mr-1" />
                              Từ chối
                            </Button>
                          </div>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
