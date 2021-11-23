import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    username: string;
    email: string;
    refreshToken: string;
    accessToken: string;
}

interface CategoriesState {
    selected: string[];
}

interface AppState {
    auth: AuthState;
    categories: CategoriesState;
}

const initialState: AppState = {
    auth: {
        username: "",
        email: "",
        refreshToken: "",
        accessToken: "",
    },
    categories: {
        selected: [],
    },
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateAuth(state, action: PayloadAction<AuthState>) {
            state.auth = action.payload;
        },
        doLogout(state) {
            state.auth = initialState.auth;
        },
        updateSelectedCategories(state, action: PayloadAction<string[]>) {
            state.categories.selected = action.payload;
        }
    },
});

export const {updateAuth, doLogout, updateSelectedCategories} = appSlice.actions;
export default appSlice.reducer;
