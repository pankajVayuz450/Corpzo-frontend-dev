import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  offerTitle: Yup.string()
    .required('Offer title is required')
    .max(50, 'Offer title must be at most 50 characters'),
  
  offerDetail: Yup.string()
    .required('Offer detail is required')
    .max(500, 'Offer detail must be at most 500 characters'),
  
  discountPercent: Yup.number()
    .required('Discount percentage is required')
    .min(0, 'Discount percentage must be at least 0')
    .max(100, 'Discount percentage cannot exceed 100'),
  
  validity: Yup.date()
    .required('Validity date is required')
    .min(new Date(), 'Validity date cannot be in the past'),
  
  applicableUserType: Yup.string()
    .required('Applicable user type is required'),

  serviceId: Yup.array()
    .of(Yup.string().required()) 
    .min(0, 'At least one service must be selected')
    .required('Service is required'),
  

});
