import { configureStore } from "@reduxjs/toolkit";
import offersSlice from "./offers-slice";

const store = configureStore({
  reducer: {
    offers: offersSlice.reducer
  }
})

export default store ;

