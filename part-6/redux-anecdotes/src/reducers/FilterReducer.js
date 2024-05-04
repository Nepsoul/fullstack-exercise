const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FITER-ANECDOTE":
      return action.payload;

    default:
      return state;
  }
};

//action creator
export const filterHandler = (filter) => {
  return {
    type: "FITER-ANECDOTE",
    payload: filter,
  };
};

export default filterReducer;
