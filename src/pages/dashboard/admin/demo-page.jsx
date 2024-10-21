import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { createField, getAllFormFields, updateField, fetchTypes, handleTypeChange } from '@/redux/admin/actions/fields';
// import { addFieldAction, removeFieldAction, setFields, setSubInputs, setFormJson } from '@/redux/admin/slices/fields';
import deleteIcon from '/public/img/icons8-remove-64.png';
import { TailSpin } from 'react-loader-spinner';
import { element } from 'prop-types';
import DropDown from '@/components/common/DropDown';
import FormField from '@/components/common/FormField';
import { addFieldAction } from '@/redux/admin/slices/FormManagement/fieldsSlice';

const FormBuilder = () => {
  // const { id } = useParams();
  // const location = useLocation();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const [isAllSubInputsFetched, setIsAllSubInputsFetched] = useState(true);
  // const formDetails = location.state?.formDetails || {};
  // const { isFieldCreating, isFieldCreated, isFieldUpdating, formJson,isFetchingFormFields } = useSelector(state => state.fields);
  // const { fields, formInputs, subInputs, isFetching, isFetchingAttributes } = useSelector(state => state.fields);

  // useEffect(() => {
  //   dispatch(fetchTypes());
  //   if (id) {
  //     setIsAllSubInputsFetched(false);
  //     dispatch(getAllFormFields(id))
  //       .unwrap()
  //       .then(async (response) => {
  //         const subInputsPromises = response.map((field, index) => {
  //           return dispatch(handleTypeChange({ index, typeId: field.elementId })).unwrap()
  //             .then((result) => ({
  //               index,
  //               data: result.data
  //             }));
  //         });
  
  //         const results = await Promise.all(subInputsPromises);
  //         const newSubInputs = results.reduce((acc, { index, data }) => {
  //           acc[index] = data;
  //           return acc;
  //         }, {});
  
  //         dispatch(setSubInputs(newSubInputs))
  //         .unwrap()
  //         .then(()=>{
  //           setIsAllSubInputsFetched(true);
  //         })
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching form fields:", error);
  //       });
  //   }
  // }, [id]);
  

  // const addField = () => {
  //   console.log("addField");
    
  //   dispatch(addFieldAction({ id: uuidv4(), elementId: '', attributes: {}, options: [] }));
  // };

  // const removeField = (fieldId) => {
  //   dispatch(removeFieldAction(fieldId));
  // };

  // const handleTypeChangeData = async (index, typeId, resetForm, values) => {
  //   if (index < 0 || index >= fields.length) return;

  //   try {
  //     const response = await dispatch(handleTypeChange({ index, typeId })).unwrap();
  //     const newSubInputs = { ...subInputs, [index]: response.data };
  //     dispatch(setSubInputs(newSubInputs));

  //     const updatedFields = [...fields];
  //     updatedFields[index] = {
  //       ...updatedFields[index],
  //       elementId: typeId,
  //       attributes: {},
  //       options: typeId === 'select' ? ["", ""] : [],
  //     };
  //     dispatch(setFields(updatedFields));

  //     generateJson(updatedFields);
  //     resetForm({ values: { fields: updatedFields } });
  //   } catch (error) {
  //     console.error("Error fetching sub inputs:", error);
  //   }
  // };

  // const handleAttributeChange = (index, selectedAttributes, resetForm, values) => {
  //   if (index < 0 || index >= fields.length) return;

  //   const currentAttributes = fields[index].attributes;
  //   const newAttributes = selectedAttributes.reduce((acc, attr) => {
  //     acc[attr.value] = currentAttributes[attr.value] || '';
  //     return acc;
  //   }, {});

  //   const updatedFields = fields.map((field, i) => {
  //     if (i === index) {
  //       return { ...field, attributes: newAttributes };
  //     }
  //     return field;
  //   });

  //   dispatch(setFields(updatedFields));
  //   generateJson(updatedFields);
  //   resetForm({ values: { fields: updatedFields } });
  // };

  // const handleAttributeValueChange = (fieldIndex, attrId, value) => {
  //   if (fieldIndex < 0 || fieldIndex >= fields.length) return;

  //   const updatedFields = fields.map((field, i) => {
  //     if (i === fieldIndex) {
  //       return {
  //         ...field,
  //         attributes: {
  //           ...field.attributes,
  //           [attrId]: value
  //         }
  //       };
  //     }
  //     return field;
  //   });

  //   dispatch(setFields(updatedFields));
  //   generateJson(updatedFields);
  // };

  // const handleOptionChange = (index, optionIndex, value) => {
  //   if (index < 0 || index >= fields.length) return;

  //   const updatedFields = fields.map((field, i) => {
  //     if (i === index) {
  //       const updatedOptions = field.options.map((option, j) => {
  //         if (j === optionIndex) {
  //           return value;
  //         }
  //         return option;
  //       });
  //       return { ...field, options: updatedOptions };
  //     }
  //     return field;
  //   });

  //   dispatch(setFields(updatedFields));
  //   generateJson(updatedFields);
  // };

  // const addOption = (index) => {
  //   console.log("addOption");
    
  //   if (index < 0 || index >= fields.length) return;

  //   const updatedFields = fields.map((field, i) => {
  //     if (i === index) {
  //       const updatedOptions = [...field.options, ""];
  //       return { ...field, options: updatedOptions };
  //     }
  //     return field;
  //   });

  //   dispatch(setFields(updatedFields));
  //   generateJson(updatedFields);
  // };

  // const removeOption = (index, optionIndex) => {
  //   if (index < 0 || index >= fields.length) return;

  //   const updatedFields = fields.map((field, i) => {
  //     if (i === index) {
  //       const updatedOptions = field.options.filter((_, j) => j !== optionIndex);
  //       return { ...field, options: updatedOptions };
  //     }
  //     return field;
  //   });

  //   dispatch(setFields(updatedFields));
  //   generateJson(updatedFields);
  // };

  // const handleSubmit = (values) => {
  //   if (id) {
  //     const formJson = fields.map(field => ({
  //       _id: field.id ,
  //       formId: id,
  //       elementId: field.elementId,
  //       attributes: field.attributes,
  //       options: field.options || [],
  //     }));

  //     dispatch(updateField({  fields: formJson }))
  //     .unwrap()
  //     .then(() => {
  //       navigate('/dashboard/admin/formManagement');
  //     });
  //   } else {
  //     const formJson = fields.map(field => ({
  //       formId: formDetails.id,
  //       elementId: field.elementId,
  //       attributes: field.attributes,
  //       options: field.options || [],
  //     }));
  
  //     dispatch(setFormJson({ fields: formJson }));
  //     dispatch(createField({ fields: formJson }))
  //     .unwrap()
  //     .then(() => {
  //       navigate('/dashboard/admin/formManagement');
  //     });
  //   }
  //   setIsFormSubmitted(true);
  // };

  // const generateJson = (updatedFields) => {
  //   if(!updatedFields) return;

  //   if(updatedFields.length === 0) {
  //     dispatch(setFormJson({ fields: [] }));
  //     return;
  //   }

  //   if(id){
  //     const formJson = updatedFields.map(field => ({
  //       id: field.id|| 'Create',
  //       formId: id,
  //       elementId: field.elementId,
  //       attributes: field.attributes,
  //       options: field.options || [],
  //     }));
  //     console.log('formJson:', formJson);
  //     dispatch(setFormJson({ fields: formJson }));
  //     return;
  //   }
  //   const formJson = updatedFields.map(field => ({
  //     formId: formDetails.id,
  //     elementId: field.elementId,
  //     attributes: field.attributes,
  //     options: field.options || [],
  //   }));
  //   dispatch(setFormJson({ fields: formJson }));
  // };

  // return (
  //   <div className="container mx-auto p-4 overflow-auto">
  //     <div className="mb-4">
  //       <button
  //         type="button"
  //         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  //         onClick={addField}
  //       >
  //         Add Field
  //       </button>
  //     </div>
  //     <Formik
  //       initialValues={{ fields }}
  //       enableReinitialize
  //       onSubmit={handleSubmit}
  //     >
  //       {({ handleSubmit, resetForm, values }) => (
  //         <Form className="space-y-4" onSubmit={handleSubmit}>
  //           {isFetchingFormFields?<TailSpin 
  //           color="#00BFFF" height={24} width={24} 
  //           />:(fields&&fields.map((field, index) => (
  //             <div key={field.id} className="bg-white p-4 shadow-md rounded-lg space-y-4">
  //               <div className="flex space-x-4 items-center">
  //                 <Field
  //                   as="select"
  //                   name={`fields.${index}.elementId`}
  //                   value={field.elementId}
  //                   className="p-2 border rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                   onChange={(e) => handleTypeChangeData(index, e.target.value, resetForm, values)}
  //                 >
  //                   <option value="">Select Type</option>
  //                   {formInputs.map(input => (
  //                     <option key={input._id} value={input._id}>{input.typeName}</option>
  //                   ))}
  //                 </Field>
  //                 {subInputs[index] && (
  //                   <Select
  //                   isLoading={isFetchingAttributes}
  //                     isMulti
  //                     name={`fields.${index}.attributes`}
  //                     className="w-1/2"
  //                     options={subInputs[index].map(subInput => ({ value: subInput._id, label: subInput.attribute }))}
  //                     onChange={(selectedOptions) => handleAttributeChange(index, selectedOptions, resetForm, values)}
  //                     value={Object.keys(fields[index].attributes).map(attrId => ({
  //                       value: attrId,
  //                       label: subInputs[index]?.find(attr => attr._id === attrId)?.attribute
  //                     }))}
  //                   />
  //                 )}
  //                 <button
  //                   type="button"
  //                   onClick={() => removeField(field.id)}
  //                 >
  //                   <img src={deleteIcon} width={40} height={40} alt='delete' />
  //                 </button>
  //               </div>
  //               <div className="space-y-2">
  //                 {field.elementId === '6698c64f87a69aa619a3e4a5' && (
  //                   <div className="flex flex-col space-y-2">
  //                     <label className="font-bold">Options (one per line):</label>
  //                     {field.options.map((option, optionIndex) => (
  //                       <div key={optionIndex} className="flex items-center space-x-2">
  //                         <textarea
  //                           name={`fields.${index}.options.${optionIndex}`}
  //                           value={option}
  //                           placeholder="Enter option..."
  //                           className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                           onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
  //                         />
  //                         {field.options.length > 2 && (
  //                           <button
  //                             type="button"
  //                             className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
  //                             onClick={() => removeOption(index, optionIndex)}
  //                           >
  //                             Remove Option
  //                           </button>
  //                         )}
  //                       </div>
  //                     ))}
  //                     {field.options.length < 4 && (
  //                       <button
  //                         type="button"
  //                         className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
  //                         onClick={() => addOption(index)}
  //                       >
  //                         Add Option
  //                       </button>
  //                     )}
  //                   </div>
  //                 )}
  //                 {Object.entries(field.attributes).map(([attrId, attrValue]) => (
  //                   <div key={attrId} className="flex items-center">
  //                     <label className="w-1/3">{subInputs[index]?.find(attr => attr._id === attrId)?.attribute}</label>
  //                     <input
  //                       type="text"
  //                       name={`fields.${index}.attributes.${attrId}`}
  //                       value={attrValue}
  //                       className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                       onChange={(e) => handleAttributeValueChange(index, attrId, e.target.value)}
  //                     />
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           )))}
  //           <div className="flex justify-end space-x-4">
  //             <button
  //               type="button"
  //               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
  //               onClick={() => resetForm({ values: { fields: [] } })}
  //             >
  //               Reset Form
  //             </button>
  //             <button
  //               type="submit"
  //               className={`bg-blue-500 text-white px-4 py-2 rounded ${isFieldCreating || isFieldUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
  //               disabled={isFieldCreating || isFieldUpdating}
  //             >
  //               {(isFieldCreating || isFieldUpdating) && isFetchingAttributes? (
  //                 <TailSpin color="#00BFFF" height={24} width={24} />
  //               ) : (
  //                 id ? 'Update Form' : 'Create Form'
  //               )}
  //             </button>
  //           </div>
  //         </Form>
  //       )}
  //     </Formik>
  //   </div>
  // );


  const dispatch = useDispatch();
  const formFields = useSelector((state) => state.formFields.fields);
  // console.log("formFields",formFields);
  
  const [fields,setFields] = useState([]); 

  const options = ['Option 1', 'Option 2', 'Option 3'];
  const options2 = ['apple',"mango"];
 
  let arr= [];
  arr.push(options);
 
  // console.log(fields);
  
  const handleSelect = (selectedOption) => {
    console.log('Selected option:', selectedOption);
  };

  useEffect(()=>{
    
  },[])

   const addField = () => {
    console.log("addField");
    dispatch(addFieldAction(arr));
    // dispatch(addFieldAction({ id: uuidv4(), elementId: '', attributes: {}, options: [] }));


  };


  
  return (
    <>
      Frombuilder
      <div>
      <div className="mb-4">
         <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addField}
        >
          Add Field
        </button>
      </div>
      <div>
        {/* {fields.map((field)=><DropDown options={field} label="Select an option" onSelect={handleSelect} />)} */}
        <FormField/>
      </div>
      
    </div>
    </>
  )

};

export default FormBuilder;
