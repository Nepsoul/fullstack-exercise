const Total = (props) => {
  return (
    <div>
      <h3>
        Number of exercises{" "}
        {props.total.reduce((acc, curVal) => acc + curVal.exercises, 0)}
      </h3>
    </div>
  );
};
export default Total;
