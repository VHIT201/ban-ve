"use client";

import { DataTable, QueryBoundary, DeleteDialog } from "@/components/shared";
import {
  DataTableDeleteDialog,
  DataTableSkeleton,
  DataTableBulkActions,
} from "@/components/shared/data-table/shared";
import {
  useGetApiContacts,
  getGetApiContactsQueryKey,
  useDeleteApiContactsId,
  usePatchApiContactsIdRead,
} from "@/api/endpoints/contacts";
import { ResponseData } from "@/api/types/base";
import { UseQueryResult } from "@tanstack/react-query";
import { useState, useEffect, Fragment } from "react";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/error";
import { useRouter } from "next/navigation";

// Internal
import { useContactTableColumns, useBulkActions } from "./lib/hooks";
import { Contact, ContactTableRow } from "./lib/types";

const ContactTable = () => {
  // Hooks
  const router = useRouter();

  // States
  const [selectedRows, setSelectedRows] = useState<ContactTableRow[]>([]);
  const [deleteSelectRow, setDeleteSelectRow] =
    useState<ContactTableRow | null>(null);
  const [openDeleteMultiDialog, setOpenDeleteMultiDialog] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Queries
  const getContactListQuery = useGetApiContacts(
    {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    },
    {
      query: {
        select: (data) => {
          const response = data as unknown as ResponseData<{
            contacts: Contact[];
            total: number;
            page: number;
            limit: number;
            totalPages: number;
          }>;
          return response;
        },
      },
    },
  ) as UseQueryResult<
    ResponseData<{
      contacts: Contact[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>
  >;

  // Mutations
  const deleteMutation = useDeleteApiContactsId<ResponseData<any>>({
    mutation: {
      meta: {
        invalidateQueries: [getGetApiContactsQueryKey()],
      },
    },
  });

  const markAsReadMutation = usePatchApiContactsIdRead({
    mutation: {
      meta: {
        invalidateQueries: [getGetApiContactsQueryKey()],
      },
    },
  });

  // Auto-adjust pagination when data changes
  useEffect(() => {
    const total = getContactListQuery.data?.data?.total ?? 0;
    const maxPageIndex = Math.max(
      0,
      Math.ceil(total / pagination.pageSize) - 1,
    );
    if (pagination.pageIndex > maxPageIndex && total > 0) {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [getContactListQuery.data, pagination.pageIndex, pagination.pageSize]);

  // Handlers
  const handleDelete = (contact: ContactTableRow) => {
    setDeleteSelectRow(contact);
  };

  const handleMarkAsRead = async (contact: ContactTableRow) => {
    if (!contact._id) return;

    try {
      await markAsReadMutation.mutateAsync({
        id: contact._id,
        data: { is_read: true },
      });
      toast.success("Đã đánh dấu là đã đọc");
    } catch (error) {
      toast.error(extractErrorMessage(error) || "Có lỗi xảy ra");
    }
  };

  const handleViewDetails = (contact: ContactTableRow) => {
    if (!contact._id) return;
    router.push(`/admin/contacts/${contact._id}`);
  };

  const handleDeleteContact = async () => {
    if (!deleteSelectRow && selectedRows.length === 0) return;

    try {
      if (deleteSelectRow) {
        await deleteMutation.mutateAsync({
          id: deleteSelectRow._id!,
        });
        toast.success("Đã xóa liên hệ thành công");
        setDeleteSelectRow(null);
      } else {
        const selectedIds = selectedRows.map((row) => row._id!).filter(Boolean);
        await deleteMutation.mutateAsync({
          id: selectedIds.join(","),
        });
        toast.success(`Đã xóa ${selectedRows.length} liên hệ`);
        setSelectedRows([]);
        setOpenDeleteMultiDialog(false);
      }
    } catch (error) {
      toast.error(extractErrorMessage(error) || "Có lỗi xảy ra khi xóa");
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một liên hệ");
      return;
    }
    setOpenDeleteMultiDialog(true);
  };

  const handleMarkAllAsRead = async () => {
    if (selectedRows.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một liên hệ");
      return;
    }

    try {
      const unreadContacts = selectedRows.filter((c) => !c.is_read);

      if (unreadContacts.length === 0) {
        toast.info("Tất cả liên hệ đã được đánh dấu là đã đọc");
        return;
      }

      await Promise.all(
        unreadContacts.map((contact) =>
          markAsReadMutation.mutateAsync({
            id: contact._id!,
            data: { is_read: true },
          }),
        ),
      );

      toast.success(`Đã đánh dấu ${unreadContacts.length} liên hệ là đã đọc`);
      setSelectedRows([]);
    } catch (error) {
      toast.error(extractErrorMessage(error) || "Có lỗi xảy ra");
    }
  };

  const handlePaginationChange = (newPagination: typeof pagination) => {
    setPagination(newPagination);
  };

  // Columns & Actions
  const columns = useContactTableColumns({
    onDelete: handleDelete,
    onMarkAsRead: handleMarkAsRead,
    onViewDetails: handleViewDetails,
  });

  const bulkActions = useBulkActions({
    onDeleteSelected: handleDeleteSelected,
    onMarkAllAsRead: handleMarkAllAsRead,
  });

  return (
    <Fragment>
      <QueryBoundary
        query={getContactListQuery}
        fetchingView={
          <DataTableSkeleton
            enableRowSelection
            columns={columns.length}
            rows={5}
          />
        }
      >
        {(responseData) => {
          const contacts = (responseData?.data?.contacts || []).map(
            (contact: Contact) => ({
              ...contact,
              name: contact.full_name,
            }),
          ) as ContactTableRow[];
          const total = responseData?.data?.total || 0;
          
          
          return (
            <DataTable
              columns={columns}
              data={contacts}
              rowCount={total}
              getRowId={(row) => row._id!}
              manualPagination
              selectedRows={selectedRows}
              enablePagination
              enableRowSelection
              state={{ pagination }}
              onSelectedRowsChange={(selected) => setSelectedRows(selected)}
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

              <DataTableBulkActions
                entityName="liên hệ"
                actions={bulkActions}
              />

              <DataTableDeleteDialog
                currentRow={deleteSelectRow}
                deleting={deleteMutation.isPending}
                onDelete={handleDeleteContact}
              />
            </DataTable>
          );
        }}
      </QueryBoundary>

      <DeleteDialog
        open={openDeleteMultiDialog}
        onConfirm={handleDeleteContact}
        onOpenChange={setOpenDeleteMultiDialog}
        deleting={deleteMutation.isPending}
        title="Xác nhận xóa nhiều liên hệ"
        description={`Bạn có chắc chắn muốn xóa ${selectedRows.length} liên hệ đã chọn?`}
        itemName={`${selectedRows.length} liên hệ`}
      />
    </Fragment>
  );
};

export default ContactTable;
