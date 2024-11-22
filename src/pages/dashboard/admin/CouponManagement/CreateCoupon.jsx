import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, getAllCoupons, updateCoupon } from '@/redux/admin/actions/coupon';
import * as Yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { Typography } from '@material-tailwind/react';
import { getActiveBusinessEmail, getAllActiveCategories, getAllActiveSelectedSubCategories, getAllActiveSubCategoriesAll } from '@/redux/admin/actions/Services';
import Select from 'react-select';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';
import LoadingPage from '@/components/common/LoadingPage';
import { formatString, setDateMin } from '@/Helpers/globalfunctions';
import { getActiveSubCategoryListAll } from '@/redux/admin/slices/Service';
import Spinner from '@/components/common/Spinner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CouponForm = () => {
  const { id } = useParams();
  const { couponsList, isCouponCreating, isCouponUpdating, isCouponsFetching } = useSelector((state) => state.coupons);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [searchParams] = useSearchParams();


  const { activeCategories, activeSubCategoriesList, getActiveBusinessEmailList, activeCategoryLoading } = useSelector((state) => state.service)

  const dispatch = useDispatch();
  const navigate = useNavigate();




  


  const formattedActiveCategoryList = activeCategories?.map(category => ({
    value: category.categoryId,
    label: category.categoryName
  }));

  const formattedActiveSubCategoryList = activeSubCategoriesList.map(subCategory => ({
    value: subCategory.subCategoryId,
    label: subCategory.subSectionTitle
  }));
  const formattedActiveBusinessEmail = getActiveBusinessEmailList.map(user => ({
    value: user.userId,
    label: user.email
  }));

  // let selectedCoupon = couponsList.find(coupon => coupon.couponId === id)

  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10
  const search = searchParams.get('search') || "";

  useEffect(() => {
    activeCategories.length === 0 && dispatch(getAllActiveCategories(true))

    getActiveBusinessEmailList.length === 0 && dispatch(getActiveBusinessEmail());



    if (id) {


      dispatch(getAllCoupons({ couponId: id, page: page, limit: limit, search: search }));
      const foundCoupon = couponsList.find(coupon => coupon.couponId === id);
      if (foundCoupon) {
        setSelectedCoupon(foundCoupon);
        const userSubCatogory = foundCoupon?.subCategoryIds
        const stringifyId = JSON.stringify(userSubCatogory)
        dispatch(getAllActiveSelectedSubCategories(stringifyId))
        console.log("check user list id...", stringifyId)
      }
    }
  }, [id, couponsList.length == 0, dispatch]);


  const validationSchema = Yup.object({
    couponTitle: Yup.string()
      // .matches(/^[a-zA-Z0-9 %\-]+$/, "Coupon title can only contain letters, numbers, spaces, hyphens, and %")
      .matches(/^(?!\s*$).+$/, "Coupon title cannot be only spaces") // Disallow only spaces
      .matches(/^[a-zA-Z0-9 %\-]+$/, "Coupon title can only contain letters, numbers, spaces, hyphens, and %")  // Allow letters, numbers, spaces, hyphens, and %
      .max(35, "Coupon title must be atmost 35 characters").required('Title is required'),
    discount: Yup.number()
      .required('Discount is required')
      .max(10000, 'Discount must be less than or equal to 10000'),
    validity: Yup.date()
      .required('Validity is required')
      .min(new Date(), 'Validity must be a future date'),
    categoryId: Yup.array()
      .of(Yup.string().required('At least one category is required'))
      .min(1, 'At least one category must be selected'),
    subCategoryId: Yup.array()
      .of(Yup.string().required('At least one sub-category is required'))
      .min(1, 'At least one sub-category must be selected'),
    activeBusinessEmail: Yup.array()
      .of(Yup.string().optional('At least one business email is required'))
      .min(1, 'At least one business email must be selected'),
    oneTime: Yup.boolean(),
    multiUse: Yup.boolean(),
    percentage: Yup.boolean(),
    fixed: Yup.boolean(),
  });


  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("handle submit called ", values)
    if (id) {

      const newCoupon = {
        couponTitle: values.couponTitle,
        discount: values.discount,
        validity: values.validity,
        active: values.active,
        categoryIds: values.categoryId,
        subCategoryIds: values.subCategoryId,
        usageType: values.multiUse == true ? "Multi Use" : values.oneTime == true ? "One Time" : "",
        discountType: values.fixed == true ? "amount" : values.percentage == true ? "percentage" : "",
        businesses: values.activeBusinessEmail

      }
      dispatch(updateCoupon({ id, newCoupon }, navigate))
        .unwrap()
        .then(() => {
          navigate('/dashboard/admin/coupounmanagement');
        })
        .finally(() => setSubmitting(false));
    } else {

      const newCoupon = {
        couponTitle: values.couponTitle,
        discount: values.discount,
        validity: values.validity,
        categoryIds: values.categoryId,
        subCategoryIds: values.subCategoryId,
        usageType: values.multiUse == true ? "Multi Use" : values.oneTime == true ? "One Time" : "",
        discountType: values.fixed == true ? "amount" : values.percentage == true ? "percentage" : "",
        businesses: values.activeBusinessEmail,


      }

      dispatch(createCoupon(newCoupon, navigate))
        .unwrap()
        .then(() => {
          resetForm();
          navigate('/dashboard/admin/coupounmanagement');
        })
        .finally(() => setSubmitting(false));
    }
  };



  const breadcrumbData = [
    {


      name: 'Coupon',
      url: '/dashboard/admin/coupounmanagement',
      children: [
        {
          name: id ? 'Update Coupon' : 'Create Coupon',
          url: id
            ? ''
            : '/dashboard/admin/couponmanagement/create-coupon',
        },
      ],
    }
  ];
 
  const handleDiscountChange = (e, setFieldValue, values) => {
    const { value } = e.target;

    const isFixedDiscount = values.fixed; // Check if Fixed is selected
    console.log(isFixedDiscount, "values")
    // Remove any non-digit characters except the decimal point
    const formattedValue = value.replace(/[^0-9.]/g, '');

    if (isFixedDiscount) {
      // Allow only numbers up to 10000 for Fixed discount
      const isValidFixed = /^(\d{1,4}(\.\d{0,2})?|10000(\.0{1,2})?)?$/.test(formattedValue);
      if (isValidFixed) {
        setFieldValue('discount', formattedValue);
      }
    } else {
      // Retain the existing logic for Percentage (allow numbers up to 100)
      const isValidPercentage = /^(\d{1,2}(\.\d{0,2})?|100(\.0{1,2})?)?$/.test(formattedValue);
      if (isValidPercentage) {
        setFieldValue('discount', formattedValue);
      }
    }
  };

  const date = setDateMin();
  return (
    <>
      {isCouponsFetching ? (<div className="flex justify-center items-center min-h-screen">
        <TailSpin height={50} width={50} color="blue" />
      </div>) : (<div>
        <Breadcrumb items={breadcrumbData} />
        <HeaderTitle title={id ? "Update Coupon" : "Create Coupon"} />
        <div className="p-6 bg-white shadow-md rounded-lg">

          <Formik
            enableReinitialize
            initialValues={{
              couponTitle: selectedCoupon?.couponTitle || '',
              discount: selectedCoupon?.discount || '',
              validity: selectedCoupon?.validity ? selectedCoupon.validity.split('T')[0] : '',
              active: selectedCoupon?.active || true,
              categoryId: selectedCoupon?.categoryIds || [],
              subCategoryId: selectedCoupon?.subCategoryIds || [],
              oneTime: selectedCoupon?.usageType === 'One Time',
              multiUse: selectedCoupon?.usageType === 'Multi Use',
              activeBusinessEmail: selectedCoupon?.businesses || [],
              fixed: selectedCoupon?.discountType === 'amount',
              percentage: selectedCoupon?.discountType === 'percentage',

            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}

          >
            {({ isSubmitting, resetForm, setFieldValue, values, handleBlur, touched,
              handleChange, setFieldTouched, dirty, isValid,
              errors, }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="couponTitle" className="block text-sm font-medium text-gray-700">Coupon Title</label>
                  <Field
                    type="text"
                    name="couponTitle"
                    id="couponTitle"
                    maxLength="35"
                    className="mt-1 block w-full border-2 border-gray-500 rounded-md shadow-sm"
                    onChange={(e) => {
              // Format the value before updating the state
              const formattedValue = formatString(e.target.value);
              handleChange({
                target: {
                  name: e.target.name,
                  value: formattedValue,
                },
              });
            }}
            onBlur={handleBlur}
                  />
                  <ErrorMessage name="couponTitle" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className='flex gap-5'>
                  <label>
                    <input
                      type="radio"
                      name="discountType"
                      className='p-2'
                      value="amount"
                      checked={values?.fixed}
                      onChange={() => {
                        setFieldValue('fixed', true);
                        setFieldValue('percentage', false);
                        setFieldValue('discount', '');
                      }}
                    />
                    Fixed
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="discountType"
                      value="percentage"
                      checked={values?.percentage}
                      onChange={() => {
                        setFieldValue('percentage', true);  // Set 'multiUse' as true
                        setFieldValue('fixed', false);  // Set 'oneTime' as false
                        setFieldValue('discount', '');
                      }}
                    />
                    Percentage
                  </label>
                </div>
                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                  <Field
                    type="text"
                    name="discount"
                    id="discount"
                    max="999"
                    onChange={(e) => handleDiscountChange(e, setFieldValue, values)}
                    className="mt-1 block w-full border-2 border-gray-500 rounded-md shadow-sm"
                  />
                  <ErrorMessage name="discount" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="validity" className="block text-sm font-medium text-gray-700">Validity Date</label>
                  {/* <Field
                    type="date"
                    name="validity"
                    id="validity"
                    min={date}
                    className="mt-1 block w-full border-2 border-gray-500 rounded-md shadow-sm"
                  /> */}
                  <DatePicker
                    selected={values.validity}
                    onChange={(date) => setFieldValue("validity", date)}
                    onBlur={() => setFieldTouched("validity", true)}
                    minDate={date}
                    dateFormat="yyyy-MM-dd"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholderText="Select Coupon Validity (YYYY/MM/DD)"
                    style={{ width: "100%" }}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                  <ErrorMessage name="validity" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                    Select Category
                  </Typography>
                  <Select
                    isMulti
                    name="categoryId"
                    options={formattedActiveCategoryList}
                    className="basic-multi-select"
                    isLoading={activeCategoryLoading}
                    classNamePrefix="select"
                    value={formattedActiveCategoryList?.filter(option => values?.categoryId.includes(option.value))}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];

                      setFieldValue("categoryId", selectedValues);
                      if (selectedValues.length > 0) {
                        dispatch(getAllActiveSubCategoriesAll({ sectionIds: selectedValues }));
                      }

                    }}
                    onBlur={() => setFieldTouched('categoryId', true)}
                  />

                  {errors.categoryId && touched.categoryId && <p className='text-sm text-red-500'>{errors.categoryId}</p>}
                </div>


                <div>
                  <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                    Select Sub Category
                  </Typography>
                  <Select
                    isMulti
                    name="subCategoryId"
                    options={formattedActiveSubCategoryList}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={formattedActiveSubCategoryList?.filter(option => values?.subCategoryId?.includes(option?.value))}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];

                      setFieldValue("subCategoryId", selectedValues);

                    }}
                    onBlur={() => setFieldTouched('subCategoryId', true)}
                  />
                  {errors.subCategoryId && touched.subCategoryId && <p className='text-sm text-red-500'>{errors.subCategoryId}</p>}
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">Select Service</label>
                  <Select
                    options={formattedActiveCategoryList}
                    className="mt-1"
                    classNamePrefix="select"
                    isLoading={activeCategoryLoading}
                    placeholder="Select a category"
                    // onChange={}
                  />
                </div> */}
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                    Users Email
                  </Typography>
                  <Select
                    isMulti
                    name="activeBusinessEmail"
                    options={formattedActiveBusinessEmail}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={formattedActiveBusinessEmail?.filter(option => values?.activeBusinessEmail?.includes(option?.value))}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                      console.log("check the sub cetegory value ..........", selectedValues)
                      setFieldValue("activeBusinessEmail", selectedValues);

                    }}
                    onBlur={() => setFieldTouched('activeBusinessEmail', true)}
                  />
                  {errors.activeBusinessEmail && touched.activeBusinessEmail && <p className='text-sm text-red-500'>{errors.activeBusinessEmail}</p>}
                </div>


                <label htmlFor="active" className="block text-sm font-medium text-gray-700">Usage Type</label>


                <div className='flex gap-5'>
                  <label>
                    <input
                      type="radio"
                      name="usageType"
                      value="oneTime"
                      checked={values?.oneTime}
                      onChange={() => {
                        setFieldValue('oneTime', true);  // Set 'oneTime' as true
                        setFieldValue('multiUse', false);  // Set 'multiUse' as false
                      }}
                    />
                    One Time
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="usageType"
                      value="multiUse"
                      checked={values?.multiUse}
                      onChange={() => {
                        setFieldValue('multiUse', true);  // Set 'multiUse' as true
                        setFieldValue('oneTime', false);  // Set 'oneTime' as false
                      }}
                    />
                    Multi Time
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={!(dirty && isValid)}
                    className="bg-blue-500 disabled:opacity-75 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {isCouponCreating ? <TailSpin color="#fff" height={20} width={20} /> : id ? 'Update Coupon' : 'Create Coupon'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>)}


    </>
  );
};

export default CouponForm;
