import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

export const Course = (props) => {
  return (
    <div>
      {props.course.map((element, i) => (
        <div key={i}>
          <Header header={element.name} />
          <Content parts={element.parts} />
          <Total total={element.parts} />
        </div>
      ))}
    </div>
  );
};
