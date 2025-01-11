import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;   // String ID
  title: string;
  description?: string;
  completed: boolean;
  dueDate: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {  // Now the payload expects a Task object
      state.tasks.push(action.payload);  // Add the new task to the state
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, toggleTask, deleteTask } = TaskSlice.actions;
export default TaskSlice.reducer;
