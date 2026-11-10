import { configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080/api/counter';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    setCounter: (state, action) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
      state.lastUpdated = new Date().toISOString();
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setCounter, setLoading, setError } = counterSlice.actions;

export const fetchCounter = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(API_URL);
    dispatch(setCounter(response.data));
  } catch (err) {
    dispatch(
      setError(err.response?.data?.message || err.message || 'Failed to fetch counter')
    );
  }
};

export const updateCounter = (action) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`${API_URL}/${action}`);
    dispatch(setCounter(response.data));
  } catch (err) {
    dispatch(
      setError(
        err.response?.data?.message || err.message || `Failed to ${action} counter`
      )
    );
  }
};

export const createAppStore = () =>
  configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
  });

export const store = createAppStore();

