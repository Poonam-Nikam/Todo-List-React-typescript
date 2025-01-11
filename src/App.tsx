import React from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './index.css'; // Make sure this path is correct

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="p-6 border-2 border-black bg-white rounded-lg shadow-lg max-w-3xl w-full">
      <h1 className="text-3xl font-bold text-center mb-4">To-Do List</h1>
      <AddTask />
      <TaskList />
    </div>
  </div>
  
  );
};

export default App;
