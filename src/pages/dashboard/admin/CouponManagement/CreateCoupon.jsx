import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, getAllCoupons, updateCoupon } from '@/redux/admin/actions/coupon';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { Switch, Typography } from '@material-tailwind/react';
import { getActiveBusinessEmail, getAllActiveCategories, getAllActiveSubCategoriesAll } from '@/redux/admin/actions/Services';
import Select from 'react-select';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import HeaderTitle from '@/components/common/HeaderTitle';

const CouponForm = () => {
  const { id } = useParams();
  const { couponsList, isCouponCreating, isCouponUpdating } = useSelector((state) => state.coupons);
  const [selectedCoupon, setSelectedCoupon] = useState(null);


  const { activeCategories, activeSubCategoriesList, getActiveBusinessEmailList } = useSelector((state) => state.service)

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const formattedActiveCategoryList = activeCategories?.map(category => ({
    value: category.categoryId,
    label: category.categoryName
  }));

  const formattedActiveSubCategoryList = activeSubCategoriesList.map(subCategory => ({
    value: subCategory._id,
    label: subCategory.subSectionTitle
  }));
  const formattedActiveBusinessEmail = getActiveBusinessEmailList.map(user => ({
    value: user.userId,
    label: user.email
  }));

  // let selectedCoupon = couponsList.find(coupon => coupon.couponId === id)


  useEffect(() => {
    dispatch(getAllActiveCategories(true))
    dispatch(getActiveBusinessEmail());
    if (id) {
      const foundCoupon = couponsList.find(coupon => coupon.couponId === id);
      if (foundCoupon) {
        setSelectedCoupon(foundCoupon);
      } else {
        dispatch(getAllCoupons({ page: 1, limit: 10, couponId: id, search: "" }));
      }
    }
  }, [id]);


  const validationSchema = Yup.object({
    couponTitle: Yup.string()
      .matches(/^\S/, "Coupon Title cannot contain spaces")
      .max(35, "Coupon title must be atmost 35 characters").required('Title is required'),
    discount: Yup.number()
      .required('Discount is required')
      .max(100, 'Discount must be less than or equal to 100'),
    validity: Yup.date()
      .required('Validity is required')
      .min(new Date(), 'Validity must be a future date'),
    categoryId: Yup.array()
      .of(Yup.string().required('At least one category is required'))
      .min(1, 'At least one category must be selected'),
    subCategoryId: Yup.array()
      .of(Yup.string().required('At least one sub-category is required'))
      .min(1, 'At least one sub-category must be selected'),
    // activeBusinessEmail: Yup.array()
    //   .of(Yup.string().required('At least one business email is required'))
    //   .min(1, 'At least one business email must be selected'),
    oneTime: Yup.boolean(),
    multiUse: Yup.boolean(),
  });


  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("handle submit called ")
    if (id) {
      console.log(values, "values from update")
      const newCoupon = {
        couponTitle: values.couponTitle,
        discount: values.discount,
        validity: values.validity,
        active: values.active,
        categoryIds: values.categoryId,
        subCategoryIds: values.subCategoryId,
        usageType: values.multiUse == true ? "Multi Use" : values.oneTime == true ? "One Time" : "",
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
        businesses: values.activeBusinessEmail

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

  const handleResetForm = (resetForm) => {

    setSelectedCoupon({})
    resetForm()

  }

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

  return (
    <>
      <Breadcrumb items={breadcrumbData} />
      <HeaderTitle title={id ? "Update Coupon" : "Create Coupon"} />
      <div className="p-6 bg-white shadow-md rounded-lg">

        <Formik
          enableReinitialize
          initialValues={{
            couponTitle: selectedCoupon?.couponTitle || '',
            discount: selectedCoupon?.discount || '',
            validity: selectedCoupon?.validity ? selectedCoupon.validity.split('T')[0] : '',
            active: selectedCoupon?.active || false,
            categoryId: selectedCoupon?.categoryIds || [],
            subCategoryId: selectedCoupon?.subCategoryIds || [],
            oneTime: selectedCoupon?.usageType === 'One Time',
            multiUse: selectedCoupon?.usageType === 'Multi Use',
            activeBusinessEmail: selectedCoupon?.businesses || []
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}

        >
          {({ isSubmitting, resetForm, setFieldValue, values, handleBlur, touched,
            handleChange, setFieldTouched,
            errors, }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="couponTitle" className="block text-sm font-medium text-gray-700">Coupon Title</label>
                <Field
                  type="text"
                  name="couponTitle"
                  id="couponTitle"
                  maxLength="35"

                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="couponTitle" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
                <Field
                  type="number"
                  name="discount"
                  id="discount"
                  max="999"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <ErrorMessage name="discount" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="validity" className="block text-sm font-medium text-gray-700">Validity Date</label>
                <Field
                  type="date"
                  name="validity"
                  id="validity"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
                  classNamePrefix="select"
                  value={formattedActiveCategoryList?.filter(option => values?.categoryId.includes(option.value))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                    console.log("check the cetegory value ..........", selectedValues)
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
                    console.log("check the sub cetegory value ..........", selectedValues)
                    setFieldValue("subCategoryId", selectedValues);
                  }}
                  onBlur={() => setFieldTouched('subCategoryId', true)}
                />
                {errors.subCategoryId && touched.subCategoryId && <p className='text-sm text-red-500'>{errors.subCategoryId}</p>}
              </div>

              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Businesses
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
                    type="checkbox"
                    name="oneTime"
                    checked={values?.oneTime}
                    onChange={(e) => {
                      setFieldValue('oneTime', e.target.checked);  // Update 'oneTime' value
                      if (e.target.checked) {
                        setFieldValue('multiUse', false);  // Reset 'multiUse' when 'oneTime' is checked
                      }
                    }}
                  />
                  One Time
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="multiUse"
                    checked={values?.multiUse}
                    onChange={(e) => {
                      setFieldValue('multiUse', e.target.checked);  // Update 'multiUse' value
                      if (e.target.checked) {
                        setFieldValue('oneTime', false);  // Reset 'oneTime' when 'multiUse' is checked
                      }
                    }}
                  />
                  Multi Use
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isCouponCreating || isCouponUpdating}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {isCouponCreating ? <TailSpin color="#fff" height={20} width={20} /> : id ? 'Update Coupon' : 'Create Coupon'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CouponForm;
