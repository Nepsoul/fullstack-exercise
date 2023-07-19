import Part from "./Part";

const Content = ({ part1, part2, part3, exe1, exe2, exe3 }) => {
  return (
    <div>
      <Part
        part1={part1}
        exe1={exe1}
        part2={part2}
        exe2={exe2}
        part3={part3}
        exe3={exe3}
      />
    </div>
  );
};
export default Content;
