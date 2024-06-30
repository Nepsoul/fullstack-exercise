import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    //action creator
    voteHandler(state, action) {
      const votingId = action.payload;
      const anedoteToChange = state.find((n) => n.id === votingId);
      return state.map((anecdote) =>
        anecdote.id === votingId
          ? { ...anedoteToChange, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    anecdoteHandler(state, action) {
      const content = action.payload;
      return state.concat(content);
    },

    // appendAnecdote(state, action) {
    //   return state.concat(action.payload);
    // },

    //directly replace all content array, action creator
    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { voteHandler, anecdoteHandler, appendAnecdote, setAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
