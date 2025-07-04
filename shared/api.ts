/**
 * Shared types between client and server for Smart Todo API
 */

// Task Management Types
export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline?: string;
  aiScore?: number;
  aiSuggestions?: string[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in-progress" | "completed" | "cancelled";

export interface CreateTaskRequest {
  title: string;
  description?: string;
  category?: string;
  deadline?: string;
  tags?: string[];
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface TasksResponse {
  tasks: Task[];
  total: number;
}

// Context Management Types
export interface ContextEntry {
  id: string;
  content: string;
  source: ContextSource;
  type: ContextType;
  createdAt: string;
  processedInsights?: string[];
  extractedTasks?: string[];
}

export type ContextSource = "whatsapp" | "email" | "notes" | "manual";
export type ContextType = "message" | "document" | "meeting" | "reminder";

export interface CreateContextRequest {
  content: string;
  source: ContextSource;
  type: ContextType;
}

export interface ContextResponse {
  entries: ContextEntry[];
  total: number;
}

// AI Features Types
export interface AITaskSuggestion {
  suggestedTitle: string;
  suggestedDescription?: string;
  suggestedCategory: string;
  suggestedPriority: TaskPriority;
  suggestedDeadline?: string;
  suggestedTags: string[];
  confidence: number;
  reasoning: string;
}

export interface AIAnalysisRequest {
  taskDetails?: Partial<Task>;
  contextEntries?: ContextEntry[];
  userPreferences?: UserPreferences;
  currentWorkload?: number;
}

export interface AIAnalysisResponse {
  suggestions: AITaskSuggestion[];
  priorityScores: Record<string, number>;
  insights: string[];
  recommendedActions: string[];
}

// User Preferences
export interface UserPreferences {
  workingHours: {
    start: string;
    end: string;
  };
  preferredCategories: string[];
  defaultPriority: TaskPriority;
  aiSuggestionsEnabled: boolean;
  contextAnalysisEnabled: boolean;
}

// Categories and Tags
export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  usageCount: number;
}

export interface CategoriesResponse {
  categories: Category[];
}

// Dashboard Analytics
export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  productivityScore: number;
  weeklyProgress: Array<{
    date: string;
    completed: number;
    created: number;
  }>;
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Legacy demo response (keep for compatibility)
export interface DemoResponse {
  message: string;
}
