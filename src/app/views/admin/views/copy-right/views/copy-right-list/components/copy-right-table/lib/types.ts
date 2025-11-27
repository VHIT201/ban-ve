import { CopyrightReport } from "@/api/models/copyrightReport";

export type CopyrightReportTableRow = CopyrightReport;

export interface useCopyrightReportTableColumnsDefsProps {
  onView?: (report: CopyrightReportTableRow) => void;
  onResolve?: (report: CopyrightReportTableRow) => void;
  onReject?: (report: CopyrightReportTableRow) => void;
  onDelete?: (report: CopyrightReportTableRow) => void;
  onViewEvidence?: (report: CopyrightReportTableRow) => void;
}
