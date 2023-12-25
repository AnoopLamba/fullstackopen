import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </>
);

function Course({ course }) {
  return (
    <>
      <h1>Web Development</h1>
      <br />

      {course.map((item) => (
        <React.Fragment key={item.id}>
          <h3>{item.name}</h3>
          {item.parts.map((part) => (
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          ))}
          <p>
            <b>
              total exercises:{" "}
              {item.parts.reduce((sum, part) => sum + part.exercises, 0)}
            </b>
          </p>
          <br />
        </React.Fragment>
      ))}
    </>
  );
}

export default Course;
