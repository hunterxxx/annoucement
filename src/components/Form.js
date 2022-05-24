import { useState } from "react";

export default function Form(props) {
    const [name, setName] = useState("");

    let handleChange = e => {
        setName(e.target.value);
    }

    let handleSubmit = e => {
        e.preventDefault();
        props.addTask(name);
        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <b>Text:</b>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Create
            </button>
        </form>
    );
}