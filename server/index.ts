import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import route handlers
import { handleDemo } from "./routes/demo";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from "./routes/tasks";
import {
  getAllContextEntries,
  createContextEntry,
  deleteContextEntry,
  getContextById,
  getRecentContext,
} from "./routes/context";
import {
  getTaskSuggestions,
  analyzeContext,
  getFullAnalysis,
} from "./routes/ai";
import { getDashboardStats, getProductivityInsights } from "./routes/dashboard";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // API Routes

  // Health check
  app.get("/api/ping", (req, res) => {
    res.json({ message: "pong", timestamp: new Date().toISOString() });
  });

  // Legacy demo route
  app.get("/api/demo", handleDemo);

  // Task management routes
  app.get("/api/tasks", getAllTasks);
  app.post("/api/tasks", createTask);
  app.get("/api/tasks/:id", getTaskById);
  app.patch("/api/tasks/:id", updateTask);
  app.delete("/api/tasks/:id", deleteTask);

  // Context management routes
  app.get("/api/context", getAllContextEntries);
  app.post("/api/context", createContextEntry);
  app.get("/api/context/recent", getRecentContext);
  app.get("/api/context/:id", getContextById);
  app.delete("/api/context/:id", deleteContextEntry);

  // AI-powered features
  app.post("/api/ai/suggestions", getTaskSuggestions);
  app.post("/api/ai/analyze-context", analyzeContext);
  app.post("/api/ai/full-analysis", getFullAnalysis);

  // Dashboard and analytics
  app.get("/api/dashboard/stats", getDashboardStats);
  app.get("/api/dashboard/insights", getProductivityInsights);

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../spa");
    app.use(express.static(distPath));

    // SPA fallback - serve index.html for all non-API routes
    app.get("*", (req, res) => {
      if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(distPath, "index.html"));
      } else {
        res.status(404).json({ error: "API endpoint not found" });
      }
    });
  }

  // Global error handler
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      console.error("Unhandled error:", err);
      res.status(500).json({
        error: "Internal server error",
        message:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Something went wrong",
      });
    },
  );

  // 404 handler for API routes
  app.use("/api/*", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  return app;
}

// Start server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`🚀 Smart Todo server running on port ${port}`);
    console.log(`📝 Dashboard: http://localhost:${port}`);
    console.log(`🤖 AI Features: Enabled`);
    console.log(`📊 Analytics: Available at /api/dashboard/stats`);
  });
}
