import { createSlice } from '@reduxjs/toolkit';

const getMatchesSlice = createSlice({
  name: 'matches',
  initialState: {
    matches: 0,
    
  },
  reducers: {
    setMatches(state, action) {
      state.matches = action.payload;
    },
   
  }
});

export const { setMatches } = getMatchesSlice.actions;
export default getMatchesSlice.reducer;
