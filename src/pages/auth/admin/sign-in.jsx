import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { TailSpin } from "react-loader-spinner";
// import { useAuth } from '@/context/AuthContext'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminLogin, handleOtp, resendOtp, verifyOTP } from "@/redux/admin/slices/adminSlice";
import TitleComponent from "@/components/common/TitleComponent";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Validation schema for Formik
const validationSchema = Yup.object({
  // email: Yup.string().email('Invalid email address').matches('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|biz)$', 'Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
  emailOrPhone: Yup.string()
    .required('This field is required')
    .test('emailOrPhone', 'Enter a valid email or phone number', function (value) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|biz)$/;
      const phoneRegex = /^\d{10}$/; // Example 10-digit phone number format
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
});

export function SignIn() {
  const dispatch = useDispatch();
  // const { login } = useAuth();
  const isLoading = useSelector((state) => state?.admin?.isLoading);
  const store = useSelector((state) => state?.admin?.user);
  const isOtp = useSelector((state) => state.admin.isOtp)
  const id = useSelector((state) => state.admin.id)
  const navigate = useNavigate();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(null);
  const [recaptcha, setRecaptchaToken] = useState('');
  const [loading, setLoading] = useState(isLoading)
  const [passwordVisible, setPasswordVisible] = useState(false);

  const recaptchaRef = useRef();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue, setErrors, setTouched, dirty, isValid } = useFormik({
    initialValues: {
      // email: "",
      password: "",
      emailOrPhone: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|biz)$/;
      const payload = emailRegex.test(values.emailOrPhone)
        ? { email: values.emailOrPhone, password: values.password }
        : { phoneNumber: values.emailOrPhone, password: values.password };
      let data
      const token = await recaptchaRef.current.executeAsync().then((res) => {
        console.log("check response ", res)

        data = { ...payload, recaptchaToken: res }
        console.log(data, "data from form")
        verifyEmail(data);

      })

    }
  });

  const verifyEmail = async (data) => {
    setLoading(true);
    dispatch(adminLogin({ data, navigate }));
    setLoading(false);
  };


  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  }
  useEffect(() => {
    let timerInterval;
    if (resendTimer > 0) {
      timerInterval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timerInterval);
  }, [resendTimer]);

  useEffect(() => {
    if (!isLoading) {

      setResendTimer(null);
    }
  }, [isLoading]);

  return (
    <>
      <section className="m-8 flex items-center gap-4">
        <TitleComponent title={"CORPZO | Sign In"} />
        <div className="w-full lg:w-3/5">
          <div className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">

            <div className="text-left">
              <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
              <Typography variant="paragraph" className="text-lg font-normal text-gray-600">Please Sign In to continue to your account.</Typography>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto max-w-screen-lg">
              <div className="mb-4 flex flex-col gap-2">
                <Input
                  name="emailOrPhone"
                  variant="outlined"
                  value={values.emailOrPhone}
                  size="lg"
                  label="Email/Phone Number"
                  // placeholder="example@mail.com"
                  onFocus={() => touched.emailOrPhone = true}

                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={100} 
                />
                <span className="text-red-500 text-xs">{touched.emailOrPhone && errors.emailOrPhone}</span>
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <div className="relative">

                  <Input
                    name="password"
                    variant="outlined"
                    value={values.password}
                    size="lg"
                    type={passwordVisible ? "text" : "password"}
                    label="Password"
                    onFocus={() => touched.password = true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={50} 
                  />
                  {
                    passwordVisible ? <FaEye onClick={togglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
                      : <FaEyeSlash onClick={togglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />

                  }
                </div>
                <span className="text-red-500 text-xs">{touched.password && errors.password}</span>
              </div>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6LemSE0qAAAAADhn4nN770nVLBJxAGRz_LoFXP6h"
              />
              {!isLoading
                ? <Button disabled={!dirty && isValid} type="submit" className={`mt-6 ${loading || !(dirty && isValid) ? 'bg-gradient-to-br from-gray-300 to-gray-400 cursor-not-allowed text-white' : ''}}`} fullWidth>Sign In</Button>
                : <div className="flex items-center justify-center "><TailSpin color="#000" height={30} width={30} /></div>}
            </form>
          </div>
        </div>
        <div className="w-[25%] hidden lg:block">
          <img
            src="/img/pattern.png"
            className=" w-full object-cover rounded-3xl"
          />
        </div>
      </section>
    </>
  );
}

export default SignIn;
