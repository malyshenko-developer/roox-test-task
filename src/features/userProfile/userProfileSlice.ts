import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import axios from "axios";

interface UserProfileState {
    userData: User & { comment: string } | null;
    isLoading: boolean;
}

const initialState: UserProfileState = {
    userData: null,
    isLoading: false
};

export const fetchUserById = createAsyncThunk(
    'userProfile/fetchAll',
    async (userId: string, thunkApi) => {
        try {
            const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
            return response.data;
        } catch(error) {
            return thunkApi.rejectWithValue('Ошибка при получении профиля пользователя');
        }
    }
)

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        updateUserData: (state, action: PayloadAction<User & { comment: string }>) => {
            state.userData = action.payload;
            console.log(state.userData);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.userData = {
                ...action.payload,
                comment: ''
            };
        }),
        builder.addCase(fetchUserById.pending, (state) => {
            state.isLoading = true;
        })
    }
});

export const { updateUserData } = userProfileSlice.actions;

export default userProfileSlice.reducer;