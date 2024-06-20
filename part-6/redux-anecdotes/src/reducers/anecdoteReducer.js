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

    appendAnecdote(state, action) {
      state.concat(action.payload);
    },

    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { voteHandler, anecdoteHandler, appendAnecdote, setAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
