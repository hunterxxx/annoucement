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
                id="new-input"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit">
                Create
            </button>
        </form>
    );
}