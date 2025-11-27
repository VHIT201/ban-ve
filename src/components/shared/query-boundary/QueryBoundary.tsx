// Core
import { LoaderCircle } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { HttpStatusCode, isAxiosError } from "axios";

// Internal
import { Props } from "./lib/types";

// Component
const QueryBoundary = <T,>({
  query,
  children,
  additional = {},
  fetchingView = <DefaultLoader />,
  errorView = <DefaultErrorView />,
  forbiddenView = <DefaultForbiddenView />,
  emptyView = null,
}: Props<T>) => {
  const {
    isFetching = false,
    isError = false,
    isSuccess = true,
    error,
  } = additional;

  if (query.isPending || query.isFetching || isFetching) {
    return <>{fetchingView}</>;
  }

  if (query.isError || isError) {
    console.error("Query error:", query.error || error);
    const errors = [query.error, error];
    const axiosError = errors.find((err) => isAxiosError(err));

    if (axiosError?.response?.status === HttpStatusCode.Forbidden) {
      return <>{forbiddenView}</>;
    }

    if (query.isError && typeof errorView === "function") {
      return <>{errorView(query.error || error)}</>;
    }

    return <>{errorView}</>;
  }

  if (query.isSuccess && isSuccess) {
    if (Array.isArray(query.data) && query.data.length === 0 && emptyView) {
      return <Fragment>{emptyView}</Fragment>;
    }

    return children(query.data);
  }

  return null;
};

const DefaultLoader = () => (
  <LoaderCircle className="text-primary mx-auto animate-spin" />
);

const DefaultErrorView = () => (
  <div className="text-primary text-xl flex items-center justify-center">
    Đã xảy ra lỗi trong quá trình xử lí dữ liệu
  </div>
);

const DefaultForbiddenView = () => (
  <div className="text-primary text-xl flex items-center justify-center">
    Bạn không đủ quyền để truy cập dữ liệu này
  </div>
);

export default QueryBoundary;
