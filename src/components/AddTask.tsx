import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/TaskSlice';

const AddTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (title.trim() === '') {
      alert('Task title cannot be empty');
      return;
    }

    // Create a new task with a due date
    dispatch(addTask({
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      dueDate: dueDate || '', // Default to an empty string if no due date
    }));

    // Clear input fields
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <input
        type="text"
        className="border border-gray-300 rounded w-full px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border border-gray-300 rounded w-full px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Task Description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="date"
        className="border border-gray-300 rounded w-full px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
