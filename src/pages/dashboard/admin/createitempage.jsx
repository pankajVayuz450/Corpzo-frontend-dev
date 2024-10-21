import React from 'react';
import { useLocation } from 'react-router-dom';
import ContentByTitle from "@/components/admin/CreateForm";

const CreateItemPage = () => {
  const location = useLocation();
  const { title } = location.state || {};
 

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-4">Create {title}</h1>
      <ContentByTitle title={title}  />
     
    </div>
  );
};

export default CreateItemPage;