import { z } from "zod";
import { LOGIN_FORM_SCHEMA } from "./constants";

export type LoginFormValues = z.infer<typeof LOGIN_FORM_SCHEMA>;

export interface Props {
  onSwitchViewMode: () => void;
}
