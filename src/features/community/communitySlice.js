import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStorage } from './communityServices';
import { fetchCommunity } from './communityApi';

const initialState = {
  list: [],
  isLoading: false,
  userList: [], 
  error: ""
};

export const getCommunity = createAsyncThunk(
  'community/fetchCommunity',
  async (newList) => {
    const list = getStorage()
    const res = fetchCommunity(newList || list)
    return res;
  }
);

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
    },
    remove: (state, action) => {
      state.list = state.list.filter(username => username !== action.payload );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommunity.pending, (state) => {
        state.error = ""
        state.isLoading = true;
      })
      .addCase(getCommunity.fulfilled, (state, action) => {
        state.isLoading =  false;
        state.error = ""
        state.userList = action.payload;
      })
      .addCase(getCommunity.rejected, (state, action) => {
        state.isLoading =  false;
        state.error = action.error.message;
      })
  },
});

export const communityUsers = (state) => state.community;


export const { add, remove } = communitySlice.actions;

export default communitySlice.reducer;
