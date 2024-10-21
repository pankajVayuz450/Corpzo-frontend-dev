import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  phoneNo: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  
  type: Yup.string().required('Please select a type').oneOf(['investor', 'fundraiser'], 'Invalid type selected')
  .required('Type is required'),
 
});

export default validationSchema;
