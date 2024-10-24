import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select'; // For multi-select attributes
import formAttributesNew from '@/constants/APIList/formAttributesNew'; // Update with correct API path if needed
import subInputFields from '@/constants/APIList/subInputFIelds';
import { Input } from '@material-tailwind/react';
import regExAPIs from '@/constants/APIList/regExAPIs';
import { useParams } from 'react-router-dom';

function FormField({ index, fieldData, onFieldChange, onRemoveField, availableElements }) {
    const params = useParams();
  const formId = params.id;
  const [subTypeOptions, setSubTypeOptions] = useState([]); // State for sub-input options
  const [attributeOptions, setAttributeOptions] = useState([]); // State for attribute options
  const [regexList, setRegexList] = useState([]); // State for attribute options

  // Static array of regex patterns (replace with API later)
const staticRegexList = [
    {
      _id: "66f27d1c91070a0dd737a8ff",
      regexName: "User Name RegEx",
      regex: "/^[a-zA-Z0-9._]{3,16}$/",
      createdAt: "2024-09-24T08:49:32.064Z",
      updatedAt: "2024-09-24T08:49:32.064Z",
    },
    {
      _id: "76g39d2d82080b1ed738b9aa",
      regexName: "Email RegEx",
      regex: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/",
      createdAt: "2024-09-24T08:49:32.064Z",
      updatedAt: "2024-09-24T08:49:32.064Z",
    },
    {
      _id: "86h41e3e93090c2fe839cabb",
      regexName: "Phone Number RegEx",
      regex: "/^[0-9]{10}$/",
      createdAt: "2024-09-24T08:49:32.064Z",
      updatedAt: "2024-09-24T08:49:32.064Z",
    },
  ];

  useEffect(()=>{
    const fetchRegExList = async ()=>{
        const response = await axios.get(`${regExAPIs.getAllRegEx}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        });   
        // console.log("regex:",response.data?.data?.response);
        // response.data?.data?.response
        setRegexList(response.data?.data?.response);
    };



    fetchRegExList();
  },[]);

  // Function to fetch sub-inputs and attributes for the selected element
  const onElementSelected = async (index, elementId) => {
    try {
      const subInputResponse = await axios.get(`${subInputFields.getFormSubInputs}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: { inputId: elementId }
      });

      setSubTypeOptions(subInputResponse.data?.data || []); // Set sub-input options

      const attributeResponse = await axios.get(formAttributesNew.getAllFormAttributes, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: { elementId: elementId }
      });
      setAttributeOptions(attributeResponse.data?.data || []); // Set attribute options

      onFieldChange(index, 'attributes', []); // Reset attributes
      onFieldChange(index, 'subType', ''); // Reset subType

    } catch (error) {
      console.log('Error fetching sub-inputs or attributes:', error);
    }

    onFieldChange(index, 'elementId', elementId);
  };

  // Handle attribute selection for multi-select and initialize attribute values
  const handleAttributesChange = (selectedOptions) => {
    const selectedAttributeValues = selectedOptions.map(option => ({ attributeId: option.value, value: '' }));
    onFieldChange(index, 'attributes', selectedAttributeValues); // Initialize attributes with empty values
  };

//   const handleRegExChange = (index,key,val)=>{
//     console.log("handleRegExChange:",index,key,val);
    
//   }

  // Handle the change in attribute value input
  const handleAttributeValueChange = (attributeIndex, newValue) => {
    const updatedAttributes = [...fieldData.attributes];
    updatedAttributes[attributeIndex].value = newValue; // Update the value for the selected attribute
    onFieldChange(index, 'attributes', updatedAttributes);
  };

  return (
    <div className="mb-4 bg-gray-200 p-4 rounded-md">
      {/* Select Form Element */}
      <div className="mb-2">
        <label className="block text-gray-700">Select Form Element:</label>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={fieldData.elementId || ''} // Tie to fieldData.element
          onChange={(e) => onElementSelected(index, e.target.value)} // Fetch sub-inputs and attributes when element changes
        >
          <option value="">Select Element</option>
          {availableElements.map((element) => (
            <option key={element._id} value={element._id}>
              {element.typeName}
            </option>
          ))}
        </select>
      </div>

      {/* Select Sub-Type (Sub-Input) */}
      {subTypeOptions.length > 0 && (
        <div className="mb-2">
          <label className="block text-gray-700">Select Sub-Type:</label>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={fieldData.subType || ''} // Tie to fieldData.subType
            onChange={(e) => onFieldChange(index, 'subType', e.target.value)}
          >
            <option value="">Select Sub-Type</option>
            {subTypeOptions.map((subType) => (
              <option key={subType._id} value={subType._id}>
                {subType.subtypeName}
              </option>
            ))}
          </select>
        </div>
      )}

    {regexList.length > 0 && (
        <div className="mb-2">
          <label className="block text-gray-700">Select RegEx:</label>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={fieldData.regExId || ''} // Tie to fieldData.subType
            onChange={(e) => onFieldChange(index, 'regExId', e.target.value)}
          >
            <option value="">Select RegEx</option>
            {regexList.map((regex) => (
              <option key={regex._id} value={regex._id}>
                {regex.regexName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Multi-Select Attributes */}
      {attributeOptions.length > 0 && (
        <div className="mb-2">
          <label className="block text-gray-700">Select Attributes:</label>
          <Select
            isMulti
            name="attributes"
            options={attributeOptions.map(attr => ({ value: attr._id, label: attr.attribute }))}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleAttributesChange}
            value={attributeOptions
              .filter(option => fieldData.attributes.map(attr => attr.attributeId).includes(option._id))
              .map(option => ({ value: option._id, label: option.attribute }))}
          />
        </div>
      )}

      {/* Dynamically Generated Input Fields for Each Attribute */}
      {fieldData.attributes && fieldData.attributes.length > 0 && (
        <div className="mb-4 flex">
          {fieldData.attributes.map((attribute, attrIndex) => (
            <div key={attrIndex} className="flex items-center mb-2 mx-4">
              <Input
                label={` ${attributeOptions.find(attr => attr._id === attribute.attributeId)?.attribute || ''}`}
                value={attribute.value || ''} // Tie the input value to the attribute's value
                onChange={(e) => handleAttributeValueChange(attrIndex, e.target.value)} // Update attribute value
              />
            </div>
          ))}
        </div>
      )}

    <div className="mb-2">
        <Input
          label="Enter Key"
          value={fieldData.key || ''} 
          onChange={(e) => onFieldChange(index,'key', e.target.value)} 
        />
      </div>
      <div className="mb-2">
        <Input
          label="Enter Value"
          value={fieldData.value || ''} // Tie the value input value to fieldData.value
          onChange={(e) => onFieldChange(index,'value', e.target.value)} // Update value in field data
        />
      </div>

      {/* Remove Field Button */}
      <button
        onClick={() => onRemoveField(index)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Remove Field
      </button>
    </div>
  );
}

export default FormField;
