'use client';

import dynamic from 'next/dynamic';

const CollaboratorDetail = dynamic(
  () => import('../../views/collaborators/views/collaborator-detail/page'),
  { ssr: false }
);

export default CollaboratorDetail;
