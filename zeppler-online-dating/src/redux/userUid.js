import { createSlice } from '@reduxjs/toolkit';

const getUidSlice = createSlice({
  name: 'uid',
  initialState: {
    uid: "",
    userData: {},
    otherUserId:'',
  },
  reducers: {
    setUserid(state, action) {
      state.uid = action.payload;
    },
    getData (state,action){
     state.userData=action.payload
    },
    setOtherUser (state,action) {
       state.otherUserId=action.payload
    }
  }
});

export const { setUserid,getData,setOtherUser } = getUidSlice.actions;
export default getUidSlice.reducer;
