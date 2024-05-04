import { useDispatch } from "react-redux";
import { filterHandler } from "../reducers/FilterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    event.preventDefault();
    const filterAnecdote = event.target.value;
    dispatch(filterHandler(filterAnecdote));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input type="text" name="input-filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
