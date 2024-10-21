import React from 'react'
import { useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";


const ReCAPTCHAForm = (props) => {
  const recaptchaRef =useRef();

  const onSubmitWithReCAPTCHA = async () => {
    const token = await recaptchaRef.current.executeAsync();

    // apply to form data
    
  }

  return (
    <form onSubmit={onSubmitWithReCAPTCHA}>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey="6LdmW04qAAAAAEkCdYv1iA3LfoJaZmRlwse5EWqt"
      />
    </form>
  )

}
export default ReCAPTCHAForm