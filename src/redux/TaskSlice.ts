import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define Task type
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  completed: boolean;
}

// Load tasks from local storage
const loadTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

// Save tasks to local storage
const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Initial state
const initialState = {
  tasks: loadTasksFromLocalStorage(),
  filter: 'all',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    markCompleted(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    reorderTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      saveTasksToLocalStorage(state.tasks);
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    updateTaskOrder(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save tasks to localStorage
    }
  },
});

export const { addTask, deleteTask, markCompleted, reorderTasks, setFilter,updateTaskOrder } = taskSlice.actions;
export default taskSlice.reducer;
