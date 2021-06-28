import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

const Merlin = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownText, setDropdownText] = useState("Select Merlin");
  const [goodGuy, setGoodGuy] = useState();

  const guessMerlin = () => {
    props.socket.emit("guessMerlin", goodGuy);
  };

  const toggle = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      {props.badPeople.filter((person) => person.id == props.socket.id)
        .length == 1 ? (
        <>
          <h3>Go discuss who you think Merlin is!</h3>
          {props.chosenOne && props.chosenOne.id == props.socket.id ? (
            <>
              <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle caret>{dropdownText}</DropdownToggle>
                <DropdownMenu>
                  {props.goodPeople.map((person) => {
                    return (
                      <DropdownItem
                        onClick={() => {
                          setDropdownText(person.username);
                          setGoodGuy(person);
                        }}
                      >
                        {person.username}
                      </DropdownItem>
                    );
                  })}
                  {/* <DropdownItem>{props.goodPeople.length}</DropdownItem> */}
                </DropdownMenu>
              </Dropdown>
              {goodGuy ? (
                <Button color="success" onClick={guessMerlin}>
                  Submit {goodGuy.username} as guess
                </Button>
              ) : null}
            </>
          ) : props.chosenOne ? (
            <h3>{props.chosenOne.username} will submit the guess</h3>
          ) : null}
        </>
      ) : (
        <h3>
          The bad guys are discussing Merlin, remember to keep it a secret!
        </h3>
      )}
      {props.badPeople.map((person) => {
        return (
          <h5 style={{ color: "#dc3545" }}>
            {person.username}:{" "}
            {person.roll == "merlin"
              ? "Merlin"
              : person.roll == "servant"
              ? "Loyal servant of Arthur"
              : person.roll == "minion"
              ? "Minion of Mordred"
              : person.roll == "percival"
              ? "Percival"
              : person.roll == "morgana"
              ? "Morgana"
              : person.roll == "mordred"
              ? "Mordred"
              : person.roll == "oberon"
              ? "Oberon"
              : "Unknown roll!! This is a bug!! You should never see this message!!!"}
          </h5>
        );
      })}
    </>
  );
};

export default Merlin;
