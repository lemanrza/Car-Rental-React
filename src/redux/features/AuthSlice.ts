import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './AuthApi';
import type { User } from '@/types/authType';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isLoggedIn: boolean;
}

const savedUser = localStorage.getItem('user');

const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    loading: false,
    error: null,
    isLoggedIn: !!savedUser,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
            localStorage.removeItem('user');
        },
        updateBalance(state, action: PayloadAction<number>) {
            if (state.user) {
                state.user.balance = action.payload;
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            const userWithImage = {
                ...action.payload,
                profileImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            };
            state.user = userWithImage;
            state.isLoggedIn = true;
            state.error = null;
            localStorage.setItem("user", JSON.stringify(userWithImage));
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Registration failed';
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
            console.log("User payload on login:", action.payload);

            if (action.payload.isBanned) {
                state.loading = false;
                state.error = "Your account has been banned.";
                state.user = null;
                state.isLoggedIn = false;
                localStorage.removeItem("user");
                return; 
            }

            state.user = {
                ...action.payload,
                profileImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            };
            state.isLoggedIn = true;
            state.loading = false;
            state.error = null;
            localStorage.setItem("user", JSON.stringify(state.user));
        });


        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed';
        });
    },
});

export const { logout, updateBalance, setUser } = authSlice.actions;

export default authSlice.reducer;
