export default function Announcement(props) {
  return (
    <li>
      <div>
        <label htmlFor={props.id} >
          {props.name}
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete
        </button>
      </div>
    </li >
  );
}