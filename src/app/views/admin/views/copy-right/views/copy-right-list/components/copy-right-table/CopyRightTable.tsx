import { useGetApiReports } from "@/api/endpoints/copyright";
import { GetApiReports200 } from "@/api/models";
import { DataTable, QueryBoundary } from "@/components/shared";
import { UseQueryResult } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import { useColumns } from "./lib/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTableDeleteDialog } from "@/components/shared/data-table/shared";

const CopyRightTable = () => {
  // Hooks
  const navigate = useNavigate();

  // States
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({ pageIndex: 0, pageSize: 10 });

  const getCopyRightListQuery = useGetApiReports(
    {}
  ) as UseQueryResult<GetApiReports200>;

  // Methods
  const handlePaginationChange = (newPagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(newPagination);
  };

  // Columns
  const columns = useColumns({
    onView: (report) => {
      navigate(`detail/${report._id}`);
    },
    onResolve: (report) => {
      // Resolve logic here
    },
  });

  return (
    <Fragment>
      <QueryBoundary query={getCopyRightListQuery}>
        {(copyRightList) => (
          <DataTable
            columns={columns}
            data={copyRightList.data ?? []}
            rowCount={copyRightList.pagination?.total || 0}
            manualPagination
            enablePagination
            state={{ pagination }}
            onPaginationChange={handlePaginationChange}
            classNames={{
              header: "bg-primary/90",
            }}
          >
            <DataTable.Content>
              <DataTable.Header />
              <DataTable.Body />
            </DataTable.Content>

            <DataTable.Pagination />
          </DataTable>
        )}
      </QueryBoundary>
    </Fragment>
  );
};

export default CopyRightTable;
