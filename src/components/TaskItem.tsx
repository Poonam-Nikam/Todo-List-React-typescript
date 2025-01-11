import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="mr-2"
        />
        <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
        {task.dueDate && <span className="ml-2 text-sm text-gray-500">{task.dueDate}</span>}
      </div>
      <button onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
    </div>
  );
};

export default TaskItem;
