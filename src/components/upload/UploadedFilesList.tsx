import { useAuth } from '@/contexts/AuthContext';
import { FileText, Download, Trash2, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type UploadedFile = {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
};

export function UploadedFilesList() {
  const { user } = useAuth();
  
  // Mock data - trong thực tế sẽ lấy từ API
  const uploadedFiles: UploadedFile[] = [
    {
      id: '1',
      name: 'Ban-ve-nha-pho-2-tang.dwg',
      size: '2.4 MB',
      type: 'DWG',
      uploadedAt: '2023-11-01',
      status: 'approved'
    },
    {
      id: '2',
      name: 'Thiet-ke-noi-that.skp',
      size: '5.1 MB',
      type: 'SKP',
      uploadedAt: '2023-11-02',
      status: 'pending'
    },
  ];

  if (user?.role !== 'collaborator') {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <Trash2 className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'pending':
        return 'Chờ duyệt';
      case 'rejected':
        return 'Từ chối';
      default:
        return '';
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Các file đã tải lên</CardTitle>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Chưa có file nào được tải lên
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên file</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Kích thước</TableHead>
                <TableHead>Ngày tải lên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="truncate max-w-[200px]">{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="uppercase">{file.type}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.uploadedAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(file.status)}
                      <span>{getStatusText(file.status)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
