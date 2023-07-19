const Part = ({ part1, part2, part3, exe1, exe2, exe3 }) => {
  return (
    <div>
      <p>
        {part1}
        {exe1}
      </p>
      <p>
        {part2}
        {exe2}
      </p>
      <p>
        {part3}
        {exe3}
      </p>
    </div>
  );
};
export default Part;
