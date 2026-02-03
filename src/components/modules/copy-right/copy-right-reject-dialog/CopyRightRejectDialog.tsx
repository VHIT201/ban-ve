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
import { XCircleIcon } from "lucide-react";
import { FC, useState } from "react";
import { CopyrightReportStatus } from "@/api/models/copyrightReportStatus";
import { usePutApiReportsReportIdStatus } from "@/api/endpoints/copyright";
import { toast } from "sonner";

interface Props {
  reportId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CopyRightRejectDialog: FC<Props> = (props) => {
  // Props
  const {
    reportId,
    open: isRejectDialogOpen,
    onOpenChange: setIsRejectDialogOpen,
  } = props;

  // States
  const [adminNotes, setAdminNotes] = useState("");

  // Mutations
  const updateStatusMutation = usePutApiReportsReportIdStatus();

  // Methods
  const handleUpdateStatus = async (
    status: CopyrightReportStatus,
    notes?: string,
  ) => {
    try {
      if (!reportId) {
        toast.warning("Report ID không tồn tại.");
        return;
      }

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
      setIsRejectDialogOpen(false);

      setAdminNotes("");
    } catch (error) {
      console.error("Failed to update report status:", error);
      toast.error("Đã có lỗi xảy ra khi cập nhật trạng thái báo cáo");
    }
  };

  const handleReject = () => {
    handleUpdateStatus(CopyrightReportStatus.rejected, adminNotes);
  };

  return (
    <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircleIcon className="w-5 h-5 text-red-600" />
            Từ chối báo cáo
          </DialogTitle>
          <DialogDescription>
            Xác nhận từ chối báo cáo vi phạm này. Vui lòng cung cấp lý do từ
            chối.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reject-notes">
              Lý do từ chối <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reject-notes"
              placeholder="Nhập lý do từ chối báo cáo này..."
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
              setIsRejectDialogOpen(false);
              setAdminNotes("");
            }}
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={updateStatusMutation.isPending || !adminNotes.trim()}
            loading={updateStatusMutation.isPending}
          >
            <XCircleIcon className="w-4 h-4 mr-2" />
            Xác nhận từ chối
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CopyRightRejectDialog;
