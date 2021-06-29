import React, { useState } from "react";
import { Modal, Button } from "reactstrap";

const QR = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggle = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <img src={props.src} onClick={toggle} />
      <Modal isOpen={modalOpen} style={{ padding: "1em" }}>
        <div style={{ padding: ".5em" }}>
          <img src={props.src} width="100%" />
          <br />
          <Button color="warning" onClick={toggle}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default QR;
