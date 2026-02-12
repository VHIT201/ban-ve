"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2Icon } from "lucide-react";
import { FC, useState } from "react";
import { CopyrightReportStatus } from "@/api/models/copyrightReportStatus";
import {
  getGetApiReportsQueryKey,
  usePutApiReportsReportIdStatus,
} from "@/api/endpoints/copyright";
import { toast } from "sonner";
import {
  getGetApiContentAllQueryKey,
  getGetApiContentQueryKey,
} from "@/api/endpoints/content";

interface Props {
  reportId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CopyRightResolveDialog: FC<Props> = (props) => {
  // Props
  const {
    reportId,
    open: isResolveDialogOpen,
    onOpenChange: setIsResolveDialogOpen,
  } = props;

  // States
  const [adminNotes, setAdminNotes] = useState("");

  // Mutations
  const updateStatusMutation = usePutApiReportsReportIdStatus({
    mutation: {
      meta: {
        invalidateQueries: [
          getGetApiReportsQueryKey(),
          getGetApiContentAllQueryKey(),
          getGetApiContentQueryKey({}),
        ],
      },
    },
  });

  // Methods
  const handleUpdateStatus = async (
    status: CopyrightReportStatus,
    notes?: string,
  ) => {
    if (!reportId) {
      toast.warning("Report ID không tồn tại.");
      return;
    }

    try {
      await updateStatusMutation.mutateAsync({
        reportId,
        data: {
          status,
          adminNotes: notes,
        },
      });

      toast.success(
        status === CopyrightReportStatus.resolved
          ? "Báo cáo đã được giải quyết thành công"
          : "Báo cáo đã được từ chối",
      );

      // Close dialogs
      setIsResolveDialogOpen(false);

      setAdminNotes("");
    } catch (error) {
      console.error("Failed to update report status:", error);
      toast.error("Đã có lỗi xảy ra khi cập nhật trạng thái báo cáo");
    }
  };

  const handleResolve = () => {
    handleUpdateStatus(CopyrightReportStatus.resolved, adminNotes);
  };

  return (
    <Dialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2Icon className="w-5 h-5 text-green-600" />
            Giải quyết báo cáo
          </DialogTitle>
          <DialogDescription>
            Xác nhận giải quyết báo cáo vi phạm này. Bạn có thể thêm ghi chú về
            cách xử lý.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="resolve-notes">Ghi chú xử lý (tùy chọn)</Label>
            <Textarea
              id="resolve-notes"
              placeholder="Nhập ghi chú về cách giải quyết vi phạm..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsResolveDialogOpen(false);
              setAdminNotes("");
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleResolve}
            disabled={updateStatusMutation.isPending}
            loading={updateStatusMutation.isPending}
          >
            <CheckCircle2Icon className="w-4 h-4 mr-2" />
            Xác nhận giải quyết
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CopyRightResolveDialog;
