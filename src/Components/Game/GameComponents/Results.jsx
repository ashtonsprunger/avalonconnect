import React, { useState } from "react";

const Results = (props) => {
  const [nums, setNums] = useState(["1st", "2nd", "3rd", "4th", "5th"]);

  return (
    <>
      {props.missions.map((mission, index) => {
        return (
          <h4>{`${nums[index]} mission - ${mission ? "PASSED" : "FAILED"}`}</h4>
        );
      })}
    </>
  );
};

export default Results;
