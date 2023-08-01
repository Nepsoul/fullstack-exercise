import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

export const Course = (props) => {
  return (
    <div>
      <Header header={props.course.name} />
      <Content parts={props.course.parts} />
      <Total total={props.course.parts} />
    </div>
  );
};
