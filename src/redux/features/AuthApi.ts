import type { User } from '@/types/authType';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/users'; // Use the users endpoint directly

export const registerUser = createAsyncThunk<
    User,
    { username: string; email: string; password: string },
    { rejectValue: string }
>(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const resCheck = await axios.get(`${API_BASE}?email=${userData.email}`);
            if (resCheck.data.length > 0) {
                return rejectWithValue('Email already exists');
            }

            const newUser: Partial<User> = {
                ...userData,
                role: 'CLIENT',
                profileImage: '',
                balance: 0,
                hostRequest: false,
                isBanned: false,
                createdAt: new Date().toISOString()
            };

            const response = await axios.post(API_BASE, newUser);
            return response.data as User;
        } catch (err: any) {
            return rejectWithValue(err.message || 'Registration failed');
        }
    }
);

// LOGIN USER (finds user by email + password)
export const loginUser = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string }
>(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE}?email=${credentials.email}&password=${credentials.password}`);
            if (response.data.length === 0) {
                return rejectWithValue('Invalid email or password');
            }

            return response.data[0] as User;
        } catch (err: any) {
            return rejectWithValue(err.message || 'Login failed');
        }
    }
);
