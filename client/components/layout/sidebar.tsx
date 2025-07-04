import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Brain,
  Calendar,
  Settings,
  Menu,
  X,
  Sparkles,
  BarChart3,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Context Input",
    href: "/context",
    icon: MessageSquare,
    badge: "AI",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "AI Insights",
    href: "/insights",
    icon: Brain,
    badge: "Active",
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
    badge: null,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden glass border-green-500/30 text-white hover:bg-green-600/20"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-black border-r border-green-500/20 transform transition-transform duration-200 ease-in-out z-50 lg:translate-x-0 lg:z-30",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center pulse-glow">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-white">Smart Todo</h1>
                <p className="text-xs text-green-400">AI-Powered Tasks</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-green-600 text-white shadow-green-glow"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant={isActive ? "secondary" : "outline"}
                      className={cn(
                        "text-xs",
                        isActive
                          ? "bg-white text-green-600"
                          : item.badge === "AI" || item.badge === "Active"
                            ? "border-green-500/50 text-green-400"
                            : "border-gray-600 text-gray-400",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* AI Status Footer */}
          <div className="p-4 border-t border-green-500/20">
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-green-600/20 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-white">
                    AI Status
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Context Analysis</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Task Suggestions</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">Ready</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Learning Mode</span>
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 font-medium">On</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center space-y-1">
                <p className="text-white font-medium">Smart Todo v2.0</p>
                <p className="text-gray-400">Dark Mode • AI Powered</p>
                <p className="text-green-400">Made with 🤖 & ❤️</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
