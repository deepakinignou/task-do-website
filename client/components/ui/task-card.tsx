import { useState } from "react";
import {
  Clock,
  Brain,
  CheckCircle2,
  Circle,
  MoreVertical,
  Calendar,
  Tag,
  Zap,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task, TaskPriority } from "@shared/api";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onUpdate?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const priorityConfig: Record<
  TaskPriority,
  { color: string; borderColor: string; bgColor: string }
> = {
  urgent: {
    color:
      "text-pink-700 bg-pink-100 border-pink-300 dark:text-pink-300 dark:bg-pink-950/50 dark:border-pink-700",
    borderColor: "border-l-pink-500",
    bgColor:
      "bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-950/20 dark:to-red-950/20",
  },
  high: {
    color:
      "text-red-700 bg-red-100 border-red-300 dark:text-red-300 dark:bg-red-950/50 dark:border-red-700",
    borderColor: "border-l-red-500",
    bgColor:
      "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20",
  },
  medium: {
    color:
      "text-amber-700 bg-amber-100 border-amber-300 dark:text-amber-300 dark:bg-amber-950/50 dark:border-amber-700",
    borderColor: "border-l-amber-500",
    bgColor:
      "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
  },
  low: {
    color:
      "text-green-700 bg-green-100 border-green-300 dark:text-green-300 dark:bg-green-950/50 dark:border-green-700",
    borderColor: "border-l-green-500",
    bgColor:
      "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
  },
};

export function TaskCard({ task, onUpdate, className, style }: TaskCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    try {
      const newStatus = task.status === "completed" ? "todo" : "completed";
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok && onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    return `${diffDays} days`;
  };

  const isOverdue =
    task.deadline &&
    new Date(task.deadline) < new Date() &&
    task.status !== "completed";
  const isCompleted = task.status === "completed";
  const priorityStyle = priorityConfig[task.priority];

  return (
    <Card
      className={cn(
        "glass hover:shadow-glow transition-all duration-300 border-l-4 group relative overflow-hidden",
        priorityStyle.borderColor,
        isCompleted && "opacity-75",
        className,
      )}
      style={style}
    >
      {/* AI Glow Effect for High AI Score */}
      {task.aiScore && task.aiScore > 80 && (
        <div className="absolute inset-0 bg-gradient-to-r from-ai-primary/5 to-ai-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent"
              onClick={handleToggleComplete}
              disabled={isCompleting}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground hover:text-ai-primary transition-colors" />
              )}
            </Button>

            <div className="flex-1 space-y-1">
              <h3
                className={cn(
                  "font-semibold leading-tight",
                  isCompleted && "line-through text-muted-foreground",
                )}
              >
                {task.title}
              </h3>

              {task.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Enhanced Priority and Category */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={cn("text-xs font-medium", priorityStyle.color)}>
            <Zap className="h-3 w-3 mr-1" />
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>

          <Badge variant="outline" className="text-xs">
            <Tag className="h-3 w-3 mr-1" />
            {task.category}
          </Badge>

          {task.aiScore && (
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                task.aiScore > 80 && "gradient-ai text-white border-ai-primary",
              )}
            >
              <Brain className="h-3 w-3 mr-1" />
              AI {Math.round(task.aiScore)}%
            </Badge>
          )}
        </div>

        {/* AI Score Progress Bar */}
        {task.aiScore && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                AI Confidence
              </span>
              <span className="font-medium">{Math.round(task.aiScore)}%</span>
            </div>
            <Progress
              value={task.aiScore}
              className={cn(
                "h-2",
                task.aiScore > 80 &&
                  "bg-gradient-to-r from-ai-primary to-ai-secondary",
              )}
            />
          </div>
        )}

        {/* Enhanced Tags */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs hover:bg-ai-primary hover:text-white transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {task.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{task.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Enhanced Deadline */}
        {task.deadline && (
          <div
            className={cn(
              "flex items-center gap-2 text-sm px-2 py-1 rounded-md",
              isOverdue
                ? "text-red-700 bg-red-50 border border-red-200 dark:text-red-300 dark:bg-red-950/50"
                : "text-muted-foreground bg-muted/50",
            )}
          >
            <Calendar className="h-4 w-4" />
            <span>{formatDate(task.deadline)}</span>
            {isOverdue && (
              <span className="text-xs font-medium">(Overdue)</span>
            )}
          </div>
        )}

        {/* Enhanced AI Suggestions */}
        {task.aiSuggestions && task.aiSuggestions.length > 0 && (
          <div className="space-y-2 p-3 rounded-lg gradient-ai-soft border">
            <div className="flex items-center gap-2 text-xs font-medium text-ai-primary">
              <Brain className="h-3 w-3" />
              AI Suggestions
            </div>
            <div className="space-y-1">
              {task.aiSuggestions.slice(0, 2).map((suggestion, index) => (
                <p
                  key={index}
                  className="text-xs text-muted-foreground bg-white/50 dark:bg-slate-800/50 rounded px-2 py-1 border"
                >
                  {suggestion}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Progress for in-progress tasks */}
        {task.status === "in-progress" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Progress
              </span>
              <span className="font-medium text-ai-primary">In Progress</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        )}

        {/* Enhanced Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
          {task.status === "completed" && (
            <Badge className="text-xs bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
