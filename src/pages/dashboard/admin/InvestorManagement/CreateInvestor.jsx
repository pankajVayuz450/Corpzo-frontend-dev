import React, { useEffect } from 'react';
import { Input, Switch, Typography } from '@material-tailwind/react';
import { useFormik } from 'formik';
import { addCatgeory, getSingleCategory, editCategory } from '@/redux/admin/actions/MasterSettings/Category';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import TitleComponent from '@/components/common/TitleComponent';
import { TailSpin } from 'react-loader-spinner';
import { Spinner } from '@material-tailwind/react';
import validationSchema from "./ValidationSchema";
import { validateNumber } from '@/Helpers/globalfunctions';
import { addInvestor } from '@/redux/admin/actions/InvestorManagement';
const initialValues = {
  name: '',
  email: '',
  phoneNo: '',
  type: 'investor',
  status: 'active',
  active: false,
};


const CreateInvestor = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector((state) => state.investors.category);
  const isAdding = useSelector((state) => state.investors.isAdding);
  const isFetching = useSelector((state) => state.investors.isFetching);
  const navigate = useNavigate();

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    setFieldValue,
    handleSubmit,
    setTouched,
    setErrors,
    isValid,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      console.log(values, 'values');
      setTouched({}, false);
      setErrors({});
      dispatch(addInvestor(values, navigate));
      clearForm();  // Clear form if necessary
    },
  });

  const toggleSwitch = () => {
    setFieldValue('active', !values.active);
  };

  useEffect(() => {
    if (id) {
      dispatch(getSingleCategory(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id !== undefined && data) {
      setFieldValue('name', data.name || ''); // Set name
      setFieldValue('email', data.email || ''); // Set email
      setFieldValue('phoneNo', data.phoneNo || ''); // Set phoneNo
      setFieldValue('type', data.type || ''); // Set type
      setFieldValue('investorType', data.investorType || ''); // Set investorType
      setFieldValue('active', data.active || false); // Set active status
    }
  }, [data, setFieldValue, id]);

  return (
    <div>
      <TitleComponent title={id ? 'CORPZO | Edit Investor' : 'CORPZO | Add Investor'} />
      {id && isFetching ? (
        <TailSpin />
      ) : (
        <div className="w-[50%] flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                Name
              </Typography>
              <Input
                size="sm"
                placeholder={id ? 'Edit Name' : 'Add Name'}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                Email
              </Typography>
              <Input
                size="sm"
                placeholder={id ? 'Edit Email' : 'Add Email'}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                Phone Number
              </Typography>
              <Input
                size="sm"
                type='tel'
                maxLength={10}
                placeholder={id ? 'Edit Phone No' : 'Add Phone No'}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                name="phoneNo"
                value={values.phoneNo}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={validateNumber}
              />
              {errors.phoneNo && touched.phoneNo && <p className="text-sm text-red-500">{errors.phoneNo}</p>}
            </div>

            <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                Investor/Fund Raiser
              </Typography>
              <select
                className="px-3 py-2 w-full rounded-lg border border-gray-500 bg-transparent text-gray-500"
                name="type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur} // Make sure to blur the field for validation
              >
                <option value="investor">Investor</option>
                <option value="fundraiser">Fund Raiser</option>
              </select>


              {errors.type && touched.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>

            {/* <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                Investor Type
              </Typography>
              <Input
                size="sm"
                placeholder={id ? 'Edit Investor Type' : 'Add Investor Type'}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                name="investorType"
                value={values.investorType}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.investorType && touched.investorType && <p className="text-sm text-red-500">{errors.investorType}</p>}
            </div> */}

            <button
              type="submit"
              className="bg-blue-500 text-white w-full mt-4 font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isAdding ? (
                <div className="flex justify-center items-center gap-3">
                  <Spinner color="white" className="h-4 w-4" />
                  {id ? 'Updating Investor' : 'Adding Investor'}
                </div>
              ) : id ? (
                'Update'
              ) : (
                'Add Investor'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateInvestor;
