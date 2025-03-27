import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Home,
  Menu,
  FileText,
  Users,
  History,
  Plus,
  Search,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider
      defaultOpen={!isMobile}
      style={
        {
          "--sidebar-width-icon": "4.5rem",
          "--sidebar-width-expanded": "16rem",
        } as React.CSSProperties
      }
    >
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
};

// Separate component to use useSidebar hook
const AppLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // const handleLogout = () => {
  //   localStorage.removeItem("isAuthenticated");
  //   toast({
  //     title: "Logged out",
  //     description: "You have been logged out successfully",
  //   });
  //   router.push("/");
  // };

  return (
    <div className="flex min-h-screen w-full">
      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-background p-4 border-b md:hidden">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              {/* Mobile sidebar content */}
              <div className="flex flex-col h-full">
                <div className="p-4 flex items-center border-b">
                  <BookOpen className="h-6 w-6 text-accent mr-2" />
                  <span className="text-xl font-semibold tracking-tight">
                    NoteNova
                  </span>
                </div>
                <ScrollArea className="flex-1 py-2">
                  <div className="flex flex-col gap-1 px-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10"
                    >
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </Link>
                    <Link
                      href="/notes/all"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10"
                    >
                      <FileText className="h-5 w-5" />
                      <span>All Notes</span>
                    </Link>
                    <Link
                      href="/notes/shared"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10"
                    >
                      <Users className="h-5 w-5" />
                      <span>Shared Notes</span>
                    </Link>
                    <Link
                      href="/notes/history"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10"
                    >
                      <History className="h-5 w-5" />
                      <span>Version History</span>
                    </Link>
                  </div>
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/dashboard" className="flex items-center">
            <BookOpen className="h-6 w-6 text-accent mr-2" />
            <span className="text-xl font-semibold tracking-tight">
              NoteNova
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/search")}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/note/new/edit")}
            className="flex gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>New</span>
          </Button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <Sidebar
        variant="floating"
        collapsible="icon"
        className="hidden md:flex fixed left-0 top-0 h-full z-50"
      >
        <SidebarHeader>
          <div className="flex items-center justify-between px-2 py-2">
            <Link
              href="/dashboard"
              className="flex items-center group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:w-full"
            >
              <BookOpen className="h-6 w-6 text-accent mr-2 group-data-[state=collapsed]:mx-auto" />
              <span className="text-xl font-semibold tracking-tight group-data-[state=collapsed]:hidden">
                NoteNova
              </span>
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <ScrollArea className="h-full">
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip="Home"
                      className="group-data-[state=collapsed]:justify-center"
                    >
                      <Link href="/dashboard">
                        <Home className="h-5 w-5 group-data-[state=collapsed]:mx-auto" />
                        <span className="group-data-[state=collapsed]:hidden">
                          Home
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip="All Notes"
                      className="group-data-[state=collapsed]:justify-center"
                    >
                      <Link href="/notes/all">
                        <FileText className="h-5 w-5 group-data-[state=collapsed]:mx-auto" />
                        <span className="group-data-[state=collapsed]:hidden">
                          All Notes
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip="Shared Notes"
                      className="group-data-[state=collapsed]:justify-center"
                    >
                      <Link href="/notes/shared">
                        <Users className="h-5 w-5 group-data-[state=collapsed]:mx-auto" />
                        <span className="group-data-[state=collapsed]:hidden">
                          Shared Notes
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip="Version History"
                      className="group-data-[state=collapsed]:justify-center"
                    >
                      <Link href="/notes/history">
                        <History className="h-5 w-5 group-data-[state=collapsed]:mx-auto" />
                        <span className="group-data-[state=collapsed]:hidden">
                          Version History
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>

        <SidebarFooter>
          <Link
            href="/profile"
            className="flex items-center p-2 rounded-md hover:bg-sidebar-accent transition-colors group-data-[state=collapsed]:justify-center"
          >
            <div className="flex-shrink-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-accent/20 text-accent">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-3 group-data-[state=collapsed]:hidden">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60">
                john@example.com
              </p>
            </div>
          </Link>
        </SidebarFooter>
      </Sidebar>

      {/* Main content */}
      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${
          isCollapsed ? "md:pl-[4.5rem]" : "md:pl-[16rem]"
        }`}
      >
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
