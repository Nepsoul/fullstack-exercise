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
        course={[
          {
            part: part1,
            exercises: exercises1,
          },

          { part: part2, exercises: exercises2 },

          { part: part3, exercises: exercises3 },
        ]}
      />
      <Total
        total={[
          { exercises: exercises1 },
          { exercises: exercises2 },
          { exercises: exercises3 },
        ]}
      />
    </div>
  );
}

export default App;
