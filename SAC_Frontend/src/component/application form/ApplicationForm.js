import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Card from "../UI/Card";
import classes from "./ApplicationForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const ApplicationForm = (props) => {
  const [isFormFocused, setIsFormFocused] = useState(false);
  const history = useHistory();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState(null) ;

  const {
    value: enteredName,
    isValid: isNameValid,
    hasError: nameHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: isEmailValid,
    hasError: emailHasError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((email) => email.includes("@"));

  const {
    value: enteredQualification,
    isValid: isQualificationValid,
    hasError: qualificationHasError,
    changeHandler: qualificationChangeHandler,
    blurHandler: qualificationBlurHandler,
    reset: resetQualification,
  } = useInput(isNotEmpty);

  const {
    value: enteredCoverLetter,
    isValid: isCoverLetterValid,
    hasError: coverLetterHasError,
    changeHandler: coverLetterChangeHandler,
    blurHandler: coverLetterBlurHandler,
    reset: resetCoverLetter,
  } = useInput(isNotEmpty);

  const {
    value: enteredAvailability,
    isValid: isAvailabilityValid,
    hasError: availabilityHasError,
    changeHandler: availabilityChangeHandler,
    blurHandler: availabilityBlurHandler,
    reset: resetAvailability,
  } = useInput(isNotEmpty);

  const {
    value: enteredAssessment,
    isValid: isAssessmentValid,
    hasError: assessmentHasError,
    changeHandler: assessmentChangeHandler,
    blurHandler: assessmentBlurHandler,
    reset: resetAssessment,
  } = useInput(isNotEmpty);

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isQualificationValid &&
    isCoverLetterValid &&
    isAssessmentValid &&
    isAvailabilityValid;

  const applicationFormSubmitHandler = async (event) => {
    // setMessage('submitting') ;
    setIsSubmitting(true);
    event.preventDefault();

    const application = {
      name: enteredName,
      email: enteredEmail,
      qualification: enteredQualification,
      coverLetter: enteredCoverLetter,
      availability: enteredAvailability,
      assessment: enteredAssessment,
    };

    await fetch("http://localhost:8000/applicationForm", {
      method: "POST",
      body: JSON.stringify(application),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(()=>{
      setIsSubmitting(false);
      resetName();
      resetEmail();
      resetQualification();
      resetAssessment();
      resetAvailability();
      resetCoverLetter();
      history.push("/");
    })
    .catch(()=>{
      setIsSubmitting(false);
      setError("Error in Submitting the Form");
      setDidSubmit(false);
    })


  };

  return (
    <Card className={classes["form-container"]}>
      <Prompt
        when={isFormFocused}
        message={(location) => {
          console.log("messaging");
          return "Are you sure you want to leave, all your data will be lost";
        }}
      />
      <h1>Application Form</h1>

      <form
        onFocus={() => {
          setDidSubmit(false);
          setIsSubmitting(false);
          setError(null);
          setIsFormFocused(true);
        }}
        onSubmit={applicationFormSubmitHandler}
        className={`flex-col ${classes.form}`}
      >
        <div className={`flex-row ${classes["form-heading"]}`}>
          <div className={`flex-col ${classes["form-control"]}`}>
            {/* <label htmlFor="name">Name</label> */}
            <input
              type="text"
              id="name"
              name="name"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              placeholder="Full Name"
            />

            {nameHasError && (
              <div className={classes.error}>This field is Required</div>
            )}
          </div>

          <div className={`flex-col ${classes["form-control"]}`}>
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              id="email"
              name="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              placeholder="Email"
            />

            {emailHasError && (
              <div className={classes.error}>This field is Required</div>
            )}
          </div>
        </div>

        <div className={`flex-col ${classes["form-control"]}`}>
          <label htmlFor="qualification">Academic Qualification</label>

          <select
            name="qualification"
            id="qualification"
            value={enteredQualification}
            onChange={qualificationChangeHandler}
            onBlur={qualificationBlurHandler}
          >
            <option value="" disabled="disabled">
              -- Select One --
            </option>
            <option value="No formal education">No formal education</option>
            <option value="Primary education">Primary education</option>
            <option value="Secondary education">
              Secondary education or high school
            </option>
            <option value="GED">GED</option>
            <option value="Vocational qualification">
              Vocational qualification
            </option>
            <option value="Bachelor's degree">Bachelor's degree</option>
            <option value="Master's degree">Master's degree</option>
            <option value="Doctorate or higher">Doctorate or higher</option>
          </select>

          {qualificationHasError && (
            <div className={classes.error}>This field is Required</div>
          )}
        </div>

        <div className={`flex-col ${classes["form-control"]}`}>
          <label htmlFor="coverLetter">Cover Letter</label>
          <input
            wrap="on"
            type="textarea"
            id="coverLetter"
            name="coverLetter"
            value={enteredCoverLetter}
            onChange={coverLetterChangeHandler}
            onBlur={coverLetterBlurHandler}
            placeholder="Tell us about yourself"
          />

          {coverLetterHasError && (
            <div className={classes.error}>This field is Required</div>
          )}
        </div>

        <div className={`flex-col ${classes["form-control"]}`}>
          <label htmlFor="availability">Your Availability</label>
          <input
            type="textarea"
            id="availability"
            name="availability"
            value={enteredAvailability}
            onChange={availabilityChangeHandler}
            onBlur={availabilityBlurHandler}
            placeholder="Tell us about your availability"
          />

          {availabilityHasError && (
            <div className={classes.error}>This field is Required</div>
          )}
        </div>

        <div className={`flex-col ${classes["form-control"]}`}>
          <label htmlFor="assessment">Assessment</label>
          <input
            type="textarea"
            id="assessment"
            name="assessment"
            value={enteredAssessment}
            onChange={assessmentChangeHandler}
            onBlur={assessmentBlurHandler}
            placeholder="How do you assess yourself"
          />

          {assessmentHasError && (
            <div className={classes.error}>This field is Required</div>
          )}
        </div>

        <div className={`flex-col ${classes["btnAction"]}`}>
          <button
            type="submit"
            className={classes.submitBtn}
            disabled={!isFormValid}
            onClick={() => setIsFormFocused(false)}
          >
            Submit
          </button>
        </div>

        {isSubmitting && <p>Submitting</p>}
        {!isSubmitting && error && (
          <p className={classes["error-text"]}>Error In Submitting The Data</p>
        )}
        {didSubmit && !error && <p>Submitted Successfully</p>}

        {/* {message === 'Error' && <h2>Error</h2>}
        {message === 'success' && <h2>Success</h2>}
        {message === 'submitting' && <h2>submitting</h2>} */}

        {/* {!isSubmitting && error && <h2>Error</h2>} */}
        {/* {!isSubmitting && !error && <h2>Success</h2>}
        {isSubmitting && !error} */}
      </form>
    </Card>
  );
};

export default ApplicationForm;
