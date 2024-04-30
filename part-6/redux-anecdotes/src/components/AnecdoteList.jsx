import { useDispatch, useSelector } from "react-redux";
import { voteHandler } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    //trigger action
    dispatch(voteHandler(id));
    // dispatch({ type: "VOTING", id });
  };

  const sortedVotes = anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1));

  return (
    <div>
      {sortedVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
