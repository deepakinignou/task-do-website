import {
  AIAnalysisRequest,
  AIAnalysisResponse,
  AITaskSuggestion,
  Task,
  ContextEntry,
} from "@shared/api";

/**
 * AI utilities for Smart Todo frontend
 */

export class AIService {
  private static instance: AIService;

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Get AI-powered task suggestions
   */
  async getTaskSuggestions(
    taskDetails: Partial<Task>,
    contextEntries?: ContextEntry[],
  ): Promise<AITaskSuggestion[]> {
    try {
      const response = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskDetails,
          contextEntries,
        } as AIAnalysisRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI suggestions");
      }

      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
      return [];
    }
  }

  /**
   * Analyze context entries for insights
   */
  async analyzeContext(contextEntries: ContextEntry[]): Promise<{
    insights: string[];
    recommendedActions: string[];
  }> {
    try {
      const response = await fetch("/api/ai/analyze-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contextEntries,
        } as AIAnalysisRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze context");
      }

      const data: AIAnalysisResponse = await response.json();
      return {
        insights: data.insights || [],
        recommendedActions: data.recommendedActions || [],
      };
    } catch (error) {
      console.error("Error analyzing context:", error);
      return {
        insights: [],
        recommendedActions: [],
      };
    }
  }

  /**
   * Get full AI analysis including tasks and context
   */
  async getFullAnalysis(
    tasks: Task[],
    contextEntries: ContextEntry[],
  ): Promise<AIAnalysisResponse> {
    try {
      const response = await fetch("/api/ai/full-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contextEntries,
        } as AIAnalysisRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to get full analysis");
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting full analysis:", error);
      return {
        suggestions: [],
        priorityScores: {},
        insights: [],
        recommendedActions: [],
      };
    }
  }

  /**
   * Generate smart task title suggestions based on partial input
   */
  generateTaskTitleSuggestions(partialTitle: string): string[] {
    const commonTasks = [
      "Review project requirements",
      "Schedule team meeting",
      "Update documentation",
      "Prepare presentation slides",
      "Send follow-up email",
      "Book appointment",
      "Buy groceries",
      "Plan weekend activities",
      "Read industry articles",
      "Exercise for 30 minutes",
    ];

    if (!partialTitle.trim()) {
      return commonTasks.slice(0, 5);
    }

    return commonTasks
      .filter((task) => task.toLowerCase().includes(partialTitle.toLowerCase()))
      .slice(0, 5);
  }

  /**
   * Suggest task priority based on content
   */
  suggestTaskPriority(title: string, description?: string): Task["priority"] {
    const content = `${title} ${description || ""}`.toLowerCase();

    if (
      content.includes("urgent") ||
      content.includes("asap") ||
      content.includes("emergency") ||
      content.includes("critical")
    ) {
      return "urgent";
    }

    if (
      content.includes("important") ||
      content.includes("deadline") ||
      content.includes("meeting") ||
      content.includes("presentation")
    ) {
      return "high";
    }

    if (
      content.includes("review") ||
      content.includes("update") ||
      content.includes("plan")
    ) {
      return "medium";
    }

    return "low";
  }

  /**
   * Suggest task category based on content
   */
  suggestTaskCategory(title: string, description?: string): string {
    const content = `${title} ${description || ""}`.toLowerCase();

    if (
      content.includes("meeting") ||
      content.includes("project") ||
      content.includes("work") ||
      content.includes("client") ||
      content.includes("presentation")
    ) {
      return "Work";
    }

    if (
      content.includes("learn") ||
      content.includes("study") ||
      content.includes("course") ||
      content.includes("read")
    ) {
      return "Learning";
    }

    if (
      content.includes("doctor") ||
      content.includes("health") ||
      content.includes("gym") ||
      content.includes("exercise")
    ) {
      return "Health";
    }

    if (
      content.includes("buy") ||
      content.includes("shop") ||
      content.includes("purchase") ||
      content.includes("groceries")
    ) {
      return "Shopping";
    }

    return "Personal";
  }

  /**
   * Extract potential tasks from context content
   */
  extractTasksFromContext(content: string): string[] {
    const sentences = content
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0);
    const tasks: string[] = [];

    const actionWords = [
      "need to",
      "have to",
      "must",
      "should",
      "prepare",
      "finish",
      "complete",
      "write",
      "call",
      "email",
      "buy",
      "schedule",
      "book",
      "review",
      "update",
    ];

    sentences.forEach((sentence) => {
      const trimmed = sentence.trim();

      const hasActionWord = actionWords.some((word) =>
        trimmed.toLowerCase().includes(word),
      );

      if (hasActionWord && trimmed.length > 10 && trimmed.length < 100) {
        // Clean up the sentence
        let task = trimmed
          .replace(/^(i |we |you )(need to |have to |must |should )/i, "")
          .replace(/^(need to |have to |must |should )/i, "");

        task = task.charAt(0).toUpperCase() + task.slice(1);
        tasks.push(task);
      }
    });

    return tasks.slice(0, 3);
  }
}

// Export singleton instance
export const aiService = AIService.getInstance();
