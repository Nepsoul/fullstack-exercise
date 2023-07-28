import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.course.map((x, i) => (
        <Part key={i} part={x.name} exe={x.exercises} />
      ))}
    </div>
  );
};
export default Content;
