import TitleComponent from '@/components/common/TitleComponent'
import { resendOtp, verifyOTP } from '@/redux/admin/slices/adminSlice'
import { Button, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { IoArrowBackCircle } from 'react-icons/io5'
import { TailSpin } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const OtpVerification = () => {
    const isLoading = useSelector((state) => state?.admin?.isLoading);
    const navigate = useNavigate()
    const id = useSelector((state) => state.admin.id)
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(null);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const dispatch = useDispatch();
    const handleOTPChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

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
        dispatch(verifyOTP({ id: localStorage.getItem("userId"), otp: otpCode, navigate }));
    };

    const handleBackButton=()=> navigate("/auth/sign-in")
    const handleResendOtp = () => {

        setOtp(new Array(6).fill(""))
        const id = localStorage.getItem('userId');
        dispatch(resendOtp({ id: id }));
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
    return (
        <section className="m-8 flex gap-4">
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
        </section>
    )
}

export default OtpVerification