import React from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signupUser } from '@/redux/admin/actions/user';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  gender: Yup.string().oneOf(['male', 'female', 'other']).required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  // profilePictureUrl: Yup.string().url('Invalid URL').nullable(),
  profilePictureUrl: Yup.string().nullable(),
});

export function SignUp() {
  const dispatch = useDispatch();
  
  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(signupUser(values))
      .unwrap()
      .then(() => {
        localStorage.setItem('token', data.data.token);
        navigate('/dashboard/user')
        setSubmitting(false);
      });
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your details to register.</Typography>
        </div>

        <Formik
          initialValues={{ name: '', gender: '', email: '', phone: '', password: '', profilePictureUrl: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your Name
                </Typography>
                <Field name="name">
                  {({ field }) => (
                    <Input
                      {...field}
                      size="lg"
                      placeholder="Your Name"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="name">
                  {msg => <Typography variant="small" color="red" className="text-sm">{msg}</Typography>}
                </ErrorMessage>

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Gender
                </Typography>
                <Field name="gender" as="select">
                  {({ field }) => (
                    <select
                      {...field}
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    >
                      <option value="" label="Select gender" />
                      <option value="male" label="Male" />
                      <option value="female" label="Female" />
                      <option value="other" label="Other" />
                    </select>
                  )}
                </Field>
                <ErrorMessage name="gender">
                  {msg => <Typography variant="small" color="red" className="text-sm">{msg}</Typography>}
                </ErrorMessage>

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your Email
                </Typography>
                <Field name="email">
                  {({ field }) => (
                    <Input
                      {...field}
                      size="lg"
                      placeholder="name@mail.com"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="email">
                  {msg => <Typography variant="small" color="red" className="text-sm">{msg}</Typography>}
                </ErrorMessage>

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Phone Number
                </Typography>
                <Field name="phone">
                  {({ field }) => (
                    <Input
                      {...field}
                      size="lg"
                      placeholder="1234567890"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="phone">
                  {msg => <Typography variant="small" color="red" className="text-sm">{msg}</Typography>}
                </ErrorMessage>

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Password
                </Typography>
                <Field name="password">
                  {({ field }) => (
                    <Input
                      {...field}
                      size="lg"
                      type="password"
                      placeholder="********"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="password">
                  {msg => <Typography variant="small" color="red" className="text-sm">{msg}</Typography>}
                </ErrorMessage>

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Profile Picture URL
                </Typography>
                <Field name="profilePictureUrl">
                  {({ field }) => (
                    <Input
                      {...field}
                      size="lg"
                      placeholder="https://example.com/profile.jpg"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="profilePictureUrl">
                  {msg => <Typography variant="small" color="red" className="text-sm">{msg}</Typography>}
                </ErrorMessage>
              </div>
              <Button
                className="mt-6"
                fullWidth
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
              >
                Register Now
              </Button>
              <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                Already have an account?
                <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default SignUp;
