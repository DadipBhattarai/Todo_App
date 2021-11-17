import React from "react";

const TodoItem = (props) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={props.onTodoComplete}
      />

      {props.editMode ? (
        <input
          value={props.todoText}
          onChange={props.onEditTodoChange}
          onBlur={props.onEditMode}
        />
      ) : (
        <span
          className={props.completed ? "line-strike" : ""}
          onDoubleClick={props.onEditMode}
        >
          {props.todoText}
        </span>
      )}

      <button className="remove" onClick={props.onRemove}>
        x
      </button>
    </li>
  );
};

export default TodoItem;
