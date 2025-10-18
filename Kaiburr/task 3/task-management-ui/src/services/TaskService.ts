import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Task interface matching the backend model exactly
export interface Task {
  id?: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions?: TaskExecution[];
}

// Task execution result interface matching backend model
export interface TaskExecution {
  startTime: string;
  endTime: string;
  output: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Task API Service
export class TaskService {
  
  // Get all tasks
  static async getAllTasks(): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>('/api/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Failed to fetch tasks');
    }
  }

  // Get task by ID
  static async getTaskById(id: string): Promise<Task> {
    try {
      const response = await api.get<Task>(`/api/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Failed to fetch task');
    }
  }

  // Create or update task
  static async createOrUpdateTask(task: Task): Promise<Task> {
    try {
      const response = await api.put<Task>('/api/tasks', task);
      return response.data;
    } catch (error) {
      console.error('Error creating/updating task:', error);
      throw new Error('Failed to create/update task');
    }
  }

  // Delete task
  static async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/api/tasks/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  }

  // Search tasks by name
  static async searchTasks(name: string): Promise<Task[]> {
    try {
      const response = await api.get<Task[]>(`/api/tasks/search?name=${encodeURIComponent(name)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching tasks:', error);
      throw new Error('Failed to search tasks');
    }
  }

  // Execute task command
  static async executeTask(id: string): Promise<Task> {
    try {
      const response = await api.put<Task>(`/api/tasks/${id}/execute`);
      return response.data;
    } catch (error) {
      console.error('Error executing task:', error);
      throw new Error('Failed to execute task');
    }
  }

  // Health check
  static async healthCheck(): Promise<{ status: string }> {
    try {
      // Use the tasks endpoint as a health check since actuator/health doesn't exist
      await api.get('/api/tasks');
      return { status: 'UP' };
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('API health check failed');
    }
  }
}

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      throw new Error('Resource not found');
    } else if (error.response?.status === 500) {
      throw new Error('Internal server error');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to API server. Please ensure the backend is running.');
    }
    return Promise.reject(error);
  }
);

export default TaskService;
