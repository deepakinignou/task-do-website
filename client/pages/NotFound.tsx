import { Link } from "react-router-dom";
import { Home, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-6">
      <Card className="glass max-w-md w-full">
        <CardContent className="flex flex-col items-center text-center py-12">
          <div className="h-20 w-20 gradient-primary rounded-full flex items-center justify-center mb-6">
            <Sparkles className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>

          <h2 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent mb-3">
            Page Not Found
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back to your smart todo dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button asChild className="flex-1 gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>

            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="mt-8 text-xs text-muted-foreground">
            <p>Smart Todo - AI-Powered Task Management</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
