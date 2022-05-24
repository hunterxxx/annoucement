import './index.css'
import { useState, useEffect } from "react";
import Announcement from "./components/Announcement";
import Form from "./components/Form";
import FilterButton from './components/FilterButton';
import { nanoid } from "nanoid";
import moment from 'moment'
import axios from 'axios'

const today = moment();
const lastSevenDays = moment().subtract(7, 'days');
const lastThirtyDays = moment().subtract(30, 'days');

const FILTER_MAP = {
  "All": () => true,
  "Today": task => task.timestamp.isBetween(today, today, 'day', '[]'),
  "Last 7 Days": task => task.timestamp.isBetween(lastSevenDays, today, 'day', '[]'),
  "Last 30 Days": task => task.timestamp.isBetween(lastThirtyDays, today, 'day', '[]'),
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/all')
      .then(res => {
        setTasks(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [tasks])

  const addTask = async (name) => {
    let newTask = { id: nanoid(), name: name, timestamp: moment() };

    await fetch('http://localhost:3001/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })

    setTasks([...tasks, newTask]);
  }

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:3001/delete/${id}`, {
      method: 'DELETE',
    });

    res.status === 200
      ? setTasks(tasks.filter(task => id !== task.id))
      : alert('There was an error while deleting');
  }


  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task =>
      <Announcement
        id={task.id}
        name={task.name}
        key={task.id}
        timestamp={task.timestamp}
        deleteTask={deleteTask}
      />
    )


  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
