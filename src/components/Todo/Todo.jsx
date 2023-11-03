import React, { useState, useEffect } from 'react';
import './Todo.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editTask, setEditTask] = useState(null);
  
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  useEffect(() => {
    // Load tasks from local storage when the component mounts.
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);
  

  useEffect(() => {
    // Save tasks to local storage whenever the tasks state changes.
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.title && newTask.description) {
      setTasks([...tasks, { ...newTask, done: false }]);
      setNewTask({ title: '', description: '' });
    }
  };

  const updateTask = () => {
    if (editTask !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editTask
          ? { title: newTask.title, description: newTask.description, done: task.done }
          : task
      );
      setTasks(updatedTasks);
      setEditTask(null);
      setNewTask({ title: '', description: '' });
    }
  };

  const editSelectedTask = (index) => {
    setEditTask(index);
    const taskToEdit = tasks[index];
    setNewTask({ title: taskToEdit.title, description: taskToEdit.description });
  };

  const toggleDone = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo">
      <h1>Todo List</h1>
      <div className="todoInput">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={editTask !== null ? updateTask : addTask}>
          {editTask !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? 'task-done' : ''}>
            <div>
            <div className='display'>
              <strong>Title:</strong> {task.title}
            </div>
            <div className='display'>
              <strong>Description:</strong> {task.description}
            </div>
            </div>
            < div className='btns'> 
              <button onClick={() => toggleDone(index)}>
                {task.done ? 'Pending' : 'Done'}
              </button>
              <button onClick={() => editSelectedTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
