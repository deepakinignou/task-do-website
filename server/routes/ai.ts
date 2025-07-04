import { RequestHandler } from "express";
import {
  AIAnalysisRequest,
  AIAnalysisResponse,
  AITaskSuggestion,
  TaskPriority,
  ContextEntry,
} from "@shared/api";

// Mock AI analysis functions (in production, integrate with OpenAI, Claude, or LM Studio)

const generateTaskSuggestions = (
  taskDetails?: Partial<any>,
  contextEntries?: ContextEntry[],
): AITaskSuggestion[] => {
  const suggestions: AITaskSuggestion[] = [];

  if (!taskDetails?.title) {
    return suggestions;
  }

  const title = taskDetails.title.toLowerCase();

  // Basic AI logic for task enhancement
  let suggestedCategory = "Personal";
  let suggestedPriority: TaskPriority = "medium";
  let suggestedTags: string[] = [];
  let confidence = 0.7;
  let reasoning = "Based on task content analysis";

  // Category detection
  if (
    title.includes("meeting") ||
    title.includes("call") ||
    title.includes("presentation")
  ) {
    suggestedCategory = "Work";
    suggestedTags.push("meeting", "communication");
    confidence += 0.1;
  } else if (
    title.includes("learn") ||
    title.includes("study") ||
    title.includes("course")
  ) {
    suggestedCategory = "Learning";
    suggestedTags.push("education", "skill-development");
    confidence += 0.1;
  } else if (
    title.includes("buy") ||
    title.includes("shop") ||
    title.includes("purchase")
  ) {
    suggestedCategory = "Shopping";
    suggestedTags.push("shopping", "purchase");
  } else if (
    title.includes("doctor") ||
    title.includes("health") ||
    title.includes("gym")
  ) {
    suggestedCategory = "Health";
    suggestedTags.push("health", "wellness");
    confidence += 0.1;
  }

  // Priority detection
  if (
    title.includes("urgent") ||
    title.includes("asap") ||
    title.includes("emergency")
  ) {
    suggestedPriority = "urgent";
    confidence += 0.2;
    reasoning += ". Urgency keywords detected";
  } else if (
    title.includes("important") ||
    title.includes("critical") ||
    title.includes("deadline")
  ) {
    suggestedPriority = "high";
    confidence += 0.1;
    reasoning += ". High importance indicators found";
  } else if (
    title.includes("someday") ||
    title.includes("maybe") ||
    title.includes("optional")
  ) {
    suggestedPriority = "low";
    reasoning += ". Low priority indicators found";
  }

  // Deadline suggestions based on context
  let suggestedDeadline: string | undefined;
  if (contextEntries && contextEntries.length > 0) {
    // Look for time references in recent context
    const recentContext = contextEntries
      .slice(0, 5)
      .map((e) => e.content.toLowerCase())
      .join(" ");

    if (recentContext.includes("tomorrow")) {
      suggestedDeadline = new Date(
        Date.now() + 24 * 60 * 60 * 1000,
      ).toISOString();
      reasoning += ". Tomorrow deadline inferred from context";
    } else if (recentContext.includes("next week")) {
      suggestedDeadline = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString();
      reasoning += ". Next week deadline inferred from context";
    } else if (
      recentContext.includes("friday") ||
      recentContext.includes("end of week")
    ) {
      const now = new Date();
      const friday = new Date(now);
      friday.setDate(now.getDate() + (5 - now.getDay()));
      suggestedDeadline = friday.toISOString();
      reasoning += ". End of week deadline inferred";
    }
  }

  // Enhanced description based on category
  let suggestedDescription = taskDetails.description || "";
  if (!suggestedDescription) {
    if (suggestedCategory === "Work") {
      suggestedDescription =
        "Work-related task requiring professional attention and timely completion.";
    } else if (suggestedCategory === "Learning") {
      suggestedDescription =
        "Educational activity to enhance knowledge and skills.";
    } else if (suggestedCategory === "Health") {
      suggestedDescription =
        "Health-related activity important for well-being.";
    } else if (suggestedCategory === "Shopping") {
      suggestedDescription =
        "Purchase or shopping task to acquire needed items.";
    }
  }

  // Add time-based tags
  const hour = new Date().getHours();
  if (hour < 12) {
    suggestedTags.push("morning");
  } else if (hour < 17) {
    suggestedTags.push("afternoon");
  } else {
    suggestedTags.push("evening");
  }

  suggestions.push({
    suggestedTitle: taskDetails.title,
    suggestedDescription,
    suggestedCategory,
    suggestedPriority,
    suggestedDeadline,
    suggestedTags: [...new Set(suggestedTags)], // Remove duplicates
    confidence: Math.min(confidence, 1),
    reasoning,
  });

  return suggestions;
};

const analyzePriorities = (
  tasks?: any[],
  contextEntries?: ContextEntry[],
): Record<string, number> => {
  const priorityScores: Record<string, number> = {};

  if (!tasks) return priorityScores;

  tasks.forEach((task) => {
    let score = 50; // Base score

    // Priority multiplier
    const priorityMultipliers = {
      urgent: 2.0,
      high: 1.5,
      medium: 1.0,
      low: 0.7,
    };
    score *= priorityMultipliers[task.priority as TaskPriority] || 1.0;

    // Deadline urgency
    if (task.deadline) {
      const daysUntilDeadline = Math.ceil(
        (new Date(task.deadline).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24),
      );
      if (daysUntilDeadline <= 0)
        score *= 2.5; // Overdue
      else if (daysUntilDeadline <= 1)
        score *= 2.0; // Due today/tomorrow
      else if (daysUntilDeadline <= 3)
        score *= 1.5; // Due this week
      else if (daysUntilDeadline <= 7) score *= 1.2; // Due next week
    }

    // Context relevance
    if (contextEntries && contextEntries.length > 0) {
      const recentContext = contextEntries
        .slice(0, 5)
        .map((e) => e.content.toLowerCase())
        .join(" ");

      const taskKeywords = [
        task.title.toLowerCase(),
        task.description?.toLowerCase() || "",
        task.category.toLowerCase(),
        ...task.tags.map((tag: string) => tag.toLowerCase()),
      ].join(" ");

      // Check for keyword overlap
      const commonWords = taskKeywords
        .split(" ")
        .filter((word) => word.length > 3 && recentContext.includes(word));

      if (commonWords.length > 0) {
        score *= 1.3; // Boost score for context relevance
      }
    }

    priorityScores[task.id] = Math.min(Math.round(score), 100);
  });

  return priorityScores;
};

const generateInsights = (
  contextEntries?: ContextEntry[],
  tasks?: any[],
): string[] => {
  const insights: string[] = [];

  if (contextEntries && contextEntries.length > 0) {
    const recentContent = contextEntries
      .slice(0, 10)
      .map((e) => e.content.toLowerCase())
      .join(" ");

    // Pattern detection
    if (recentContent.includes("meeting") || recentContent.includes("call")) {
      insights.push(
        "Multiple meetings detected in recent context. Consider blocking focus time.",
      );
    }

    if (recentContent.includes("deadline") || recentContent.includes("due")) {
      insights.push(
        "Deadline pressure identified. Prioritize time-sensitive tasks.",
      );
    }

    if (recentContent.includes("project") || recentContent.includes("work")) {
      insights.push("Work-heavy period detected. Consider work-life balance.");
    }

    // Time-based insights
    const hour = new Date().getHours();
    if (hour < 9) {
      insights.push("Early morning detected. Great time for important tasks.");
    } else if (hour > 18) {
      insights.push(
        "Evening detected. Consider lighter tasks or planning for tomorrow.",
      );
    }
  }

  if (tasks && tasks.length > 0) {
    const overdueTasks = tasks.filter(
      (task) =>
        task.deadline &&
        new Date(task.deadline) < new Date() &&
        task.status !== "completed",
    );

    if (overdueTasks.length > 0) {
      insights.push(
        `${overdueTasks.length} overdue task(s) detected. Consider rescheduling or prioritizing.`,
      );
    }

    const highPriorityTasks = tasks.filter(
      (task) =>
        (task.priority === "high" || task.priority === "urgent") &&
        task.status !== "completed",
    );

    if (highPriorityTasks.length > 3) {
      insights.push(
        "Many high-priority tasks detected. Consider focusing on 2-3 key items.",
      );
    }
  }

  return insights.slice(0, 5); // Limit insights
};

export const getTaskSuggestions: RequestHandler = (req, res) => {
  try {
    const analysisRequest: AIAnalysisRequest = req.body;

    const suggestions = generateTaskSuggestions(
      analysisRequest.taskDetails,
      analysisRequest.contextEntries,
    );

    const response: Partial<AIAnalysisResponse> = {
      suggestions,
    };

    res.json(response);
  } catch (error) {
    console.error("Error generating task suggestions:", error);
    res.status(500).json({ error: "Failed to generate task suggestions" });
  }
};

export const analyzeContext: RequestHandler = (req, res) => {
  try {
    const analysisRequest: AIAnalysisRequest = req.body;

    const priorityScores = analyzePriorities(
      [],
      analysisRequest.contextEntries,
    );

    const insights = generateInsights(analysisRequest.contextEntries, []);

    const recommendedActions = [
      "Review and organize recent context entries",
      "Update task priorities based on new information",
      "Schedule time for context-related tasks",
    ];

    const response: AIAnalysisResponse = {
      suggestions: [],
      priorityScores,
      insights,
      recommendedActions,
    };

    res.json(response);
  } catch (error) {
    console.error("Error analyzing context:", error);
    res.status(500).json({ error: "Failed to analyze context" });
  }
};

export const getFullAnalysis: RequestHandler = (req, res) => {
  try {
    const analysisRequest: AIAnalysisRequest = req.body;

    const suggestions = generateTaskSuggestions(
      analysisRequest.taskDetails,
      analysisRequest.contextEntries,
    );

    const priorityScores = analyzePriorities(
      [],
      analysisRequest.contextEntries,
    );

    const insights = generateInsights(analysisRequest.contextEntries, []);

    const recommendedActions = [
      "Focus on high-priority, context-relevant tasks",
      "Break down complex tasks into smaller steps",
      "Schedule regular context review sessions",
      "Use AI suggestions to optimize task planning",
    ];

    const response: AIAnalysisResponse = {
      suggestions,
      priorityScores,
      insights,
      recommendedActions,
    };

    res.json(response);
  } catch (error) {
    console.error("Error performing full analysis:", error);
    res.status(500).json({ error: "Failed to perform analysis" });
  }
};
