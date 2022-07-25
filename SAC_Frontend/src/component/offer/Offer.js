import React from "react";
import Card from "../UI/Card";
import Detail from "./Detail";
import { Link } from "react-router-dom";
import classes from "./Offer.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { BsHourglassSplit } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
// import { CaretRightFill } from "react-bootstrap-icons";

const Offer = (props) => {
  const {
    title,
    company,
    location,
    startDate,
    duration,
    stipend_min,
    stipend_max,
    lastDate,
    tag,
    id,
  } = props;
  return (
    <Card className={classes["container"]}>
      <div className={classes["offer-heading"]}>
        <h2 className={classes["title"]}>{title}</h2>
      </div>

      <p className={classes["company"]}>{company}</p>

      <div className={classes["location"]}>
        <GoLocation className={classes["icon"]} />
        {location}
      </div>

      <div className={classes["details"]}>
        <Detail name="Start Date" value={startDate}>
          <AiOutlinePlayCircle className={classes["icon"]} />{" "}
        </Detail>
        <Detail name="Duration" value={duration}>
          <AiOutlineCalendar className={classes["icon"]} />
        </Detail>
        <Detail name="Stipend" value={`₹ ${stipend_min}-${stipend_max}/month`}>
          <FaRegMoneyBillAlt className={classes["icon"]} />
        </Detail>
        <Detail name="Apply By" value={lastDate}>
          <BsHourglassSplit className={classes["icon"]} />
        </Detail>
      </div>

      <div className={classes["offer-footer"]}>
        <span className={classes["tag"]}>{tag}</span>
        <Link
          to={`/application/${id}`}
          className={classes["link"]}
          style={{ fontWeight: "700" }}
        >
          <span>Apply Now</span>
          <RiArrowRightSLine className={classes["arrow"]} />
        </Link>
      </div>
    </Card>
  );
};

export default Offer;
