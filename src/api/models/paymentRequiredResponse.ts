// @ts-nocheck
import type { ErrorResponse } from './errorResponse';
import type { PaymentRequiredResponseAllOf } from './paymentRequiredResponseAllOf';

export type PaymentRequiredResponse = ErrorResponse & PaymentRequiredResponseAllOf;
