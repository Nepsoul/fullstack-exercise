import { useDispatch, useSelector } from "react-redux";
import { voteHandler } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const fiterAnec=useSelector(state=>state.filter)
  const filteredAnec=anecdotes.filter(anecdote=>anecdote.content.toLowerCase().includes(fiterAnec))
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    //trigger action
    dispatch(voteHandler(id));
    // dispatch({ type: "VOTING", id });
  };
//toolkit return immutable state for this use spread operator 
  const sortedVotes = [...filteredAnec].sort((a, b) => (a.votes > b.votes ? -1 : 1));

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
