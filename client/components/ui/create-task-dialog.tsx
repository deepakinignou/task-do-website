import { useState } from "react";
import { Brain, Calendar, Tag, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateTaskRequest, AITaskSuggestion } from "@shared/api";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskCreated?: () => void;
}

export function CreateTaskDialog({
  open,
  onOpenChange,
  onTaskCreated,
}: CreateTaskDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingAISuggestions, setIsGettingAISuggestions] = useState(false);
  const [aiSuggestions, setAISuggestions] = useState<AITaskSuggestion[]>([]);
  const [formData, setFormData] = useState<CreateTaskRequest>({
    title: "",
    description: "",
    category: "",
    deadline: "",
    tags: [],
  });

  const handleInputChange = (
    field: keyof CreateTaskRequest,
    value: string | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getAISuggestions = async () => {
    if (!formData.title.trim()) return;

    setIsGettingAISuggestions(true);
    try {
      const response = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskDetails: formData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAISuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
    } finally {
      setIsGettingAISuggestions(false);
    }
  };

  const applySuggestion = (suggestion: AITaskSuggestion) => {
    setFormData((prev) => ({
      ...prev,
      description: suggestion.suggestedDescription || prev.description,
      category: suggestion.suggestedCategory,
      deadline: suggestion.suggestedDeadline || prev.deadline,
      tags: suggestion.suggestedTags,
    }));
    setAISuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onOpenChange(false);
        onTaskCreated?.();
        setFormData({
          title: "",
          description: "",
          category: "",
          deadline: "",
          tags: [],
        });
        setAISuggestions([]);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !formData.tags?.includes(tag.trim())) {
      handleInputChange("tags", [...(formData.tags || []), tag.trim()]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags?.filter((tag) => tag !== tagToRemove) || [],
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] glass">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 gradient-primary" />
            Create Smart Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <div className="flex gap-2">
              <Input
                id="title"
                placeholder="What needs to be done?"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={getAISuggestions}
                disabled={!formData.title.trim() || isGettingAISuggestions}
              >
                <Brain
                  className={`h-4 w-4 ${isGettingAISuggestions ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>

          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="space-y-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">AI Suggestions</span>
              </div>
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="space-y-2 p-3 bg-white/50 dark:bg-slate-800/50 rounded border"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium">
                        {suggestion.suggestedTitle}
                      </p>
                      {suggestion.suggestedDescription && (
                        <p className="text-xs text-muted-foreground">
                          {suggestion.suggestedDescription}
                        </p>
                      )}
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {suggestion.suggestedCategory}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {suggestion.suggestedPriority}
                        </Badge>
                        {suggestion.suggestedTags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applySuggestion(suggestion)}
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    {suggestion.reasoning}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add more details about this task..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          {/* Category and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Learning">Learning</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline (Optional)</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="deadline"
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) =>
                    handleInputChange("deadline", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    addTag(input.value);
                    input.value = "";
                  }}
                >
                  <Tag className="h-4 w-4" />
                </Button>
              </div>

              {formData.tags && formData.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.title.trim() || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Create Task
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
