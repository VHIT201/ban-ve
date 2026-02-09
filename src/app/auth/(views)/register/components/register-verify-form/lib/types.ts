import { z } from "zod";
import { REGISTER_VERIFY_FORM_SCHEMA } from "./constants";

export type RegisterVerifyFormValues = z.infer<
  typeof REGISTER_VERIFY_FORM_SCHEMA
>;

export interface Props {
  email: string | null;
  onCancel: () => void;
}
