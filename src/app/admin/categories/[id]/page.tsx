"use client";

import dynamic from "next/dynamic";

const CategoryDetail = dynamic(
  () => import("../../views/categories/components/category-detail"),
  { ssr: false },
);

export default CategoryDetail;
