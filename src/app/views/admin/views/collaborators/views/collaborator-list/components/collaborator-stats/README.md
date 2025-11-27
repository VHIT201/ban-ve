# Collaborator Stats Component

Component hiển thị thống kê tổng quan về cộng tác viên trong hệ thống.

## Features

### 📊 4 Stat Cards

1. **Tổng cộng tác viên**: Số lượng cộng tác viên + số đang hoạt động
2. **Tổng tài nguyên**: Tổng số tài nguyên từ tất cả cộng tác viên
3. **Tổng thu nhập**: Tổng thu nhập tích lũy (VND)
4. **Hoa hồng TB**: Tỷ lệ hoa hồng trung bình (%)

### 🏆 Top Collaborators Table

- Hiển thị top 5 cộng tác viên có thu nhập cao nhất
- Ranking với badge số thứ tự
- Username + email
- Tổng thu nhập + số lượng tài nguyên
- Hover effect với transition mượt

## Components Structure

```
CollaboratorStats
├── StatCard (4 cards in grid)
│   ├── Icon (Users/Package/DollarSign/TrendingUp)
│   ├── Title (text-sm)
│   ├── Value (text-2xl font-bold)
│   └── Trend (text-xs muted)
│
└── Top Collaborators Card
    └── List Items (max 5)
        ├── Rank Badge (circular, primary)
        ├── User Info (username + email)
        └── Stats (earnings + resources)
```

## API Integration

### Endpoint

```
GET /api/collaborators/stats
```

### Response Type

```typescript
interface GetApiCollaboratorsStats200 {
  data?: CollaboratorStats[];
  summary?: {
    totalCollaborators?: number;
    totalResources?: number;
    totalEarnings?: number;
    averageCommission?: number;
  };
}
```

### Hook Usage

```typescript
const getStatsQuery = useGetApiCollaboratorsStats();
```

## UI/UX Design

### Layout

- **Desktop**: 4-column grid (lg:grid-cols-4)
- **Tablet**: 2-column grid (md:grid-cols-2)
- **Mobile**: 1-column stack

### Design System

- **Cards**: Shadcn/UI Card component
- **Icons**: Lucide React (Users, Package, DollarSign, TrendingUp)
- **Colors**: Muted foreground cho consistency
- **Spacing**: gap-4 cho grid, space-y-3 cho list
- **Typography**:
  - Header: text-lg font-semibold
  - Card title: text-sm font-medium
  - Value: text-2xl font-bold
  - Trend: text-xs text-muted-foreground

### Loading State

- Skeleton UI với CardHeader + CardContent
- 4 skeleton cards trong grid layout
- Responsive như main content

### Empty State

- Top collaborators table tự động ẩn nếu không có data
- Stat cards hiển thị 0 nếu không có data

## Currency Formatting

Sử dụng Intl.NumberFormat với locale Việt Nam:

```typescript
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
```

Output: `1.234.567₫`

## Usage Example

```tsx
import CollaboratorStats from "./components/collaborator-stats/CollaboratorStats";

const CollaboratorListPage = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <CollaboratorStats />

      {/* Collaborator Table */}
      <CollaboratorTable />
    </div>
  );
};
```

## Props

Component không nhận props, tự động fetch data qua React Query.

## Error Handling

QueryBoundary wrapper xử lý:

- Loading state → Skeleton UI
- Error state → Error message
- Success state → Render stats

## Responsive Behavior

| Breakpoint          | Columns | Gap  |
| ------------------- | ------- | ---- |
| Mobile (<768px)     | 1       | 16px |
| Tablet (768-1024px) | 2       | 16px |
| Desktop (>1024px)   | 4       | 16px |

## Accessibility

- ✅ Semantic HTML với Card components
- ✅ Icon có aria-label implicit từ Lucide
- ✅ Color contrast đạt WCAG AA
- ✅ Keyboard navigation support

## Performance

- React Query caching (staleTime default)
- Memoization không cần (component nhỏ, render nhanh)
- Lazy loading cho top collaborators list

## Testing Checklist

- [ ] Stats cards hiển thị đúng data từ API
- [ ] Currency format Việt Nam (1.234.567₫)
- [ ] Top 5 collaborators sort theo totalEarnings
- [ ] Skeleton loading state
- [ ] Empty state khi data = []
- [ ] Error boundary khi API fail
- [ ] Responsive grid (1/2/4 columns)
- [ ] Hover effect trên list items
- [ ] Rank badge (1-5) hiển thị đúng
- [ ] Trend text mô tả phù hợp
