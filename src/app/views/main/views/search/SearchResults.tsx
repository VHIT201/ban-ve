// Core
import { useSearchParams } from 'react-router-dom';
import { FileIcon, SearchIcon } from 'lucide-react';

// App
import { useGetApiSearch } from '@/api/endpoints/search';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const query = searchParams.get('q') || '';

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const { data, isLoading, error } = useGetApiSearch(
    { q: query },
    { 
      query: { 
        enabled: !!query,
        refetchOnWindowFocus: false 
      } 
    }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Đang tìm kiếm: {query}</h1>
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tài liệu..."
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <SearchIcon className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Tìm kiếm</h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tài liệu..."
              className="flex-1"
            />
            <Button type="submit">
              <SearchIcon className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
          </form>
        </div>
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          Không thể tải kết quả tìm kiếm. Vui lòng thử lại sau.
        </div>
      </div>
    );
  }

  const results = data?.data || [];

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {query ? `Kết quả tìm kiếm cho: ${query}` : 'Tìm kiếm tài liệu'}
        </h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm tài liệu..."
            className="flex-1"
          />
          <Button type="submit">
            <SearchIcon className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
        </form>
      </div>
      
      {!query ? (
        <div className="text-center py-10">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <SearchIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nhập từ khóa để tìm kiếm</h3>
          <p className="text-muted-foreground">Tìm kiếm tài liệu, bản vẽ, và nhiều hơn nữa...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-10">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <SearchIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Không tìm thấy kết quả</h3>
          <p className="text-muted-foreground mb-4">Không có kết quả nào phù hợp với từ khóa "{query}"</p>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Xóa bộ lọc
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {results.map((item) => (
            <Card key={item._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <FileIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title || 'Không có tiêu đề'}</h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    {item.field && (
                      <div className="mt-2">
                        <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                          {item.field}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
