import { useState } from "react";
import {
  Clock,
  Brain,
  CheckCircle2,
  Circle,
  MoreVertical,
  Calendar,
  Tag,
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

const priorityColors: Record<TaskPriority, string> = {
  urgent: "bg-red-500 border-red-200",
  high: "bg-orange-500 border-orange-200",
  medium: "bg-yellow-500 border-yellow-200",
  low: "bg-green-500 border-green-200",
};

const priorityTextColors: Record<TaskPriority, string> = {
  urgent: "text-red-700 bg-red-50 border-red-200",
  high: "text-orange-700 bg-orange-50 border-orange-200",
  medium: "text-yellow-700 bg-yellow-50 border-yellow-200",
  low: "text-green-700 bg-green-50 border-green-200",
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

  return (
    <Card
      className={cn(
        "glass hover:shadow-card-hover transition-all duration-200 border-l-4",
        priorityColors[task.priority],
        isCompleted && "opacity-75",
        className,
      )}
      style={style}
    >
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
                <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
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
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
        {/* Priority and Category */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={cn("text-xs", priorityTextColors[task.priority])}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>

          <Badge variant="outline" className="text-xs">
            <Tag className="h-3 w-3 mr-1" />
            {task.category}
          </Badge>

          {task.aiScore && (
            <Badge variant="outline" className="text-xs">
              <Brain className="h-3 w-3 mr-1" />
              AI {Math.round(task.aiScore)}%
            </Badge>
          )}
        </div>

        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
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

        {/* Deadline */}
        {task.deadline && (
          <div
            className={cn(
              "flex items-center gap-2 text-sm",
              isOverdue ? "text-destructive" : "text-muted-foreground",
            )}
          >
            <Calendar className="h-4 w-4" />
            <span>{formatDate(task.deadline)}</span>
            {isOverdue && <span className="text-xs">(Overdue)</span>}
          </div>
        )}

        {/* AI Suggestions */}
        {task.aiSuggestions && task.aiSuggestions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Brain className="h-3 w-3" />
              AI Suggestions
            </div>
            <div className="space-y-1">
              {task.aiSuggestions.slice(0, 2).map((suggestion, index) => (
                <p
                  key={index}
                  className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1"
                >
                  {suggestion}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Progress indicator for in-progress tasks */}
        {task.status === "in-progress" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">In Progress</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        )}

        {/* Time info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Created {new Date(task.createdAt).toLocaleDateString()}
          </div>
          {task.status === "completed" && (
            <Badge variant="outline" className="text-xs text-green-600">
              ✓ Completed
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
