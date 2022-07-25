import React, { useReducer } from "react";
import Card from "../UI/Card";
import { FaFilter } from "react-icons/fa";
import classes from "./filter.module.css";

const initialFormState = {
  applyPreference: false, //
  category: "all",
  location: "all",
  workFromHome: false,
  internship: false,
  partTime: false,
  fullTime: false,
  stipend: 10000, //
  sortBy: "alphabetical",
};

const formStateReducer = (state, action) => {
  if (action.type === "FORM_CHANGE") {
    const newState = { ...state };
    newState[action.field] = action.value;
    return newState;
  } else if (action.type === "RESET") {
    return initialFormState;
  }
  return initialFormState;
};

const Filter = (props) => {
  const [formState, dispatchFormState] = useReducer(
    formStateReducer,
    initialFormState
  );

  const formStateChangeHandler = (event) => {
    // console.log(event.target.name, event.target.checked)
    const name = event.target.name;
    if (
      name === "stipend" ||
      name === "sortBy" ||
      name === "category" ||
      name === "location"
    ) {
      dispatchFormState({
        type: "FORM_CHANGE",
        field: event.target.name,
        value: event.target.value,
      });
    } else {
      dispatchFormState({
        type: "FORM_CHANGE",
        field: event.target.name,
        value: event.target.checked,
      });
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formState);

    if (formState.location.trim() === "" || formState.category.trim() === "") {
      console.log(`invalid form`);
      return;
    }
    props.onSubmit(formState);
  };
  return (
    <Card className={`flex-col ${classes["container"]}`}>
      <span className={classes.filter}>
        <FaFilter className="icon" /> Filters
      </span>

      <form
        onSubmit={formSubmitHandler}
        className={`flex-col ${classes["form"]}`}
      >
        <div className={classes["form-action-checkbox"]}>
          <input
            type="checkbox"
            id="applyPreference"
            name="applyPreference"
            checked={formState.applyPreference}
            onChange={formStateChangeHandler}
          />
          <label htmlFor="applyPreference">
            As per my <span>preferences</span>{" "}
          </label>
        </div>

        <div className={`flex-col ${classes["form-action-text"]}`}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formState.category}
            onChange={formStateChangeHandler}
          />
        </div>

        <div className={`flex-col ${classes["form-action-text"]}`}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formState.location}
            onChange={formStateChangeHandler}
          />
        </div>

        <div className={classes["form-action-checkbox"]}>
          <input
            type="checkbox"
            id="workFromHome"
            name="workFromHome"
            checked={formState.workFromHome}
            onChange={formStateChangeHandler}
          />
          <label htmlFor="workFromHome">Include Work from Home</label>
        </div>

        <div className={classes["form-action-checkbox"]}>
          <input
            type="checkbox"
            id="internship"
            name="internship"
            checked={formState.internship}
            onChange={formStateChangeHandler}
          />
          <label htmlFor="internship">Internship</label>
        </div>

        <div className={classes["form-action-checkbox"]}>
          <input
            type="checkbox"
            id="partTime"
            name="partTime"
            checked={formState.partTime}
            onChange={formStateChangeHandler}
          />
          <label htmlFor="partTime">Part-Time</label>
        </div>

        <div className={classes["form-action-checkbox"]}>
          <input
            type="checkbox"
            id="fullTime"
            name="fullTime"
            checked={formState.fullTime}
            onChange={formStateChangeHandler}
          />
          <label htmlFor="fullTime">Full-Time</label>
        </div>

        <div className={classes["form-action-text"]}>
          <label htmlFor="stipend">Desired minimum monthly stipend</label>
          <input
            className={classes["range-input"]}
            type="range"
            id="stipend"
            name="stipend"
            min="0"
            max="20000"
            value={formState.stipend}
            onChange={formStateChangeHandler}
          />
          <p>{`₹ ${formState.stipend}`}</p>
        </div>

        <div className={classes["form-action-text"]}>
          <label htmlFor="sortBy">Sort by</label>

          <select
            name="sortBy"
            id="sortBy"
            value={formState.sortBy}
            onChange={formStateChangeHandler}
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="lastDate">Last Date</option>
          </select>
        </div>

        <div className={classes["form-action"]}>
          <button
            type="button"
            className={classes.cancel}
            onClick={() => {
              dispatchFormState({ action: "RESET" });
              props.onSubmit(initialFormState);
            }}
          >
            Clear All
          </button>
          <button
            type="submit"
            disabled={!formState.applyPreference}
            className={classes.searchBtn}
          >
            Search
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Filter;
