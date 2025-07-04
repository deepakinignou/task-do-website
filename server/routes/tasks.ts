import { RequestHandler } from "express";
import {
  Task,
  TasksResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskPriority,
  TaskStatus,
} from "@shared/api";

// In-memory storage for demo (in production, use a real database)
let tasks: Task[] = [
  {
    id: "1",
    title: "Complete project presentation",
    description: "Prepare slides for the quarterly review meeting",
    category: "Work",
    priority: "high",
    status: "in-progress",
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    aiScore: 85,
    aiSuggestions: [
      "Consider breaking this into smaller tasks",
      "Schedule practice session before presentation",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ["presentation", "quarterly", "important"],
  },
  {
    id: "2",
    title: "Buy groceries",
    description: "Milk, bread, eggs, and vegetables for the week",
    category: "Personal",
    priority: "medium",
    status: "todo",
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    aiScore: 65,
    aiSuggestions: ["Group by store sections for efficiency"],
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    tags: ["shopping", "weekly", "food"],
  },
  {
    id: "3",
    title: "Learn React Router v6",
    description: "Study the new features and migration guide",
    category: "Learning",
    priority: "low",
    status: "todo",
    aiScore: 40,
    aiSuggestions: [
      "Start with official documentation",
      "Build a small project to practice",
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["react", "learning", "frontend"],
  },
  {
    id: "4",
    title: "Schedule dentist appointment",
    description: "Regular cleaning and checkup",
    category: "Health",
    priority: "medium",
    status: "completed",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
    aiScore: 70,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date().toISOString(),
    tags: ["health", "routine", "appointment"],
  },
];

// Generate AI score based on task attributes
const generateAIScore = (task: Partial<Task>): number => {
  let score = 50; // Base score

  // Priority impact
  const priorityScores = { urgent: 40, high: 30, medium: 20, low: 10 };
  score += priorityScores[task.priority as TaskPriority] || 20;

  // Deadline impact
  if (task.deadline) {
    const daysUntilDeadline = Math.ceil(
      (new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    if (daysUntilDeadline <= 1) score += 20;
    else if (daysUntilDeadline <= 3) score += 15;
    else if (daysUntilDeadline <= 7) score += 10;
  }

  // Category impact
  const categoryScores: Record<string, number> = {
    Work: 15,
    Health: 10,
    Personal: 5,
    Learning: 8,
    Shopping: 3,
  };
  score += categoryScores[task.category || ""] || 5;

  return Math.min(Math.max(score, 0), 100);
};

// Generate AI suggestions based on task content
const generateAISuggestions = (task: Partial<Task>): string[] => {
  const suggestions: string[] = [];

  // Generic suggestions based on priority
  if (task.priority === "urgent" || task.priority === "high") {
    suggestions.push("Consider focusing on this task first");
    suggestions.push("Break down into smaller, manageable steps");
  }

  // Deadline-based suggestions
  if (task.deadline) {
    const daysUntilDeadline = Math.ceil(
      (new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    if (daysUntilDeadline <= 1) {
      suggestions.push("This task is due soon - prioritize today");
    } else if (daysUntilDeadline <= 3) {
      suggestions.push("Schedule time for this task this week");
    }
  }

  // Category-specific suggestions
  if (task.category === "Work") {
    suggestions.push("Schedule focused work time");
  } else if (task.category === "Learning") {
    suggestions.push("Allocate regular study sessions");
  } else if (task.category === "Health") {
    suggestions.push("Don't postpone health-related tasks");
  }

  return suggestions.slice(0, 3); // Limit to 3 suggestions
};

export const getAllTasks: RequestHandler = (req, res) => {
  try {
    const response: TasksResponse = {
      tasks: tasks.sort((a, b) => {
        // Sort by status (incomplete first), then by priority, then by deadline
        if (a.status === "completed" && b.status !== "completed") return 1;
        if (a.status !== "completed" && b.status === "completed") return -1;

        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        const priorityDiff =
          priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;

        // Then by deadline
        if (a.deadline && b.deadline) {
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        }
        if (a.deadline && !b.deadline) return -1;
        if (!a.deadline && b.deadline) return 1;

        return 0;
      }),
      total: tasks.length,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createTask: RequestHandler = (req, res) => {
  try {
    const taskData: CreateTaskRequest = req.body;

    if (!taskData.title?.trim()) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || "",
      category: taskData.category || "Personal",
      priority: "medium", // Default priority, will be updated by AI
      status: "todo",
      deadline: taskData.deadline || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: taskData.tags || [],
    };

    // Generate AI enhancements
    newTask.aiScore = generateAIScore(newTask);
    newTask.aiSuggestions = generateAISuggestions(newTask);

    // Auto-assign priority based on AI analysis
    if (newTask.aiScore >= 80) newTask.priority = "high";
    else if (newTask.aiScore >= 90) newTask.priority = "urgent";
    else if (newTask.aiScore >= 60) newTask.priority = "medium";
    else newTask.priority = "low";

    tasks.unshift(newTask); // Add to beginning of array

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTask: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const updates: UpdateTaskRequest = req.body;

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    const existingTask = tasks[taskIndex];
    const updatedTask: Task = {
      ...existingTask,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // Recalculate AI score if relevant fields changed
    if (
      updates.priority ||
      updates.deadline ||
      updates.category ||
      updates.title ||
      updates.description
    ) {
      updatedTask.aiScore = generateAIScore(updatedTask);
      updatedTask.aiSuggestions = generateAISuggestions(updatedTask);
    }

    tasks[taskIndex] = updatedTask;

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export const getTaskById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const task = tasks.find((task) => task.id === id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
};
