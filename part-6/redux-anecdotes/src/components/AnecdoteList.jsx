import { useDispatch, useSelector } from "react-redux";
import { voteHandler } from "../reducers/anecdoteReducer";
import { notificationHandle } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const filteredAnec = useSelector((state) => {
    const anecdotes = state.anecdotes;
    const filter = state.filter;
    if (filter === "") return anecdotes;
    return anecdotes.filter(
      (anecdote) =>
        anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1
    );
  });

  // const anecdotes = useSelector((state) => state.anecdotes);
  // const fiterAnec = useSelector((state) => state.filter);
  // const filteredAnec = anecdotes.filter((anecdote) =>
  //   anecdote.content.toLowerCase().includes(fiterAnec)
  // );
  // const dispatch = useDispatch();

  const vote = (id, content) => {
    console.log("vote", id);
    //trigger action
    dispatch(voteHandler(id));
    // dispatch({ type: "VOTING", id });
    dispatch(notificationHandle(`You voted "${content}"`));
    //to remove notification after 5sec
    setTimeout(() => {
      dispatch(notificationHandle(null));
    }, 5000);
  };
  //toolkit return immutable state for this use spread operator
  const sortedVotes = [...filteredAnec].sort((a, b) =>
    a.votes > b.votes ? -1 : 1
  );

  return (
    <div>
      {sortedVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
