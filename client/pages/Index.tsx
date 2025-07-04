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
  Activity,
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-green-600 mx-auto flex items-center justify-center pulse-glow">
            <Brain className="h-10 w-10 text-white animate-pulse" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white">
              AI is analyzing your tasks...
            </h3>
            <p className="text-gray-400">Preparing intelligent insights</p>
          </div>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 lg:ml-64">
          {/* Dark Header with Green Accents */}
          <div className="sticky top-0 z-10 glass border-b border-green-500/20 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center pulse-glow">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white">
                      Smart Todo
                    </h1>
                    <p className="text-gray-400 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-green-500" />
                      AI-powered productivity for professionals
                    </p>
                  </div>
                </div>

                {/* AI Status Indicators */}
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-600 text-white border-green-500">
                    <Activity className="h-3 w-3 mr-1" />
                    AI Active
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-green-400 border-green-500/50"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Productivity: {stats?.productivityScore || 0}%
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-white border-gray-600"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Dark Mode
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search with AI assistance..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full lg:w-80 bg-black border-green-500/30 text-white placeholder-gray-400 focus:border-green-500"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-green-500/30 text-white hover:bg-green-600/20"
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <Button className="gap-2 bg-green-600 hover:bg-green-500 text-white">
                  <Plus className="h-4 w-4" />
                  AI Task
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Dark Stats Cards with Green Accents */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="glass border-l-4 border-l-green-500 hover:shadow-green-glow transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Total Tasks
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">
                      {stats.totalTasks}
                    </div>
                    <p className="text-xs text-gray-400">
                      {stats.completedTasks} completed today
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass border-l-4 border-l-green-400 hover:shadow-green-glow transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      AI Score
                    </CardTitle>
                    <Brain className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-300">
                      {stats.productivityScore}%
                    </div>
                    <p className="text-xs text-gray-400">
                      AI productivity insights
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass border-l-4 border-l-white hover:shadow-green-glow transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Active Tasks
                    </CardTitle>
                    <Zap className="h-4 w-4 text-white" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {stats.pendingTasks}
                    </div>
                    <p className="text-xs text-gray-400">
                      {stats.overdueTasks} need attention
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass border-l-4 border-l-green-600 hover:shadow-green-glow transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      This Week
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">
                      {stats.weeklyProgress?.reduce(
                        (acc, day) => acc + day.completed,
                        0,
                      ) || 0}
                    </div>
                    <p className="text-xs text-gray-400">Tasks completed</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* AI Insights Panel - Dark with Green */}
            <Card className="glass border border-green-500/30 bg-black/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-500" />
                  <span className="text-white">AI Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2 text-green-400">
                      <Sparkles className="h-4 w-4" />
                      Smart Suggestions
                    </h4>
                    <p className="text-xs text-gray-300">
                      Your morning productivity is 40% higher. Schedule
                      important tasks between 9-11 AM.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2 text-white">
                      <TrendingUp className="h-4 w-4" />
                      Pattern Analysis
                    </h4>
                    <p className="text-xs text-gray-300">
                      You complete 73% more tasks when you break them into
                      smaller steps.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2 text-green-300">
                      <Zap className="h-4 w-4" />
                      Quick Action
                    </h4>
                    <p className="text-xs text-gray-300">
                      2 high-priority tasks detected. Consider focusing on these
                      first.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Filter - Dark Theme */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge
                variant={selectedCategory === "all" ? "default" : "secondary"}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-green-600 text-white hover:bg-green-500"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
                        ? "bg-green-600 text-white hover:bg-green-500"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ),
              )}
            </div>

            {/* Tasks Grid - Dark Theme */}
            {sortedTasks.length === 0 ? (
              <Card className="glass border border-green-500/30">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="h-24 w-24 rounded-full bg-green-600 flex items-center justify-center mb-6 float">
                    <Brain className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    AI Ready to Help!
                  </h3>
                  <p className="text-gray-400 text-center mb-6 max-w-md leading-relaxed">
                    {searchQuery || selectedCategory !== "all"
                      ? "No tasks match your current filters. Try adjusting your search or ask our AI assistant for help."
                      : "Welcome to your intelligent task manager! Create your first task and let AI enhance your productivity."}
                  </p>
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="gap-2 bg-green-600 hover:bg-green-500 text-white"
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
                    className="animate-fade-in hover:shadow-green-glow transition-all duration-300"
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

      {/* AI Chatbot - Dark Theme */}
      <AIChatbot />
    </div>
  );
}
