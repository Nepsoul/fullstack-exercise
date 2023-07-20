const Total = ({ total }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {total.reduce((acc, curVal) => acc + curVal.exercises, 0)}
      </p>
    </div>
  );
};
export default Total;
