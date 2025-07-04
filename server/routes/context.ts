import { RequestHandler } from "express";
import {
  ContextEntry,
  ContextResponse,
  CreateContextRequest,
} from "@shared/api";

// In-memory storage for demo (in production, use a real database)
let contextEntries: ContextEntry[] = [
  {
    id: "1",
    content:
      "Meeting with client tomorrow at 2pm to discuss project requirements. Need to prepare presentation slides.",
    source: "whatsapp",
    type: "message",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    processedInsights: [
      "Client meeting scheduled for tomorrow",
      "Presentation preparation required",
    ],
    extractedTasks: ["Prepare presentation slides for client meeting"],
  },
  {
    id: "2",
    content:
      "Doctor appointment scheduled for Friday 10am. Don't forget to bring insurance card and list of current medications.",
    source: "email",
    type: "reminder",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    processedInsights: [
      "Medical appointment scheduled",
      "Insurance and medication list needed",
    ],
    extractedTasks: [
      "Bring insurance card to doctor appointment",
      "Prepare list of current medications",
    ],
  },
  {
    id: "3",
    content:
      "Team standup notes: Sprint review next week, need to finish user authentication feature and write tests.",
    source: "notes",
    type: "meeting",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    processedInsights: [
      "Sprint deadline approaching",
      "Authentication feature incomplete",
      "Tests need to be written",
    ],
    extractedTasks: [
      "Complete user authentication feature",
      "Write tests for authentication",
    ],
  },
];

// Process context content to extract insights and tasks
const processContextEntry = (entry: ContextEntry): ContextEntry => {
  const content = entry.content.toLowerCase();
  const insights: string[] = [];
  const extractedTasks: string[] = [];

  // Extract insights based on keywords
  if (content.includes("meeting") || content.includes("appointment")) {
    insights.push("Meeting or appointment mentioned");
  }
  if (content.includes("deadline") || content.includes("due")) {
    insights.push("Deadline identified");
  }
  if (content.includes("urgent") || content.includes("important")) {
    insights.push("High priority item detected");
  }
  if (content.includes("tomorrow") || content.includes("today")) {
    insights.push("Time-sensitive item");
  }
  if (content.includes("project") || content.includes("work")) {
    insights.push("Work-related content");
  }

  // Extract potential tasks using simple heuristics
  const sentences = entry.content
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0);

  sentences.forEach((sentence) => {
    const trimmed = sentence.trim();

    // Look for action words that suggest tasks
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

    const hasActionWord = actionWords.some((word) =>
      trimmed.toLowerCase().includes(word),
    );

    if (hasActionWord && trimmed.length > 10 && trimmed.length < 100) {
      // Clean up the sentence to make it task-like
      let task = trimmed;

      // Remove unnecessary prefixes
      task = task.replace(
        /^(i |we |you )(need to |have to |must |should )/i,
        "",
      );
      task = task.replace(/^(need to |have to |must |should )/i, "");

      // Capitalize first letter
      task = task.charAt(0).toUpperCase() + task.slice(1);

      extractedTasks.push(task);
    }
  });

  // Add processed insights
  entry.processedInsights = insights;
  entry.extractedTasks = extractedTasks.slice(0, 3); // Limit to 3 tasks

  return entry;
};

export const getAllContextEntries: RequestHandler = (req, res) => {
  try {
    const response: ContextResponse = {
      entries: contextEntries.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
      total: contextEntries.length,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching context entries:", error);
    res.status(500).json({ error: "Failed to fetch context entries" });
  }
};

export const createContextEntry: RequestHandler = (req, res) => {
  try {
    const entryData: CreateContextRequest = req.body;

    if (!entryData.content?.trim()) {
      return res.status(400).json({ error: "Content is required" });
    }

    let newEntry: ContextEntry = {
      id: Date.now().toString(),
      content: entryData.content.trim(),
      source: entryData.source,
      type: entryData.type,
      createdAt: new Date().toISOString(),
    };

    // Process the entry to extract insights and tasks
    newEntry = processContextEntry(newEntry);

    contextEntries.unshift(newEntry); // Add to beginning of array

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error creating context entry:", error);
    res.status(500).json({ error: "Failed to create context entry" });
  }
};

export const deleteContextEntry: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const entryIndex = contextEntries.findIndex((entry) => entry.id === id);
    if (entryIndex === -1) {
      return res.status(404).json({ error: "Context entry not found" });
    }

    contextEntries.splice(entryIndex, 1);

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting context entry:", error);
    res.status(500).json({ error: "Failed to delete context entry" });
  }
};

export const getContextById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const entry = contextEntries.find((entry) => entry.id === id);
    if (!entry) {
      return res.status(404).json({ error: "Context entry not found" });
    }

    res.json(entry);
  } catch (error) {
    console.error("Error fetching context entry:", error);
    res.status(500).json({ error: "Failed to fetch context entry" });
  }
};

// Get context entries to help with task AI suggestions
export const getRecentContext: RequestHandler = (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    const recentEntries = contextEntries
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, limit);

    res.json({
      entries: recentEntries,
      total: recentEntries.length,
    });
  } catch (error) {
    console.error("Error fetching recent context:", error);
    res.status(500).json({ error: "Failed to fetch recent context" });
  }
};
