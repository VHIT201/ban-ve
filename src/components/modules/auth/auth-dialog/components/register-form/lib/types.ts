import { z } from "zod";
import { REGISTER_FORM_SCHEMA } from "./constants";

export type RegisterFormValues = z.infer<typeof REGISTER_FORM_SCHEMA>;

export interface Props {
  onSwitchViewMode: () => void;
}
