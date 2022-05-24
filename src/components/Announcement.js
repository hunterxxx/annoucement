export default function Announcement(props) {
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <label className="todo-label" htmlFor={props.id} >
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete
        </button>
      </div>
    </li >
  );
}