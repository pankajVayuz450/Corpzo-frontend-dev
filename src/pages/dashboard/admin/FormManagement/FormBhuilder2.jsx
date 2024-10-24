import React, { useState } from 'react';
import FormField2 from './FormField2';
import { Button, Select, Option } from '@material-tailwind/react';

function FormBhuilder2() {
  // Static dropdown options for different form fields
  const staticDropdown = [
    { name: 'Short Answer', value: 'short_answer' },
    { name: 'Paragraph', value: 'paragraph' },
    { name: 'Multiple Choice', value: 'multiple_choice' },
    { name: 'Checkboxes', value: 'checkboxes' },
    { name: 'Dropdown', value: 'dropdown' },
  ];

  const [fields, setFields] = useState([]);

  // Add a new field to the form
  const handleAddField = () => {
    setFields([...fields, { type: 'short_answer', label: '', options: [] }]); // Default to short answer
  };

  // Handle removing a field
  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, idx) => idx !== index);
    setFields(updatedFields);
  };

  // Handle field change
  const handleFieldChange = (index, updatedField) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
  };

  return (
    <div>
      {fields.map((field, idx) => (
        <FormField2
          key={idx}
          index={idx}
          fieldData={field}
          onFieldChange={handleFieldChange}
          onRemoveField={handleRemoveField}
          availableElements={staticDropdown}
        />
      ))}
      <Button onClick={handleAddField} className="mt-4">Add Field</Button>
    </div>
  );
}

export default FormBhuilder2;
