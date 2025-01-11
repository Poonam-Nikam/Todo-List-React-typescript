import React from 'react';

interface TaskFilterProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ setFilter }) => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => setFilter('pending')}
      >
        Pending
      </button>
    </div>
  );
};

export default TaskFilter;
