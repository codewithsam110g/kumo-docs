import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Link href={{ pathname: "/signin", query: { from: pathname } }} replace>
        Sign In
      </Link>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
