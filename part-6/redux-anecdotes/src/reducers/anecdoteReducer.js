const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  //action creator
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    //action type
    case "VOTING":
      const newVote = state.map((anecdote) => {
        if (anecdote.id === action.payload) {
          return { ...anecdote, votes: anecdote.votes + 1 };
        }
        return anecdote;
      });
      return newVote;

    //action type
    case "NEWANECDOTE":
      const newAnecdote = asObject(action.payload);
      return [...state, newAnecdote];

    default:
      return state;
  }
};

//function that create action => action creator
export const voteHandler = (id) => {
  return { type: "VOTING", payload: id };
};

export const anecdoteHandler = (content) => {
  return {
    type: "NEWANECDOTE",
    payload: content,
  };
};
export default reducer;
