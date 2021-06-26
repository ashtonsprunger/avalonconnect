import React, { useEffect, useState } from "react";
import { Button, Modal } from "reactstrap";
import "./Roll.css";

const Roll = (props) => {
  useEffect(() => {}, []);

  const toggleIsOpen = () => {
    props.setRollOpen(!props.rollOpen);
    props.setRollClosed(true);
  };

  return (
    <>
      <Button color="primary" onClick={toggleIsOpen}>
        {props.username}
      </Button>
      <Modal isOpen={props.rollOpen}>
        <div id="roll-div">
          <h3
            style={{
              color:
                props.roll == "merlin" ||
                props.roll == "servant" ||
                props.roll == "percival"
                  ? "#218838"
                  : "#dc3545",
            }}
          >
            {props.roll === "servant"
              ? "You are a loyal servant of Arthur"
              : props.roll === "percival"
              ? "You are Percival"
              : props.roll === "merlin"
              ? "You are Merlin"
              : props.roll === "minion"
              ? "You are a minion of Mordred"
              : props.roll === "morgana"
              ? "You are Morgana"
              : props.roll === "mordred"
              ? "You are Mordred"
              : props.roll === "oberon"
              ? "You are Oberon"
              : null}
          </h3>
          <br />

          {props.sees ? (
            props.sees.length != 0 ? (
              <>
                <h4>You see:</h4>
                <br />
              </>
            ) : null
          ) : null}

          {props.sees
            ? props.sees.map((person) => (
                <>
                  <h4>• {person}</h4>
                  {/* <br /> */}
                </>
              ))
            : null}
          <br />
          <h4>Rolls:</h4>
          <br />
          {props.characters == undefined
            ? null
            : props.characters.map((character) => {
                return (
                  <h5
                    style={{
                      color:
                        character == "merlin" ||
                        character == "servant" ||
                        character == "percival"
                          ? "#218838"
                          : "#dc3545",
                    }}
                  >
                    {character == "merlin"
                      ? "Merlin"
                      : character == "servant"
                      ? "Loyal servant of Arthur"
                      : character == "minion"
                      ? "Minion of Mordred"
                      : character == "percival"
                      ? "Percival"
                      : character == "morgana"
                      ? "Morgana"
                      : character == "mordred"
                      ? "Mordred"
                      : character == "oberon"
                      ? "Oberon"
                      : "Unknown roll!! This is a bug!! You should never see this message!!!"}
                  </h5>
                );
              })}
          <br />
          <Button color="success" onClick={toggleIsOpen}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Roll;
