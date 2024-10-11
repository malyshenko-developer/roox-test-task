import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import axios from "axios";

interface UsersState {
    users: User[];
    isLoading: boolean;
}

const initialState: UsersState = {
    users: [],
    isLoading: false
};

export const fetchUsers = createAsyncThunk(
    'users/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
            return response.data;
        } catch(error) {
            return thunkApi.rejectWithValue('Ошибка при получении списка пользователей');
        }
    }
)

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        sortByCity(state) {
            state.users = [...state.users].sort((a, b) => a.address.city.localeCompare(b.address.city));
        },
        sortByCompany(state) {
            state.users = [...state.users].sort((a, b) => a.company.name.localeCompare(b.company.name));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.isLoading = false;
            state.users = action.payload;
        }),
        builder.addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
        })
    }
});

export const { sortByCity, sortByCompany } = userSlice.actions;
export default userSlice.reducer;