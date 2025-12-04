import { z } from 'zod';
import { FORGOT_PASSWORD_FORM_SCHEMA } from './constants';

export type ForgotPasswordFormValues = z.infer<typeof FORGOT_PASSWORD_FORM_SCHEMA>;

export interface ForgotPasswordFormProps {
  onSuccess?: () => void;
}
