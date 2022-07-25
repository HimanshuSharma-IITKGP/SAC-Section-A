import { createSlice } from "@reduxjs/toolkit";

const initialOffers = {
  offersArray: [
    {
      id: "o1",
      title: "Machine Learning",
      company: "Google",
      location: "Work from home",
      startDate: "31 July 2022",
      duration: "3 months",
      stipend_min: 10000,
      stipend_max: 20000,
      lastDate: "29 July 2022",
      tag: "Internship",
    },
    {
      id: "o2",
      title: "Graphic Designing",
      company: "Amazon",
      location: "Delhi",
      startDate: "13 August 2022",
      duration: "4 months",
      stipend_min: 11000,
      stipend_max: 21000,
      lastDate: "5 August 2022",
      tag: "Full Time",
    },

    {
      id: "o3",
      title: "Android Development",
      company: "Microsoft",
      location: "Kharagpur",
      startDate: "31 August 2022",
      duration: "2 months",
      stipend_min: 14000,
      stipend_max: 27000,
      lastDate: "15 August 2022",
      tag: "Part Time",
    },

    {
      id: "o4",
      title: "Software testing",
      company: "HCL",
      location: "Noida",
      startDate: "2 september 2022",
      duration: "11 months",
      stipend_min: 14000,
      stipend_max: 27000,
      lastDate: "27 August 2022",
      tag: "Internship",
    },

    {
      id: "o5",
      title: "Algorithm Design and analysis",
      company: "uber",
      location: "New York",
      startDate: "25 August 2022",
      duration: "2 years",
      stipend_min: 9000,
      stipend_max: 29000,
      lastDate: "20 August 2022",
      tag: "Full Time",
    },
  ],
};

const offersSlice = createSlice({
  name: "offers",
  initialState: initialOffers,
  reducers: {
    addOffer(state, action) {
      console.log("adding offer to offersArray");
      console.log(action.payload);
      state.offersArray = [...state.offersArray, action.payload];
    },
    removeOffer(state, action) {},
    replaceOffers(state, action) {
      state.offersArray = action.payload;
    },
  },
});

export const offersActions = offersSlice.actions;
export default offersSlice;
