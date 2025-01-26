import { create } from 'zustand';

export interface Todo {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  weather?: {
    temp: number;
    condition: string;
  };
}

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'weather'>) => Promise<void>;
  deleteTodo: (id: string) => void;
  fetchWeather: (todo: Omit<Todo, 'id' | 'weather'>) => Promise<Todo>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: async (todo) => {
    const enrichedTodo = await useTodoStore.getState().fetchWeather(todo);
    set((state) => ({
      todos: [...state.todos, { ...enrichedTodo, id: Date.now().toString() }],
    }));
  },
  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  fetchWeather: async (todo) => {
    try {
      // Replace with your actual weather API key and endpoint
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=London`);
      const data = await response.json();
      
      return {
        ...todo,
        id: Date.now().toString(),
        weather: {
          temp: data.current.temp_c,
          condition: data.current.condition.text,
        },
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      return { ...todo, id: Date.now().toString() };
    }
  },
})); 