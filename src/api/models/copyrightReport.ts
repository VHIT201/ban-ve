// @ts-nocheck
import type { User } from "./user";
import type { CopyrightReportContentId } from "./copyrightReportContentId";
import type { CopyrightReportReportedContentId } from "./copyrightReportReportedContentId";
import type { CopyrightReportViolationType } from "./copyrightReportViolationType";
import type { CopyrightReportStatus } from "./copyrightReportStatus";

export interface CopyrightReport {
  _id?: string;
  reporterId?: User;
  reporterEmail?: string;
  contentId?: CopyrightReportContentId;
  reportedContentId?: CopyrightReportReportedContentId;
  violationType?: CopyrightReportViolationType;
  description?: string;
  status?: CopyrightReportStatus;
  evidence?: string[];
  adminNotes?: string;
  resolvedAt?: string;
  resolvedBy?: User;
  createdAt?: string;
  updatedAt?: string;
}
