import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Folder, Tag, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
};

export function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  
  // Mock data - in a real app, this would come from an API
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Kiến trúc',
      slug: 'kien-truc',
      description: 'Các bản vẽ kiến trúc nhà ở, công trình',
      parentId: null,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    },
    {
      id: '2',
      name: 'Nội thất',
      slug: 'noi-that',
      description: 'Thiết kế nội thất phòng khách, phòng ngủ, nhà bếp',
      parentId: null,
      createdAt: '2023-01-02',
      updatedAt: '2023-01-02',
    },
    {
      id: '3',
      name: 'Nhà phố',
      slug: 'nha-pho',
      description: 'Thiết kế nhà phố hiện đại',
      parentId: '1',
      createdAt: '2023-01-03',
      updatedAt: '2023-01-03',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData, updatedAt: new Date().toISOString() }
          : cat
      ));
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        parentId: formData.parentId || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCategories([...categories, newCategory]);
    }
    
    // Reset form and close dialog
    setFormData({ name: '', slug: '', description: '', parentId: '' });
    setEditingCategory(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      parentId: category.parentId || '',
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter(cat => cat.id !== categoryToDelete));
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const getParentName = (parentId: string | null) => {
    if (!parentId) return 'Không có';
    const parent = categories.find(cat => cat.id === parentId);
    return parent ? parent.name : 'Không xác định';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold tracking-tight flex items-center">
          <Folder className="mr-2 h-6 w-6" />
          Quản lý danh mục
        </h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm danh mục..."
              className="pl-8 w-full sm:w-64"
            />
          </div>
          <Button onClick={() => {
            setEditingCategory(null);
            setFormData({ name: '', slug: '', description: '', parentId: '' });
            setIsDialogOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm mới
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên danh mục</TableHead>
              <TableHead>Đường dẫn</TableHead>
              <TableHead>Danh mục cha</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <code className="bg-muted px-2 py-1 rounded text-xs">
                      /{category.slug}
                    </code>
                  </TableCell>
                  <TableCell>{getParentName(category.parentId)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {category.description || 'Không có mô tả'}
                  </TableCell>
                  <TableCell>
                    {new Date(category.createdAt).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Chỉnh sửa</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteClick(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Xóa</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Chưa có danh mục nào. Hãy thêm danh mục mới.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Category Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
            </DialogTitle>
            <DialogDescription>
              {editingCategory 
                ? 'Cập nhật thông tin danh mục' 
                : 'Điền thông tin để tạo danh mục mới'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Tên danh mục <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên danh mục"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                Đường dẫn <span className="text-destructive">*</span>
              </label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="duong-dan"
                required
              />
              <p className="text-xs text-muted-foreground">
                Đường dẫn sẽ hiển thị dạng: /duong-dan
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="parentId" className="text-sm font-medium">
                Danh mục cha
              </label>
              <select
                id="parentId"
                name="parentId"
                value={formData.parentId}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">-- Chọn danh mục cha --</option>
                {categories
                  .filter(cat => !cat.parentId) // Only show top-level categories as parents
                  .filter(cat => !editingCategory || cat.id !== editingCategory.id) // Don't allow selecting self as parent
                  .map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Mô tả
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Mô tả ngắn về danh mục"
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit">
                {editingCategory ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <DialogTitle className="text-lg font-semibold">Xác nhận xóa</DialogTitle>
            </div>
            <DialogDescription className="pt-2 text-gray-600">
              Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted/50 p-4 rounded-md">
            <div className="flex items-center space-x-3">
              <Folder className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {categoryToDelete && categories.find(c => c.id === categoryToDelete)?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {categoryToDelete && categories.find(c => c.id === categoryToDelete)?.description || 'Không có mô tả'}
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:flex sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setCategoryToDelete(null);
              }}
              className="w-full sm:w-auto"
            >
              Hủy bỏ
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDelete}
              className="w-full sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Xác nhận xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
