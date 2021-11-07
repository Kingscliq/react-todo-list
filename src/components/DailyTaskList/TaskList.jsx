import React from "react";
import Card from "../UI/Card";
function TaskList(props) {
  return (
    <div>
      {props.Tasks.map((task, index) => {
        return (
          <Card key={index}>
            {task}
            <button
              onClick={() => {
                props.RequestDelete(index);
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Card>
        );
      })}
    </div>
  );
}

export default TaskList;
