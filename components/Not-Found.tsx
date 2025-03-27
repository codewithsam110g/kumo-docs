
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Home } from "lucide-react";
import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const homeRoute = isAuthenticated ? "/dashboard" : "/";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center text-center max-w-md glass-morphism rounded-xl p-12">
        <div className="bg-secondary/30 rounded-full p-6 mb-8">
          <BookOpen className="h-12 w-12 text-accent" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn&#39;t exist or has been moved.
        </p>
        <Button asChild className="bg-accent hover:bg-accent/90">
          <Link href={homeRoute}>
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
