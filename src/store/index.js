import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth.js";
import expenseSlice from "./Expense";
import themeSlice from "./themeSlice.js";

const store = configureStore({
  reducer: { auth: AuthSlice, expense: expenseSlice, theme: themeSlice },
});

export default store;
