import React, { useState } from "react";
import Card from "../UI/Card";
import { Prompt } from "react-router-dom";
import useInput from "../../hooks/use-input";
import classes from "./OfferCreationForm.module.css";

import { offersActions } from "../../store/offers-slice";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

const isNotEmpty = (value) => value.trim() !== "";
const isPositiveAndNonEmpty = (value) => value > 0 && value.trim() !== "";

const OfferCreationForm = (props) => {
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [areStipendsValid, setAreStipendsValid] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();




  const {
    value: enteredTitle,
    isValid: isTitleValid,
    hasError: titleHasError,
    changeHandler: titleChangeHandler,
    blurHandler: titleBlurHandler,
    reset: resetTitle,
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
    value: enteredCompany,
    isValid: isCompanyValid,
    hasError: companyHasError,
    changeHandler: companyChangeHandler,
    blurHandler: companyBlurHandler,
    reset: resetCompany,
  } = useInput(isNotEmpty);

  const {
    value: enteredLocation,
    isValid: isLocationValid,
    hasError: locationHasError,
    changeHandler: locationChangeHandler,
    blurHandler: locationBlurHandler,
    reset: resetLocation,
  } = useInput(isNotEmpty);

  const {
    value: enteredDOJ,
    isValid: isDOJValid,
    hasError: DOJHasError,
    changeHandler: DOJChangeHandler,
    blurHandler: DOJBlurHandler,
    reset: resetDOJ,
  } = useInput(isNotEmpty);

  const {
    value: enteredDuration,
    isValid: isDurationValid,
    hasError: durationHasError,
    changeHandler: durationChangeHandler,
    blurHandler: durationBlurHandler,
    reset: resetDuration,
  } = useInput(isNotEmpty);

  const {
    value: enteredMinStipend,
    isValid: isMinStipendValid,
    hasError: minStipendHasError,
    changeHandler: minStipendChangeHandler,
    blurHandler: minStipendBlurHandler,
    reset: resetMinStipend,
  } = useInput(isPositiveAndNonEmpty);

  const {
    value: enteredMaxStipend,
    isValid: isMaxStipendValid,
    hasError: maxStipendHasError,
    changeHandler: maxStipendChangeHandler,
    blurHandler: maxStipendBlurHandler,
    reset: resetMaxStipend,
  } = useInput(isPositiveAndNonEmpty);

  const {
    value: enteredLastDate,
    isValid: isLastDateValid,
    hasError: lastDateHasError,
    changeHandler: lastDateChangeHandler,
    blurHandler: lastDateBlurHandler,
    reset: resetLastDate,
  } = useInput(isNotEmpty);

  const {
    value: enteredJobType,
    isValid: isJobTypeValid,
    hasError: jobTypeHasError,
    changeHandler: jobTypeChangeHandler,
    blurHandler: jobTypeBlurHandler,
    reset: resetJobType,
  } = useInput(isNotEmpty, "internship");

  const isFormValid =
    isTitleValid &&
    isEmailValid &&
    isCompanyValid &&
    isLocationValid &&
    isDOJValid &&
    isDurationValid &&
    isMinStipendValid &&
    isMaxStipendValid &&
    isLastDateValid &&
    isJobTypeValid;

  const OfferCreationFormSubmitHandler = (event) => {
    event.preventDefault();

    if (enteredMinStipend > enteredMaxStipend) {
      setAreStipendsValid(false);
      return;
    }

    dispatch(
      offersActions.addOffer({
        id: Math.random(),
        email: enteredEmail,
        title: enteredTitle,
        company: enteredCompany,
        location: enteredLocation,
        startDate: enteredDOJ,
        duration: enteredDuration,
        stipend_min: enteredMinStipend,
        stipend_max: enteredMaxStipend,
        lastDate: enteredLastDate,
        tag: enteredJobType,
      })
    );

    history.push("/");

    resetTitle();
    resetEmail();
    resetCompany();
    resetLocation();
    resetDOJ();
    resetDuration();
    resetMinStipend();
    resetMaxStipend();
    resetLastDate();
    resetJobType();
    setAreStipendsValid(true);
  };

  // console.log(isFormFocused);

  return (
    <Card className={classes["form-container"]}>
      <Prompt
        when={isFormFocused}
        message={(location) => {
          // console.log("messaging");
          return "Are you sure you want to leave, all your data will be lost";
        }}
      />
      <h1>Create Offer</h1>
      <form
        onFocus={() => {
          // console.log("focusing");
          setIsFormFocused(true);
        }}
        onSubmit={OfferCreationFormSubmitHandler}
        className={classes.form}
      >
        <div>
          {/* <label htmlFor="title">Title (Field of Work)</label> */}
          <input
            id="title"
            name="title"
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            placeholder="Title"
          />
          {titleHasError && (
            <p className={classes.error}>This field, is Required</p>
          )}
        </div>

        <div>
          {/* <label htmlFor="title">Title (Field of Work)</label> */}
          <input
            id="email"
            name="email"
            type="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            placeholder="Email"
          />
          {emailHasError && (
            <p className={classes.error}>This field, is Required</p>
          )}
        </div>

        <div>
          {/* <label htmlFor="company">Company</label> */}
          <input
            id="company"
            name="company"
            type="text"
            value={enteredCompany}
            onChange={companyChangeHandler}
            onBlur={companyBlurHandler}
            placeholder="Company"
          />
          {companyHasError && (
            <p className={classes.error}>This field, is Required</p>
          )}
        </div>

        <div>
          {/* <label htmlFor="location">Location (city) </label> */}
          <input
            id="location"
            name="location"
            type="text"
            value={enteredLocation}
            onChange={locationChangeHandler}
            onBlur={locationBlurHandler}
            placeholder="Location"
          />
          {locationHasError && (
            <p className={classes.error}>This field, is Required</p>
          )}
        </div>

        <div className={classes.duration}>
          {/* <label htmlFor="duration">Duration of work</label> */}
          <input
            id="duration"
            name="duration"
            type="text"
            value={enteredDuration}
            onChange={durationChangeHandler}
            onBlur={durationBlurHandler}
            placeholder="Duration of Work"
          />
          {durationHasError && (
            <p className={classes.error}>This field, is Required</p>
          )}
        </div>

        <div className={classes.minStipend}>
          {/* <label htmlFor="minStipend">Minimum Stipend (in INR)</label> */}
          <input
            id="minStipend"
            name="minStipend"
            type="number"
            value={enteredMinStipend}
            onChange={minStipendChangeHandler}
            onBlur={minStipendBlurHandler}
            placeholder="Minimum Stipend"
          />
          {minStipendHasError && (
            <p className={classes.error}>
              min stipend has to be positive & non empty
            </p>
          )}
        </div>

        <div>
          {/* <label htmlFor="maxStipend">Maximum Stipend (in INR)</label> */}
          <input
            id="maxStipend"
            name="maxStipend"
            type="number"
            value={enteredMaxStipend}
            onChange={maxStipendChangeHandler}
            onBlur={maxStipendBlurHandler}
            placeholder="Maximum Stipend"
          />
          {maxStipendHasError && (
            <p className={classes.error}>
              max stipend has to be positive & non empty
            </p>
          )}
          {!areStipendsValid && (
            <p className={classes.error}> Max can't be less than min </p>
          )}
        </div>

        <div>
          <label htmlFor="DOJ">Date of Joining</label>
          <input
            id="DOJ"
            name="DOJ"
            type="date"
            value={enteredDOJ}
            onChange={DOJChangeHandler}
            onBlur={DOJBlurHandler}
            placeholder="Date Of Joining"
          />
          {DOJHasError && (
            <p className={classes.error}>This field, is Required</p>
          )}
        </div>

        <div>
          <label htmlFor="lastDate">Last Date of Application</label>
          <input
            id="lastDate"
            name="lastDate"
            type="date"
            value={enteredLastDate}
            onChange={lastDateChangeHandler}
            onBlur={lastDateBlurHandler}
            placeholder="Last Date of Application"
          />
          {lastDateHasError && (
            <p className={classes.error}>This field, is Required</p>
          )}
        </div>

        <div>
          <label htmlFor="jobType">Job Type</label>
          <select
            name="jobType"
            id="jobType"
            value={enteredJobType}
            onChange={jobTypeChangeHandler}
            onBlur={jobTypeBlurHandler}
            // defaultValue="internship"
          >
            <option value="partTime">Part Time</option>
            <option value="fullTime">Full Time</option>
            <option value="internship">Internship</option>
          </select>

          {jobTypeHasError && <p className={classes.error}>Invalid job type</p>}
        </div>

        <div className={classes["form-action"]}>
          <button
            type="submit"
            disabled={!isFormValid}
            className={classes.submitBtn}
            onClick={() => setIsFormFocused(false)}
          >
            Submit
          </button>
        </div>
      </form>
    </Card>
  );
};;
export default OfferCreationForm;
