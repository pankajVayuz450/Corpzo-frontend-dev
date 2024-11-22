import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  quotationTitle: Yup.string()
    .required('Quotation title is required')
    .max(35, 'Quotation title cannot exceed 35 characters'),

  amount: Yup.number()
    .required('Amount is required')
    .min(1, 'Amount cannot be 0') // Minimum value validation
    .max(50000, 'Amount must be at most 50,000'),
    // .typeError('Amount must be a number'),

  userId: Yup.string()
    .required('User selection is required')
    .nullable(), // For allowing null in case Select is cleared

  businessId: Yup.string()
    // .required('Business selection is required')
    .nullable(),

  serviceId: Yup.string()
    .required('Service selection is required')
    .nullable(),

  // quotationDate: Yup.date()
  //   .required('Quotation date is required')
  //   .typeError('Please enter a valid date')
  //   .test('future-date', 'Date cannot be in the past', function (value) {
  //     return value && new Date(value) >= new Date();
  //   }),

  description: Yup.string()
    .required('Description is required')
    .max(1000, 'Description cannot exceed 1000 characters'),

  benefits: Yup.string()
    .required('Benefits are required')
    .max(1000, 'Benefits cannot exceed 1000 characters'),
});
