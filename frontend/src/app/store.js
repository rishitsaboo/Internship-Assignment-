import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import companyReducer from "../features/company/companySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        company: companyReducer,
    },
});

export default store;