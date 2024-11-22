import React, { useEffect, useRef, useState } from 'react';
import {
  Input,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { validationSchema } from './validationSchema';
import TitleComponent from '@/components/common/TitleComponent';
import ReactQuill, { Quill } from 'react-quill';

import { addFaq, editFaq, getSingleFaq } from '@/redux/admin/actions/FAQ';
import 'react-quill/dist/quill.snow.css';
import { TailSpin } from 'react-loader-spinner';
import HeaderTitle from '@/components/common/HeaderTitle';
import Breadcrumb from '@/widgets/layout/TopNavigation';
import { handleExtraSpaces } from '@/Helpers/globalfunctions';
import DOMPurify from 'dompurify';
const initialValues = {
  question: "",
  answer: "",
  active: true,
};

const MAX_EDITOR_LENGTH = 1000;


const CreateFaq = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reactQuillRef = useRef();
  const { isAdding, faq, isFetching, editPage } = useSelector((state) => state.faq);
  console.log(faq, "faq data");

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
    setFieldTouched,
    dirty,
    isValid
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values, "faq values");
      setTouched({}, false);
      if (id) {
        const data = {
          question: handleExtraSpaces(values.question),
          answer: handleExtraSpaces(values.answer),
          active: values.active
        }
        dispatch(editFaq(id, data, navigate, editPage))
        // setFieldValue("answer", "")
      } else {
        const data = {
          question: handleExtraSpaces(values.question),
          answer: handleExtraSpaces(values.answer),
          active: values.active
        }
        dispatch(addFaq(values, navigate))
      }
      setErrors({})
      setTouched({}, false);
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getSingleFaq(id))
    }
  }, []);
  useEffect(() => {
    console.log(faq)
    if (id !== undefined && faq) {
      setFieldValue("question", faq.question || "")
      setFieldValue("answer", faq.answer || "")
      setFieldValue("active", faq.active);
    } else {
      setFieldValue("question", "")
      setFieldValue("answer", "")
      setFieldValue("active", false)
    }

  }, [faq, setFieldValue])

  ReactQuill.Quill.register('modules/maxlength', function (quill, options) {
    quill.on('text-change', function () {
      const textLength = quill.getText().trim().length;
      if (textLength > options.maxLength) {
        quill.deleteText(options.maxLength, textLength - options.maxLength);
      }
    });
  });

  const modules = {
    toolbar: {
      container: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
    },
    maxlength: { maxLength: MAX_EDITOR_LENGTH }, // Use the custom maxlength module
  };

  const handleAnswerChange=(value)=>{
    console.log(value, "answer value")

    const cleanedValue = value
    .replace(/<ul>\s*<\/ul>/g, '') // Remove empty <ul> tags
    .replace(/<li>\s*<\/li>/g, '') // Remove empty <li> tags
    .replace(/<p>(\s|<br>)*<\/p>/g, '') // Remove empty <p> tags
    .replace(/<ul>(\s|<li><br><\/li>)*<\/ul>/g, ''); // Remove <ul> with empty <li><br></li>

    console.log(cleanedValue, "cleaned value")
    setFieldValue("answer", value)
  }
  const breadcrumbData = [
    {
      name: 'FAQ Management',
      url: '/dashboard/admin/faq',
      children: [
        {
          name: id ? 'Update FAQ' : 'Create FAQ',
          url: id
            ? ''
            : '/dashboard/admin/faq',
        },
      ],
    }
  ];
  return (
    <div>
      <TitleComponent title={id ? "CORPZO | Edit FAQ" : "CORPZO | Create FAQ"} />
      <HeaderTitle title={id ? "Update FAQ" : "Create FAQ"} />
      <Breadcrumb items={breadcrumbData} />
      {
        id && isFetching ? (
          <div className="flex justify-center items-center min-h-screen">
            <TailSpin height={50} width={50} color="blue" />
          </div>
        ) : (<>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Question
            </Typography>
            <Input
              size="sm"
              placeholder={id ? "Edit Question" : "Add Question"}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name='question'
              value={values.question}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => touched.question = true}
              maxLength={200}
            />
            {errors.question && touched.question && <p className='text-sm text-red-500'>{errors.question}</p>}

            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Answer
            </Typography>
            <ReactQuill
              className='h-50'
              theme="snow"
              placeholder={"Write something awesome..."}
              onChange={handleAnswerChange}
              onBlur={() => setFieldTouched('answer', true)}
              name="answer"

              value={values.answer}
              modules={modules}
              readOnly={false}
            />
            {errors.answer && touched.answer && <p className='text-sm text-red-500'>{errors.answer}</p>}

            <button
              type='submit'
              disabled={isAdding || !(dirty && isValid)}
              className={`w-full mt-4 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isAdding || !(dirty && isValid) ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} focus:ring-${isAdding || !(dirty && isValid) ? 'gray-400' : 'blue-500'}`}
            >
              {isAdding ?
                <div className='flex justify-center items-center gap-3'>
                  <Spinner color='white' className="h-4 w-4" />
                  {id ? "Updating FAQ" : "Adding FAQ"}
                </div>
                : id ? "Update FAQ" : "Add FAQ"}
            </button>
          </form>
        </>)


      }

    </div>
  );
};

export default CreateFaq;
