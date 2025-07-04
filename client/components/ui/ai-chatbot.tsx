import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Minimize2,
  Maximize2,
  X,
  Sparkles,
  Brain,
  Zap,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatbotProps {
  className?: string;
}

const aiSuggestions = [
  "Create a task for tomorrow's meeting",
  "Analyze my productivity patterns",
  "What should I prioritize today?",
  "Help me organize my week",
  "Show me my overdue tasks",
  "Generate task categories",
];

const aiResponses = {
  "create task":
    "I'll help you create a smart task! What would you like to work on? I can suggest priorities, deadlines, and categories based on your context.",
  productivity:
    "Based on your recent activity, you're most productive in the morning. I notice you complete 73% more tasks between 9-11 AM. Consider scheduling important work during this time!",
  prioritize:
    "Here are your top priorities for today:\n\n1. 🔴 Complete project presentation (Due today)\n2. 🟡 Review team feedback (High priority)\n3. 🟢 Schedule dentist appointment (This week)\n\nWould you like me to create time blocks for these?",
  "organize week":
    "I can help you organize your week! Based on your calendar and current tasks, I suggest:\n\n📅 Monday: Focus on project work\n📅 Tuesday: Meetings and collaboration\n📅 Wednesday: Deep work and planning\n📅 Thursday: Review and follow-ups\n📅 Friday: Wrap up and next week prep",
  overdue:
    "You have 2 overdue tasks:\n\n• Buy groceries (2 days overdue)\n• Update documentation (1 day overdue)\n\nShall I reschedule these for you?",
  categories:
    "I've analyzed your tasks and suggest these categories:\n\n🏢 Work (45%)\n🏠 Personal (25%)\n📚 Learning (15%)\n🛒 Shopping (10%)\n💪 Health (5%)\n\nWould you like me to auto-categorize your existing tasks?",
};

export function AIChatbot({ className }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content:
        "Hi! I'm your AI assistant. I can help you manage tasks, analyze productivity, and provide smart suggestions. What would you like to do today?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "Create a task",
        "Analyze productivity",
        "Organize my week",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const lowercaseInput = input.toLowerCase();
      let response =
        "I understand you want help with that. Let me analyze your request and provide the best suggestion...";
      let suggestions: string[] = [];

      // Smart response matching
      if (
        lowercaseInput.includes("task") ||
        lowercaseInput.includes("create")
      ) {
        response = aiResponses["create task"];
        suggestions = [
          "Create work task",
          "Create personal task",
          "Set deadline",
        ];
      } else if (lowercaseInput.includes("productiv")) {
        response = aiResponses["productivity"];
        suggestions = [
          "Show daily patterns",
          "Weekly insights",
          "Optimize schedule",
        ];
      } else if (
        lowercaseInput.includes("priorit") ||
        lowercaseInput.includes("today")
      ) {
        response = aiResponses["prioritize"];
        suggestions = ["Create time blocks", "Set reminders", "Reorder tasks"];
      } else if (
        lowercaseInput.includes("week") ||
        lowercaseInput.includes("organiz")
      ) {
        response = aiResponses["organize week"];
        suggestions = ["Plan next week", "Set weekly goals", "Review progress"];
      } else if (lowercaseInput.includes("overdue")) {
        response = aiResponses["overdue"];
        suggestions = ["Reschedule tasks", "Mark complete", "Delete outdated"];
      } else if (lowercaseInput.includes("categor")) {
        response = aiResponses["categories"];
        suggestions = [
          "Auto-categorize",
          "Create new category",
          "Merge categories",
        ];
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
        suggestions: suggestions.length > 0 ? suggestions : undefined,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-glow-strong bg-green-600 hover:bg-green-500 pulse-glow relative overflow-hidden"
          size="icon"
        >
          {/* AI Brain Icon with Sparkles */}
          <div className="relative">
            <Brain className="h-6 w-6 text-white" />
            <Sparkles className="h-3 w-3 text-green-200 absolute -top-1 -right-1 animate-pulse" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-300 rounded-full animate-ping" />
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Card
        className={cn(
          "glass transition-all duration-300 shadow-glow",
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]",
        )}
      >
        <CardHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center relative">
                <Brain className="h-4 w-4 text-white" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-sm text-ai-gradient">
                  AI Assistant
                </CardTitle>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  Online
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div className="max-w-[80%] space-y-2">
                    <div
                      className={cn(
                        "px-4 py-2 text-sm",
                        message.sender === "user"
                          ? "chat-user ml-auto"
                          : "chat-ai mr-auto",
                      )}
                    >
                      {message.content}
                    </div>

                    {message.suggestions && (
                      <div className="flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer text-xs hover:bg-ai-primary hover:text-white transition-colors"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    <div className="chat-ai px-4 py-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Brain className="h-3 w-3 animate-pulse" />
                        <span>Thinking...</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                          <div className="w-1 h-1 bg-current rounded-full animate-pulse delay-75"></div>
                          <div className="w-1 h-1 bg-current rounded-full animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="p-3 border-t bg-muted/30">
              <div className="flex flex-wrap gap-1">
                {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer text-xs hover:bg-ai-primary hover:text-white transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI anything..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="gradient-ai"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
