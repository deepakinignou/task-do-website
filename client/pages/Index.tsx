import { useState, useEffect } from "react";
import { Plus, Search, Filter, Brain, Calendar, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task, TasksResponse, DashboardStats } from "@shared/api";
import { TaskCard } from "@/components/ui/task-card";
import { CreateTaskDialog } from "@/components/ui/create-task-dialog";
import { Sidebar } from "@/components/layout/sidebar";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
          <span className="text-lg font-medium">Loading your tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 lg:ml-64">
          {/* Header */}
          <div className="sticky top-0 z-10 glass border-b p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                  Smart Todo
                </h1>
                <p className="text-muted-foreground mt-1">
                  AI-powered task management for the modern professional
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full lg:w-80"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Dashboard Stats */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Tasks
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalTasks}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.completedTasks} completed
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Productivity
                    </CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.productivityScore}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      AI-calculated score
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.pendingTasks}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stats.overdueTasks} overdue
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      This Week
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
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

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge
                variant={selectedCategory === "all" ? "default" : "secondary"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedCategory("all")}
              >
                All Tasks
              </Badge>
              {["Work", "Personal", "Shopping", "Health", "Learning"].map(
                (category) => (
                  <Badge
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "secondary"
                    }
                    className="cursor-pointer whitespace-nowrap"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ),
              )}
            </div>

            {/* Tasks Grid */}
            {sortedTasks.length === 0 ? (
              <Card className="glass">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchQuery || selectedCategory !== "all"
                      ? "Try adjusting your search or filters"
                      : "Create your first task to get started with AI-powered productivity"}
                  </p>
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create First Task
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="animate-fade-in"
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
    </div>
  );
}
