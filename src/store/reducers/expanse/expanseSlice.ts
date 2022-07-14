import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expanse } from "../../../types/expanse";
import { addExpanseAsync, restoreExpansesAsync } from "./expanseActions";

type ExpanseState = {
  expanses: Expanse[];
};

export const initialState: ExpanseState = {
  expanses: [],
};

export const expanseSlice = createSlice({
  name: "expanse",
  initialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder.addCase(addExpanseAsync.fulfilled, (state, action) => {
      state.expanses = [...state.expanses, action.payload];
    });
    builder.addCase(restoreExpansesAsync.fulfilled, (state, action) => {
      state.expanses = action.payload;
    });
  },
});

export const expanseReducer = expanseSlice.reducer;
export const expanseActions = expanseSlice.actions;
