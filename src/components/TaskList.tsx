import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/Store';
import { setFilter, deleteTask, markCompleted, updateTaskOrder } from '../redux/TaskSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const dispatch = useDispatch();

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all'
  });

  // Count completed and pending tasks
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;

  // Handle drag end
  const handleDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return; // If there's no destination (task dropped outside)

    // Reorder tasks
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    // Update the task order in the Redux store
    dispatch(updateTaskOrder(reorderedTasks));
  };

  return (
    <div className="p-4">
      {/* Filter Buttons */}
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => dispatch(setFilter('all'))}
          className={`px-3 py-1 text-sm rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter('completed'))}
          className={`px-3 py-1 text-sm rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
        <button
          onClick={() => dispatch(setFilter('pending'))}
          className={`px-3 py-1 text-sm rounded ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Pending
        </button>
      </div>

      {/* Task Count */}
      <div className="flex justify-between mb-4 text-sm">
        <p>Completed: {completedCount}</p>
        <p>Pending: {pendingCount}</p>
      </div>

      {/* Drag and Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-white shadow rounded mb-2"
                    >
                      <h3 className={`font-bold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                      <p>{task.description}</p>
                      <div>
                        <button
                          onClick={() => dispatch(markCompleted(task.id))}
                          className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                        >
                          {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button
                          onClick={() => dispatch(deleteTask(task.id))}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
