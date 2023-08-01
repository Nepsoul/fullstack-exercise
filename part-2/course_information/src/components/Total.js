const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.total.reduce((acc, curVal) => acc + curVal.exercises, 0)}
      </p>
    </div>
  );
};
export default Total;
