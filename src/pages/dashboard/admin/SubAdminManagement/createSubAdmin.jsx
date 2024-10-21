import React from 'react';
import { useParams } from 'react-router-dom';
import SubadminForm from '@/components/admin/SubAdminForm';

const SubadminPage = () => {
  const { id } = useParams();

  return (
    <div>
      <SubadminForm id={id} />
    </div>
  );
};

export default SubadminPage;
