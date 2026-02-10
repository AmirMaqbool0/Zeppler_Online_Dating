import { configureStore } from '@reduxjs/toolkit';
import getUidReducer from './userUid';

const store = configureStore({
  reducer: {
    uid: getUidReducer,
  },
});

export default store;
