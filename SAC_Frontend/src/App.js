import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { offersActions } from "./store/offers-slice";
import { Route, Switch } from "react-router-dom";
import Offer from "./component/offer/Offer";
import Filter from "./component/filter/Filter";
import classes from "./app.module.css";
import SearchBox from "./component/searchBox/SearchBox";
import OfferCreationForm from "./component/offer-creation form/OfferCreationForm";
import ApplicationForm from "./component/application form/ApplicationForm";
import Navbar from "./component/navbar/Navbar";

const initialFormState = {
  applyPreference: false, //
  category: "",
  location: "",
  workFromHome: false,
  internship: false,
  partTime: false,
  stipend: 0, //
  sortBy: "alphabetical",
};

let isInitial = false;

const App = () => {
  const offersList = useSelector((state) => state.offers.offersArray);
  let modifiedOffersList = offersList;
  const dispatch = useDispatch();
  const [submittedForm, setSubmittedForm] = useState(initialFormState);

  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const getOffersData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://sac-projects-default-rtdb.firebaseio.com/offers.json"
      );

      console.log(response.ok);
      if (!response.ok) {
        throw new Error("error in Fetching Data from firebase");
      }

      const responseData = await response.json();

      dispatch(offersActions.replaceOffers(responseData));
      setIsLoading(false);
      setHttpError(null);
      console.log(responseData);
    };

    getOffersData()
      .then()
      .catch((e) => {
        setIsLoading(false);
        setHttpError("Error In Fetching The Data");
      });
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    const sendOffersData = async () => {
      const response = await fetch(
        "https://sac-projects-default-rtdb.firebaseio.com/offers.json",
        {
          method: "PUT",
          body: JSON.stringify(offersList),
        }
      );

      if (!response.ok) {
        throw new Error("error in sending offers");
      }
    };

    sendOffersData()
      .then()
      .catch(() => {
        console.log("error sending the data");
      });
  }, [offersList]);

  const modifyOffersList = (modifications) => {
    setSubmittedForm(modifications);
  };

  if (submittedForm.applyPreference) {
    modifiedOffersList = offersList.filter((offer) => {
      return (
        parseInt(offer.stipend_min) >= parseInt(submittedForm.stipend) &&
        /work from home/i.test(offer.location) === submittedForm.workFromHome &&
        /internship/i.test(offer.tag) === submittedForm.internship &&
        /partTime|part-time|Part Time/i.test(offer.tag) ===
          submittedForm.partTime &&
        /fullTime|full-time|Full Time/i.test(offer.tag) ===
          submittedForm.fullTime
      );
    });
  }

  // if (submittedForm.sortBy === "alphabetical") {
  //   // console.log("alphabetical");
  //   const copy = [...modifiedOffersList];
  //   copy.sort((a, b) => {
  //     return a.title >= b.title ? 1 : -1;
  //   });
  //   modifiedOffersList = copy;
  // } else if (submittedForm.sortBy === "lastDate") {
  //   // console.log("lastDate");
  //   const copy = [...modifiedOffersList];
  //   copy.sort((a, b) => {
  //     return new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime();
  //   });
  //   modifiedOffersList = copy;
  // }

  console.log(modifiedOffersList);

  const list = modifiedOffersList.map((offer) => {
    return (
      <Offer
        title={offer.title}
        company={offer.company}
        location={offer.location}
        startDate={offer.startDate}
        duration={offer.duration}
        stipend_min={offer.stipend_min}
        stipend_max={offer.stipend_max}
        lastDate={offer.lastDate}
        tag={offer.tag}
        id={offer.id}
        key={offer.id}
      />
    );
  });

  // console.log(list) ;

  const HomePageContent = (
    <main className={classes.container}>
      <section className={classes["side-panel"]}>
        <SearchBox />
        <Filter onSubmit={modifyOffersList} />
      </section>

      {isLoading && <p className={classes["loading-text"]}>loading...</p>}
      {!isLoading && httpError && (
        <p className={classes["error-text"]}>{httpError}</p>
      )}
      {!isLoading && !httpError && list.length === 0 && (
        <section className={classes.offers}>
          <p className={classes["no-results"]}>No Results Found</p>
        </section>
      )}
      {!isLoading && !httpError && list.length !== 0 && (
        <section className={classes.offers}>{list}</section>
      )}
    </main>
  );

  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          {HomePageContent}
        </Route>

        <Route path="/createOffer">
          <OfferCreationForm />
        </Route>

        <Route path="/application/:offerId">
          <ApplicationForm />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default App;
