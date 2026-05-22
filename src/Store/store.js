import { configureStore } from "@reduxjs/toolkit";
import mocktest from "./slice/mocktestSlice";

const store = configureStore({
     reducer:{mocktest}
});


export default store;