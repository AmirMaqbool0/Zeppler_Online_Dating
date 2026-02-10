import { configureStore } from '@reduxjs/toolkit';
import getMatchesUsers from './MatchesUser';

const store = configureStore({
  reducer: {
    matches: getMatchesUsers,
  },
});

export default store;
