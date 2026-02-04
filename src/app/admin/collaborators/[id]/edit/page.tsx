'use client';

import dynamic from 'next/dynamic';

const CollaboratorEdit = dynamic(
  () => import('../../../views/collaborators/views/collaborator-edit/page'),
  { ssr: false }
);

export default CollaboratorEdit;
