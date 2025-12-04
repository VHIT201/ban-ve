import { z } from 'zod';

export const FORGOT_PASSWORD_FORM_SCHEMA = z.object({
  email: z.string().email('Email không hợp lệ').min(1, 'Vui lòng nhập email'),
});

export const FORGOT_PASSWORD_FORM_DEFAULT_VALUES = {
  email: '',
};
