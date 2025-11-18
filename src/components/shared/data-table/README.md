# DataTable - Compound Component Pattern

## Cách sử dụng

### 1. Default Usage (Backward Compatible)

```tsx
import DataTable from "@/components/shared/data-table/DataTable";

<DataTable
  columns={columns}
  data={data}
  enablePagination
  enableRowSelection
  manualPagination
  rowCount={totalRows}
  state={{ pagination: { pageIndex: 1, pageSize: 10 } }}
  onPaginationChange={handlePaginationChange}
/>;
```

### 2. Compound Pattern (Flexible & Customizable)

```tsx
import DataTable from "@/components/shared/data-table/DataTable";

<DataTable.Root
  columns={columns}
  data={data}
  enablePagination
  enableRowSelection
  manualPagination
  rowCount={totalRows}
  state={{ pagination: { pageIndex: 1, pageSize: 10 } }}
  onPaginationChange={handlePaginationChange}
>
  {/* Custom header/filters */}
  <div className="mb-4">
    <SearchBar />
    <FilterButtons />
  </div>

  {/* Table content */}
  <DataTable.Content />

  {/* Custom content between table and pagination */}
  <div className="my-4">
    <BulkActions />
  </div>

  {/* Pagination */}
  <DataTable.Pagination />
</DataTable.Root>;
```

### 3. Custom Layout Example

```tsx
<DataTable.Root {...props}>
  <Card>
    <CardHeader>
      <CardTitle>Users List</CardTitle>
      <SearchInput />
    </CardHeader>
    <CardContent>
      <DataTable.Content />
    </CardContent>
    <CardFooter>
      <DataTable.Pagination />
    </CardFooter>
  </Card>
</DataTable.Root>
```

## Components

### DataTable (Default Export)

- Backward compatible default export
- Renders Root + Content + Pagination automatically

### DataTable.Root

- Main wrapper component
- Provides table context to children
- Handles all state management

### DataTable.Content

- Renders table with headers and rows
- Automatically includes row selection if enabled

### DataTable.Pagination

- Renders pagination controls
- Only shows if enablePagination and manualPagination are true

## Benefits

✅ **Flexibility**: Insert custom components anywhere
✅ **Backward Compatible**: Existing code still works
✅ **Better Composition**: Build custom layouts easily
✅ **Clean API**: Each component has single responsibility
✅ **Type Safe**: Full TypeScript support
