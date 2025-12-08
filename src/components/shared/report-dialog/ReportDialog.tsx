import { usePostApiReports } from "@/api/endpoints/copyright";
import { CopyRightEditorForm } from "@/components/modules/copy-right";
import { CopyrightReportFormValues } from "@/components/modules/copy-right/copy-right-editor-form/CopyRightEditorForm";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { FC } from "react";
import { toast } from "sonner";
import { Props } from "./lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

const ReportDialog: FC<Props> = (props) => {
  // Props
  const { open, onOpenChange } = props;

  // Mutations
  const createCopyRightReportMutation = usePostApiReports();

  // Methods
  const handleCreateReport = async (data: CopyrightReportFormValues) => {
    try {
      await createCopyRightReportMutation.mutateAsync({
        data,
      });

      toast.success("Báo cáo bản quyền đã được gửi thành công.");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi gửi báo cáo bản quyền.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[90vh] sm:max-w-2xl">
        <DialogHeader>Report Dialog</DialogHeader>
        <ScrollArea className="overflow-y-auto px-5 py-2">
          <CopyRightEditorForm
            loading={createCopyRightReportMutation.isPending}
            onSubmit={handleCreateReport}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
