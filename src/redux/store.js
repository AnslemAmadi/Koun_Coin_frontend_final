// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  coinCount: 0,
  animations: []
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementCoin(state, action) {
      state.coinCount += 1;
      state.animations.push(action.payload);
    },
    removeAnimation(state, action) {
      state.animations = state.animations.filter(anim => anim.id !== action.payload);
    }
  }
});

const store = configureStore({
  reducer: counterSlice.reducer
});

export const { incrementCoin, removeAnimation } = counterSlice.actions;
export default store;
