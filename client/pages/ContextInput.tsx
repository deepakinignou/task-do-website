import { useState, useEffect } from "react";
import {
  MessageSquare,
  Mail,
  FileText,
  Plus,
  Brain,
  Sparkles,
  Clock,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sidebar } from "@/components/layout/sidebar";
import {
  ContextEntry,
  ContextSource,
  ContextType,
  CreateContextRequest,
} from "@shared/api";

const sourceIcons: Record<ContextSource, any> = {
  whatsapp: MessageSquare,
  email: Mail,
  notes: FileText,
  manual: Plus,
};

const sourceColors: Record<ContextSource, string> = {
  whatsapp: "text-green-600 bg-green-50 border-green-200",
  email: "text-blue-600 bg-blue-50 border-blue-200",
  notes: "text-purple-600 bg-purple-50 border-purple-200",
  manual: "text-gray-600 bg-gray-50 border-gray-200",
};

export default function ContextInput() {
  const [contextEntries, setContextEntries] = useState<ContextEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState<CreateContextRequest>({
    content: "",
    source: "manual",
    type: "message",
  });

  useEffect(() => {
    fetchContextEntries();
  }, []);

  const fetchContextEntries = async () => {
    try {
      const response = await fetch("/api/context");
      const data = await response.json();
      setContextEntries(data.entries || []);
    } catch (error) {
      console.error("Error fetching context entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          content: "",
          source: "manual",
          type: "message",
        });
        fetchContextEntries();
      }
    } catch (error) {
      console.error("Error adding context:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const analyzeContext = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai/analyze-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contextEntries: contextEntries.slice(-10), // Last 10 entries
        }),
      });

      if (response.ok) {
        const analysis = await response.json();
        // Handle analysis results - could show in a toast or modal
        console.log("Context analysis:", analysis);
        fetchContextEntries(); // Refresh to get updated insights
      }
    } catch (error) {
      console.error("Error analyzing context:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      const response = await fetch(`/api/context/${entryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchContextEntries();
      }
    } catch (error) {
      console.error("Error deleting context entry:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
          <span className="text-lg font-medium">Loading context...</span>
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
                  Daily Context
                </h1>
                <p className="text-muted-foreground mt-1">
                  Help AI understand your daily activities for smarter task
                  suggestions
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={analyzeContext}
                  disabled={isAnalyzing || contextEntries.length === 0}
                  className="gap-2"
                >
                  <Brain
                    className={`h-4 w-4 ${isAnalyzing ? "animate-spin" : ""}`}
                  />
                  {isAnalyzing ? "Analyzing..." : "Analyze Context"}
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Context Entry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Paste your WhatsApp messages, emails, or notes here..."
                        value={formData.content}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                        rows={6}
                        className="min-h-[150px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="source">Source</Label>
                        <Select
                          value={formData.source}
                          onValueChange={(value: ContextSource) =>
                            setFormData((prev) => ({ ...prev, source: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="notes">Notes</SelectItem>
                            <SelectItem value="manual">Manual Entry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value: ContextType) =>
                            setFormData((prev) => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="message">Message</SelectItem>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="reminder">Reminder</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={!formData.content.trim() || isSubmitting}
                      className="w-full gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Add Context
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Context History */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Context
                    </div>
                    <Badge variant="outline">
                      {contextEntries.length} entries
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {contextEntries.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No context entries yet</p>
                        <p className="text-sm">
                          Add your daily activities to help AI understand your
                          workflow
                        </p>
                      </div>
                    ) : (
                      contextEntries.map((entry, index) => {
                        const SourceIcon = sourceIcons[entry.source];
                        return (
                          <div
                            key={entry.id}
                            className="p-3 border rounded-lg space-y-3 hover:bg-muted/50 transition-colors animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={sourceColors[entry.source]}
                                >
                                  <SourceIcon className="h-3 w-3 mr-1" />
                                  {entry.source}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {entry.type}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {new Date(
                                    entry.createdAt,
                                  ).toLocaleDateString()}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteEntry(entry.id)}
                                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <p className="text-sm line-clamp-3">
                              {entry.content}
                            </p>

                            {entry.processedInsights &&
                              entry.processedInsights.length > 0 && (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <Sparkles className="h-3 w-3" />
                                    AI Insights
                                  </div>
                                  <div className="space-y-1">
                                    {entry.processedInsights.map(
                                      (insight, i) => (
                                        <p
                                          key={i}
                                          className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1"
                                        >
                                          {insight}
                                        </p>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}

                            {entry.extractedTasks &&
                              entry.extractedTasks.length > 0 && (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <Brain className="h-3 w-3" />
                                    Extracted Tasks
                                  </div>
                                  <div className="space-y-1">
                                    {entry.extractedTasks.map((task, i) => (
                                      <p
                                        key={i}
                                        className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/20 rounded px-2 py-1"
                                      >
                                        {task}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Analysis Tips */}
            <Card className="glass mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Context Analysis Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">WhatsApp Messages</h4>
                    <p className="text-xs text-muted-foreground">
                      Copy important conversations about meetings, deadlines, or
                      commitments to help AI understand your schedule.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Email Content</h4>
                    <p className="text-xs text-muted-foreground">
                      Include meeting invites, project updates, and task
                      assignments to get context-aware task suggestions.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Daily Notes</h4>
                    <p className="text-xs text-muted-foreground">
                      Add your thoughts, ideas, and quick notes to help AI
                      prioritize and categorize your tasks better.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
