import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/Store';
import { toggleTask, deleteTask } from '../redux/TaskSlice';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  // Local state for the filter (All, Completed, Pending)
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending'>('All');

  // Calculate the count of completed and pending tasks
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true; // 'All'
  });

  return (
    <div className="max-w-md mx-auto border border-black p-6 bg-gray-100 rounded-md shadow-lg">
      {/* Task Counts */}
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-bold">Completed:</span> {completedCount} |{' '}
          <span className="font-bold">Pending:</span> {pendingCount}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          className={`px-3 py-1 text-sm rounded ${
            filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`px-3 py-1 text-sm rounded ${
            filter === 'Completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
        <button
          className={`px-3 py-1 text-sm rounded ${
            filter === 'Pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setFilter('Pending')}
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 mb-4 border rounded ${
            task.completed ? 'bg-green-100' : 'bg-white'
          }`}
        >
          <h3 className={`text-lg font-bold ${task.completed && 'line-through'}`}>
            {task.title}
          </h3>
          {task.description && <p>{task.description}</p>}
          {task.dueDate && (
            <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
          )}
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => dispatch(toggleTask(task.id))}
              className={`px-4 py-2 rounded ${
                task.completed ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
              }`}
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
