import React, { useState } from "react";
import Card from "../UI/Card";
import "./InputForm.css";
function InputForm(props) {
  const [task, setTask] = useState("");
  function handelInputChange(event) {
    setTask(event.target.value);
  }
  function handelSubmitForm(event) {
    event.preventDefault();
    props.updateList(task);
    setTask("");
  }
  return (
    <Card>
      <form onSubmit={handelSubmitForm}>
        <input
          type="text"
          name="task"
          onChange={handelInputChange}
          value={task}
          placeholder="Enter Your Task"
        />
        <button className="btn" type="submit" disabled={!task}>
          Add
        </button>
      </form>
    </Card>
  );
}

export default InputForm;
