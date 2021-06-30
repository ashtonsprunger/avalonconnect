import React, { useEffect, useState } from "react";
import { Prompt } from "react-router-dom";

const UseUnsavedChangesWarning = (props) => {
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    window.onbeforeunload = isDirty && (() => "Exit game?");

    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty]);

  const routerPrompt = <Prompt when={isDirty} message="Exit game?" />;

  return [routerPrompt, () => setIsDirty(true), () => setIsDirty(false)];
};

export default UseUnsavedChangesWarning;
