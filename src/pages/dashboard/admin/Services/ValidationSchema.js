import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Service Title is required')
    .max(50, 'Service Title must be less than 50 characters'),
  
  details: Yup.string()
    .max(100, 'Service Title must be less than 100 characters')
    .required('Service Detail is required'),
  
  categoryId: Yup.string()
    .required('Category is required'),
  
  subCategoryId: Yup.string()
    .required('Sub Category is required'),
  
  formId: Yup.string()
    .required('Form is required'),

  duration: Yup.number()
    .required('Duration is required')
    .oneOf([1, 3, 6, 12, 24, 60], 'Please select a valid duration'),

  cost: Yup.number()
    .max(10000, 'Cost cannot be greater than 10000')
    .nullable() 
    .optional(),
    
  about: Yup.string()
    .required('About is required')
    .max(200, 'About section must be less than 200 characters'),

});
