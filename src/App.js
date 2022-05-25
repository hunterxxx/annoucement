import './index.css'
import { useState, useEffect } from "react";
import Announcement from "./components/Announcement";
import Form from "./components/Form";
import FilterButton from './components/FilterButton';
import { nanoid } from "nanoid";
import moment from 'moment'
import axios from 'axios'

let today = moment();
let lastSevenDays = moment().subtract(7, 'days');
let lastThirtyDays = moment().subtract(30, 'days');

let FILTER_MAP = {
  "All": () => true,
  "Today": task => moment(task.timestamp).isBetween(today, today, 'day', '[]'),
  "Last 7 Days": task => moment(task.timestamp).isBetween(lastSevenDays, today, 'day', '[]'),
  "Last 30 Days": task => moment(task.timestamp).isBetween(lastThirtyDays, today, 'day', '[]'),
};

let FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState([])

  const fetchAll = async () => {
    axios.get('http://localhost:3001/all')
      .then(res => {
        setTasks(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    // const res = await fetch(`http://localhost:3001/all`)

    // console.log(res)
    // const res = await fetch("http://localhost:3001/all");
    // res.json().then(res => {
    //   console.log(res.data)
    //   setTasks(res.data)
    // })
  }


  useEffect(() => {
    fetchAll()
    console.log(132)
  }, [tasks])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(`http://localhost:3001/all`);
  //     const data = await res.data;
  //     setTasks(data);
  //   }
  //   fetchData().catch(console.error);;
  // }, [tasks])



  const addTask = async (name) => {
    let newTask = { id: nanoid(), name: name, timestamp: today };

    await fetch('http://localhost:3001/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    setTasks([...tasks, newTask]);
  }

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:3001/delete/${id}`, {
      method: 'DELETE',
    });

    res.status === 200
      ? setTasks(tasks.filter(task => id !== task.id))
      : alert('There was an error while deleting');
  }

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

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
    <div>
      <Form addTask={addTask} />
      <div>
        {filterList}
      </div>
      <ul>
        {taskList}
      </ul>
    </div>
  );
}
