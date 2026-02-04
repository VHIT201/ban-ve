'use client';

import dynamic from 'next/dynamic';

const ContentDetail = dynamic(
  () => import('../../views/contents/views/content-detail/page'),
  { ssr: false }
);

export default ContentDetail;
