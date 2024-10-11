import { configureStore } from "@reduxjs/toolkit";

import usersReducer from '../features/users/userSlice';
import userProfileReducer from '../features/userProfile/userProfileSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        userProfile: userProfileReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;