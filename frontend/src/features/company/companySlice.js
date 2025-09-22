import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    company: null,
    loading: false,
    error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCompany, startLoading, stopLoading, setError } = companySlice.actions;
export default companySlice.reducer;