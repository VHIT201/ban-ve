// App
import { Category } from "@/api/models";
import { Response } from "@/api/types/base";
import { QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";
import { useGetApiCategories } from "@/api/endpoints/categories";

// Internal
import { CategoryTable } from "./components";

const Categories = () => {
  const getCategoryList = useGetApiCategories({
    query: {
      select: (data) => (data as unknown as Response<Category[]>).responseData,
    },
  }) as UseQueryResult<Category[]>;

  return (
    <QueryBoundary query={getCategoryList}>
      {(categoryList) => (
        <CategoryTable
          data={categoryList}
          isLoading={getCategoryList.isLoading}
        />
      )}
    </QueryBoundary>
  );
};

export default Categories;
