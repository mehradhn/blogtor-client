import { createSlice } from "@reduxjs/toolkit/";

export const UserSlice = createSlice({
  name: "users",
  initialState: {
    current_user: null,
  },
  reducers: {
    set_current_user: (state, action) => {
      state.current_user = action.payload;
    },
  },
});


export const {set_current_user} = UserSlice.actions
export const this_user = (state) => state.users.current_user
// ask sara why do that?
export default UserSlice.reducer;
