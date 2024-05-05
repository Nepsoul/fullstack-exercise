import { useDispatch } from "react-redux";
import { anecdoteHandler } from "../reducers/anecdoteReducer";
import { notificationHandle } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAnecdote = (e) => {
    e.preventDefault();
    const newAnec = e.target.anecdote.value;
    dispatch(anecdoteHandler(newAnec));
    e.target.anecdote.value = "";
    dispatch(notificationHandle(`'${newAnec}' has been added`))
    setTimeout((()=>{
      dispatch(notificationHandle(null))
    }),5000)
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
