import { createSlice } from "@reduxjs/toolkit";

const notificatinSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notificationHandle(state, action) {
      return action.payload;
    },
  },
});

export const { notificationHandle } = notificatinSlice.actions;
export default notificatinSlice.reducer;
