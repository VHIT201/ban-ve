'use client';

import dynamic from 'next/dynamic';

const CopyRightDetail = dynamic(
  () => import('../../views/copy-right/views/copy-right-detail/page'),
  { ssr: false }
);

export default CopyRightDetail;
