import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState,useRef } from 'react';
import { loginAdmin } from '../../../redux/admin/actions/user';
import { toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
// import { useAuth } from '@/context/AuthContext'
import { IoArrowBackCircle } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { adminLogin, handleOtp, resendOtp, verifyOTP, handleLoading } from "@/redux/admin/slices/adminSlice";
import TitleComponent from "@/components/common/TitleComponent";
import ReCAPTCHA from "react-google-recaptcha";
import ReCAPTCHAForm from "../../../components/common/ReCaptcha";
// Validation schema for Formik
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').matches('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|biz)$', 'Invalid email format').required('Email is required'),
});

export function SignIn() {
  const dispatch = useDispatch();
  // const { login } = useAuth();
  const isLoading = useSelector((state) => state?.admin?.isLoading);
  const store = useSelector((state) => state?.admin?.user);
  const isOtp = useSelector((state) => state.admin.isOtp)
  const navigate = useNavigate()
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(null);
  const [recaptcha, setRecaptchaToken]= useState('');
  const [loading, setLoading] = useState(isLoading)

  const recaptchaRef =useRef();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue, setErrors, setTouched, dirty, isValid } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {

      let  data 
      const token = await recaptchaRef.current.executeAsync().then((res)=>{
        console.log("check response ",res)

        data = {email:values.email,recaptchaToken:res}
        verifyEmail(data);

      })       
      
    }
  });

  
 

  const verifyEmail = async (data) => {
    
    // if(isLoading){
    //   return;
    // }
    setLoading(true);
    dispatch(adminLogin(data)); 
    setLoading(false);
  };

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleOTPChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const siteKey = "6LdmW04qAAAAAEkCdYv1iA3LfoJaZmRlwse5EWqt"
  const secreteKey = "6LdmW04qAAAAAMmce8jot6nLRNTKZG2fmcgi1D5t"
  const handleBackButton = () => {
    dispatch(handleOtp(false))
    setFieldValue("email", "")
    setErrors({})
    setTouched({}, false)
    setOtp(new Array(6).fill(""))
  }
  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const currentInput = event.currentTarget;

      if (currentInput.value === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);

        const previousInput = currentInput.previousElementSibling;
        if (previousInput) {
          previousInput.focus();
          previousInput.select();
        }
      } else if (currentInput.value !== '') {
        currentInput.value = '';
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const verifyOTPHandler = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    dispatch(verifyOTP({ email: values.email, otp: otpCode, navigate }));
  };

  // if (store?.role === "admin") {
  //   login(store.role, store.token);
  // }

 
  const handleResendOtp = () => {
    setOtp(new Array(6).fill(""))
    dispatch(resendOtp({ email: values.email }));
    setIsResendDisabled(true);
    setResendTimer(60);
  };

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
  if (!isOtp) {
    return (
      <section className="m-8 flex items-center gap-4">
        <TitleComponent title={"CORPZO | Sign In"} />
        <div className="w-full lg:w-3/5">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email to Sign In.</Typography>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
            <div className="mb-1 flex flex-col gap-6">
              <Input
                name="email"
                value={values.email}
                size="lg"
                placeholder="example@mail.com"
                onFocus={() => touched.email = true}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-red-500 text-xs">{touched.email && errors.email}</span>
            </div>
            <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey="6LemSE0qAAAAADhn4nN770nVLBJxAGRz_LoFXP6h"
      />
            {!isLoading
              ? <Button disabled={!dirty && isValid} type="submit" className={`mt-6 ${loading || !(dirty && isValid) ? 'bg-gradient-to-br from-gray-300 to-gray-400 cursor-not-allowed text-white' : ''}}`} fullWidth>Next</Button>
              : <div className="flex items-center justify-center "><TailSpin color="#000" height={30} width={30} /></div>}
          </form>
        </div>
        <div className="w-[25%] hidden lg:block">
          <img
            src="/img/pattern.png"
            className=" w-full object-cover rounded-3xl"
          />
        </div>
      </section>
    );
  }

  return (
    <>
      {<section className="m-8 flex gap-4">
        <TitleComponent title={"CORPZO | OTP Verification"} />
        <div onClick={handleBackButton} className="text-3xl hover:cursor-pointer" ><IoArrowBackCircle /></div>
        <div className="w-full lg:w-3/5 mt-24">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter OTP sent on email.</Typography>
          </div>

          <form
            className="mt-8 mb-2 mx-auto w-full max-w-md lg:max-w-lg"
            onSubmit={(e) => verifyOTPHandler(e)}
          >
            <div className="mb-6 flex justify-center gap-2 flex-wrap">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:border-gray-900 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                  value={data}
                  onChange={(e) => handleOTPChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            {!isLoading && <div className="my-2">
              {resendTimer <= 0 && (
                <span className="text-xs text-[#7E7E7E]">Didn’t receive a code?</span>
              )}
              <span className="text-[#F78500] text-xs cursor-pointer m-1">
                <button
                  type="button" // Ensures it's not submitting the form
                  onClick={handleResendOtp}
                  disabled={isResendDisabled || isLoading}
                >
                  {resendTimer > 0
                    ? `Try again after ${resendTimer} seconds`
                    : "Resend OTP"}
                </button>
              </span>
            </div>}
            {!isLoading ? (
              <Button type="submit" disabled={otp.join('').length === 6 ? false : true} className="mt-6 w-full">
                Continue
              </Button>
            ) : (
              <div className="flex justify-center mt-6">
                <TailSpin color="#000" height={50} width={50} />
              </div>
            )}
          </form>
        </div>
        <div className="w-2/5 h-full hidden lg:block">
          <img
            src="/img/pattern.png"
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
      </section>}
    </>
  );
}

export default SignIn;
