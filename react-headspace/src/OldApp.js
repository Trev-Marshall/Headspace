import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [tasks, setTasks] = useState({
  })

  useEffect(() => {
    let data = {};
    axios.get('http://127.0.0.1:8000/wel/')
      .then(res => {
        data = res.data;
        setTasks({
          details: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  console.log(tasks.details);

  return (
    <div>
      <ul>
        {tasks.details &&
          tasks.details.map((details, id) => (
            <p key={id}>{details.task}</p>
          )
          )}
      </ul>
    </div>
  );
}

export default App;
