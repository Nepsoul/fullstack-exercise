import Part from "./Part";

const Content = ({ course }) => {
  return (
    <div>
      {course.map((x, i) => (
        <Part key={i} part={x.part} exe={x.exercises} />
      ))}
    </div>
  );
};
export default Content;
