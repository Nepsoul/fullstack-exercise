import { useDispatch } from "react-redux";
// import {  appendAnecdote } from "../reducers/anecdoteReducer";
import { anecdoteHandler } from "../reducers/anecdoteReducer";
import { notificationHandle } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    // const anecObj = { content, votes: 0 };
    const addedAnec = await anecdoteService.create(content) 
    // const addedAnec = await anecdoteService.create(anecObj); //alternate
    // dispatch(appendAnecdote(addedAnec));
    dispatch(anecdoteHandler(addedAnec));
    e.target.anecdote.value = "";
    dispatch(notificationHandle(`'${content}' has been added`));
    setTimeout(() => {
      dispatch(notificationHandle(null));
    }, 5000);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default AnecdoteForm;
