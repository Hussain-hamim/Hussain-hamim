import { useState } from "react";

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState("");

  return (
    <>
      <div className="container">
        <div>
          <input
            style={{ backgroundColor: "pink" }}
            className="form-control"
            placeholder="Add task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setText("");
                onAddTask(text);
              }
            }}
          />
          <div style={{ textAlign: "center" }} className="m-2">
            <button
              className="btn btn-danger m-2"
              onClick={() => {
                setText("");
                onAddTask(text);
              }}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
