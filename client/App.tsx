import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContextInput from "./pages/ContextInput";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/context" element={<ContextInput />} />
          {/* Placeholder routes */}
          <Route
            path="/analytics"
            element={<PlaceholderPage title="Analytics" />}
          />
          <Route
            path="/insights"
            element={<PlaceholderPage title="AI Insights" />}
          />
          <Route
            path="/calendar"
            element={<PlaceholderPage title="Calendar" />}
          />
          <Route
            path="/settings"
            element={<PlaceholderPage title="Settings" />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Placeholder component for future pages
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex">
        <div className="w-64"></div> {/* Sidebar spacer */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
                {title}
              </h1>
              <p className="text-muted-foreground mb-6">
                This page is coming soon! We're working on amazing features for
                you.
              </p>
              <div className="animate-pulse">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mb-4"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
