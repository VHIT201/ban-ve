import { z } from "zod";
import {
  REGISTER_FORM_SCHEMA,
  REGISTER_STEP1_SCHEMA,
  REGISTER_STEP2_SCHEMA,
} from "./constants";

export type RegisterFormValues = z.infer<typeof REGISTER_FORM_SCHEMA>;
export type RegisterStep1Values = z.infer<typeof REGISTER_STEP1_SCHEMA>;
export type RegisterStep2Values = z.infer<typeof REGISTER_STEP2_SCHEMA>;

export interface Props {
  onSwitchViewMode: () => void;
}

export type RegistrationStep = 1 | 2;
