import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  thumbnail: string;
  raw: any;
};

// fetch many users from randomuser API
export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (count: number = 500) => {
    const res = await axios.get(
      `https://randomuser.me/api/?results=${count}&nat=us`
    );
    console.log(res.data.results);
    return res.data.results;
  }
);

type UsersState = {
  items: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.items = action.payload.map((u, idx) => ({
          id: u.login.uuid ?? `u-${idx}`,
          name: `${u.name.first} ${u.name.last}`,
          email: u.email,
          country: u.location.country,
          thumbnail: u.picture.thumbnail,
          raw: u,
        }));
        state.loading = false;
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch";
    });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
