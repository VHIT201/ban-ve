import { CollaboratorRequest } from "@/api/types/collaborator";

export type CollaboratorTableRow = CollaboratorRequest;

export interface useCollaboratorTableColumnsDefsProps {
  onView?: (collaborator: CollaboratorTableRow) => void;
  onApprove?: (collaborator: CollaboratorTableRow) => void;
  onReject?: (collaborator: CollaboratorTableRow) => void;
  onEdit?: (collaborator: CollaboratorTableRow) => void;
  onDelete?: (collaborator: CollaboratorTableRow) => void;
}
