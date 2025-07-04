import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Brain,
  Calendar,
  BarChart3,
  Zap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task, TasksResponse, DashboardStats } from "@shared/api";
import { TaskCard } from "@/components/ui/task-card";
import { CreateTaskDialog } from "@/components/ui/create-task-dialog";
import { Sidebar } from "@/components/layout/sidebar";
import { AIChatbot } from "@/components/ui/ai-chatbot";

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data: TasksResponse = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats");
      const data: DashboardStats = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (a.status === "completed" && b.status !== "completed") return 1;
    if (a.status !== "completed" && b.status === "completed") return -1;
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-950 dark:to-blue-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 rounded-full gradient-ai mx-auto flex items-center justify-center pulse-glow">
            <Brain className="h-8 w-8 text-white animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-ai-gradient">
              AI is analyzing your tasks...
            </h3>
            <p className="text-muted-foreground">
              Preparing intelligent insights
            </p>
          </div>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-ai-secondary rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-ai-accent rounded-full animate-bounce delay-150"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-950 dark:to-blue-950">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 lg:ml-64">
          {/* Enhanced Header */}
          <div className="sticky top-0 z-10 glass border-b p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl gradient-ai flex items-center justify-center pulse-glow">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-ai-gradient">
                      Smart Todo
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI-powered productivity at your fingertips
                    </p>
                  </div>
                </div>

                {/* AI Status Indicator */}
                <div className="flex items-center gap-2">
                  <Badge className="gradient-ai text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    AI Active
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Productivity: {stats?.productivityScore || 0}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search with AI assistance..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full lg:w-80 ai-glow"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:shadow-glow"
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="gap-2 gradient-ai shadow-glow hover:shadow-glow-strong"
                >
                  <Plus className="h-4 w-4" />
                  AI Task
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Enhanced Dashboard Stats */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="glass hover:shadow-glow transition-all duration-300 border-l-4 border-l-ai-primary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Tasks
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-ai-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-ai-gradient">
                      {stats.totalTasks}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stats.completedTasks} completed today
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass hover:shadow-glow transition-all duration-300 border-l-4 border-l-ai-secondary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      AI Score
                    </CardTitle>
                    <Brain className="h-4 w-4 text-ai-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-ai-gradient">
                      {stats.productivityScore}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Productivity insights
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass hover:shadow-glow transition-all duration-300 border-l-4 border-l-ai-accent">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Tasks
                    </CardTitle>
                    <Zap className="h-4 w-4 text-ai-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-ai-gradient">
                      {stats.pendingTasks}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stats.overdueTasks} need attention
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass hover:shadow-glow transition-all duration-300 border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      This Week
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-ai-gradient">
                      {stats.weeklyProgress?.reduce(
                        (acc, day) => acc + day.completed,
                        0,
                      ) || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tasks completed
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* AI Insights Panel */}
            <Card className="glass gradient-ai-soft border ai-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-ai-primary" />
                  <span className="text-ai-gradient">AI Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-ai-primary" />
                      Smart Suggestions
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Your morning productivity is 40% higher. Schedule
                      important tasks between 9-11 AM.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-ai-secondary" />
                      Pattern Analysis
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      You complete 73% more tasks when you break them into
                      smaller steps.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-ai-accent" />
                      Quick Action
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      2 high-priority tasks detected. Consider focusing on these
                      first.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge
                variant={selectedCategory === "all" ? "default" : "secondary"}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedCategory === "all" ? "gradient-ai text-white" : ""
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                All Tasks
              </Badge>
              {["Work", "Personal", "Shopping", "Health", "Learning"].map(
                (category) => (
                  <Badge
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "secondary"
                    }
                    className={`cursor-pointer whitespace-nowrap ${
                      selectedCategory === category
                        ? "gradient-ai text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ),
              )}
            </div>

            {/* Enhanced Tasks Grid */}
            {sortedTasks.length === 0 ? (
              <Card className="glass ai-glow">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="h-20 w-20 rounded-full gradient-ai flex items-center justify-center mb-6 float">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-ai-gradient mb-3">
                    AI Ready to Help!
                  </h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-md">
                    {searchQuery || selectedCategory !== "all"
                      ? "No tasks match your current filters. Try adjusting your search or ask our AI assistant for help."
                      : "Welcome to your intelligent task manager! Create your first task and let AI enhance your productivity."}
                  </p>
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="gap-2 gradient-ai shadow-glow"
                  >
                    <Sparkles className="h-4 w-4" />
                    Create AI-Powered Task
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="animate-fade-in hover:shadow-glow transition-all duration-300"
                    onUpdate={fetchTasks}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onTaskCreated={fetchTasks}
      />

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}
