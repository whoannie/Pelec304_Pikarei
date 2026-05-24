import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const pikachu =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";

  // FETCH TASKS
  const fetchTasks = async () => {

    const response = await fetch(
      'https://pikarei.pythonanywhere.com/api/tasks/'
    );

    const data = await response.json();

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {

    if (title === '') return;

    await fetch(
        'https://pikarei.pythonanywhere.com/api/tasks//'
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          is_completed: false,
        }),
      }
    );

    setTitle('');
    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {

    await fetch(
      `http://pikarei.pythonanywhere.com/api/tasks/${id}/`,
      {
        method: 'DELETE',
      }
    );

    fetchTasks();
  };

  // DONE TASK
  const doneTask = async (id) => {

    await fetch(
      `http://pikarei.pythonanywhere.com/api/tasks/${id}/`,
      {
        method: 'PUT',
      }
    );

    fetchTasks();
  };

  return (

    <div className="container">

      <div className="header">

        <img
          src={pikachu}
          alt="Pikachu"
          className="pikachu-icon"
        />

        <h1>Pikachu Task Manager</h1>

        <p className="subtitle">
          Organize your cute daily missions ⚡💖
        </p>

      </div>

      <div className="form">

        <input
          type="text"
          placeholder="Enter your task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>
          Add Task
        </button>

      </div>

      <div className="tasks">

        {tasks.length === 0 ? (

          <div className="empty-state">

            <img
              src={pikachu}
              alt="Pikachu"
            />

            <h3>No tasks yet!</h3>

            <p>
              Pikachu is waiting for your first mission ⚡
            </p>

          </div>

        ) : (

          tasks.map((task) => (

            <div className="task-card" key={task.id}>

              <div className="task-content">

                <p
                  className={
                    task.is_completed
                      ? 'completed'
                      : ''
                  }
                >
                  {task.title}
                </p>

                <span>
                  {task.is_completed
                    ? 'Completed'
                    : 'Pending'}
                </span>

              </div>

              <div className="actions">

                {!task.is_completed && (

                  <button
                    className="done-btn"
                    onClick={() => doneTask(task.id)}
                  >
                    Done
                  </button>

                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default App;
