import { useState } from "react";

export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => onChange({ ...task, text: e.target.value })}
        />
        <button
          className="btn btn-outline-warning m-2"
          onClick={() => setIsEditing(false)}
        >
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button
          className="btn btn-outline-warning"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      </>
    );
  }
  return (
    <label className="container">
      <input
        className="m-2"
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      <span
        style={{
          textDecorationLine: task.done ? "line-through" : "",
          opacity: task.done ? "0.7" : "1",
        }}
      >
        {taskContent}
      </span>
      <button
        className="btn btn-outline-danger"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
      <hr style={{ opacity: "0.1" }} />
    </label>
  );
}
