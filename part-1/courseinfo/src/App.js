import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

function App() {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exe1={exercises1}
        part2={part2}
        exe2={exercises2}
        part3={part3}
        exe3={exercises3}
      />
      <Total exe1={exercises1} exe2={exercises1} exe3={exercises1} />
    </div>
  );
}

export default App;
