import { RequestHandler } from "express";
import { DashboardStats } from "@shared/api";

// Mock function to calculate dashboard statistics
// In production, this would query your database
const calculateDashboardStats = (): DashboardStats => {
  // Mock data - in production, calculate from actual tasks
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Simulate weekly progress data
  const weeklyProgress = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    weeklyProgress.push({
      date: date.toISOString().split("T")[0],
      completed: Math.floor(Math.random() * 5) + 1,
      created: Math.floor(Math.random() * 3) + 1,
    });
  }

  // Calculate productivity score based on completion rate and timeliness
  const completionRate = 0.75; // 75% completion rate
  const timelinessScore = 0.85; // 85% tasks completed on time
  const productivityScore = Math.round(
    ((completionRate + timelinessScore) / 2) * 100,
  );

  return {
    totalTasks: 15,
    completedTasks: 8,
    pendingTasks: 7,
    overdueTasks: 2,
    productivityScore,
    weeklyProgress,
  };
};

export const getDashboardStats: RequestHandler = (req, res) => {
  try {
    const stats = calculateDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error("Error calculating dashboard stats:", error);
    res.status(500).json({ error: "Failed to calculate dashboard statistics" });
  }
};

export const getProductivityInsights: RequestHandler = (req, res) => {
  try {
    const insights = {
      trends: [
        {
          metric: "Task Completion Rate",
          value: "75%",
          change: "+12%",
          trend: "up",
          description: "You've improved your completion rate this week",
        },
        {
          metric: "Average Task Priority",
          value: "High",
          change: "+1 level",
          trend: "up",
          description: "You're focusing on more important tasks",
        },
        {
          metric: "Context Utilization",
          value: "85%",
          change: "+5%",
          trend: "up",
          description: "AI suggestions are being used more effectively",
        },
      ],
      recommendations: [
        "Consider time-blocking for high-priority tasks",
        "Review overdue items and reschedule if needed",
        "Your productivity is highest in the morning - schedule important tasks then",
        "Context analysis shows meeting-heavy periods - block focus time",
      ],
      aiInsights: [
        "Your task completion pattern shows strong consistency",
        "Work-related tasks are prioritized effectively",
        "Health and personal tasks could use more attention",
      ],
    };

    res.json(insights);
  } catch (error) {
    console.error("Error generating productivity insights:", error);
    res.status(500).json({ error: "Failed to generate productivity insights" });
  }
};
