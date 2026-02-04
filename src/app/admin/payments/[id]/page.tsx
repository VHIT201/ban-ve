'use client';

import dynamic from 'next/dynamic';

const PaymentDetail = dynamic(
  () => import('../../views/payment/views/payment-detail'),
  { ssr: false }
);

export default PaymentDetail;
