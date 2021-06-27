import React, { useEffect, useState } from "react";

const Merlin = (props) => {
  const [badPeople, setBadPeople] = useState([]);
  const [chosenOne, setChosenOne] = useState();

  useEffect(() => {
    setBadPeople(
      props.users.filter(
        (person) =>
          person.roll == "oberon" ||
          person.roll == "mordred" ||
          person.roll == "morgana" ||
          person.roll == "minion"
      )
    );
  }, []);

  useEffect(() => {
    setChosenOne(badPeople[Math.floor(Math.random() * badPeople.length)]);
  }, [badPeople]);

  return (
    <>
      {badPeople.filter((person) => person.id == props.socket.id).length ==
      1 ? (
        <>
          {chosenOne && chosenOne.id == props.socket.id ? (
            <h3>You are the chosen one {props.socket.id}</h3>
          ) : null}
          <h3>Go discuss who you think Merlin is!</h3>
        </>
      ) : (
        <h3>
          The bad guys are discussing Merlin, remember to keep it a secret!
        </h3>
      )}
    </>
  );
};

export default Merlin;
