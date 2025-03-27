'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { 
  Edit, 
  Clock, 
  Trash, 
  MoreVertical, 
  Lock, 
  Unlock, 
  ChevronLeft,
  Users,
  LinkIcon,
  History
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import NotFound from "@/components/Not-Found";
import React from "react";

// Mock data for a single note
const MOCK_NOTE = {
  id: "1",
  title: "Meeting Notes - Project Kickoff",
  content: `# Project Kickoff Meeting
  
## Attendees
- John Smith (Project Manager)
- Emily Johnson (Designer)
- Michael Brown (Developer)
- Sarah Williams (Client)

## Agenda
1. Project overview and objectives
2. Timeline and milestones
3. Resource allocation
4. Communication plan
5. Next steps

## Key Points
- Project deadline: June 30, 2023
- Main deliverables: website redesign, mobile app development
- Weekly status meetings every Monday at 10:00 AM
- Communication primarily through Slack and email

## Action Items
- [ ] John to distribute detailed project plan by Friday
- [ ] Emily to prepare initial design concepts by next week
- [ ] Michael to set up development environment and repositories
- [ ] Sarah to provide brand guidelines and assets

## Notes
The client emphasized the importance of mobile responsiveness and performance optimization. We should prioritize these aspects during the development phase.

The initial budget has been approved, but there might be additional funds available for extra features if needed.`,
  createdAt: "2023-04-12T10:30:00Z",
  updatedAt: "2023-04-12T14:45:00Z",
  updatedBy: "John Doe",
  tags: ["work", "meetings"],
  isPublic: false,
  sharedWith: ["user1@example.com", "user2@example.com"],
  versions: [
    { id: "v1", timestamp: "2023-04-12T10:30:00Z", editor: "John Doe" },
    { id: "v2", timestamp: "2023-04-12T11:45:00Z", editor: "John Doe" },
    { id: "v3", timestamp: "2023-04-12T14:45:00Z", editor: "John Doe" }
  ]
};

const NotePage = () => {
  const params = useParams();
  const id = params.id;
  const [note, setNote] = useState(MOCK_NOTE);
  const [loading, setLoading] = useState(true);
  const [isPublic, setIsPublic] = useState(MOCK_NOTE.isPublic);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);
  setNote(MOCK_NOTE);
  if (loading) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8 px-4 sm:px-6 animate-pulse">
          <div className="h-8 bg-secondary rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-secondary rounded w-1/4 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-secondary rounded w-full"></div>
            <div className="h-4 bg-secondary rounded w-full"></div>
            <div className="h-4 bg-secondary rounded w-3/4"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!note) {
    return <NotFound />;
  }

  const toggleNoteVisibility = () => {
    setIsPublic(!isPublic);
    
    toast({
      title: isPublic ? "Note is now private" : "Note is now public",
      description: isPublic 
        ? "Only you can access this note" 
        : "Anyone with the link can view this note",
    });
  };

  const handleDeleteNote = () => {
    // In a real app, this would make an API call
    toast({
      title: "Note deleted",
      description: "Your note has been deleted successfully",
    });
    router.push("/dashboard");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4"
            onClick={() => router.back()}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{note.title}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>Updated {formatDate(note.updatedAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleNoteVisibility}
              >
                {isPublic ? (
                  <>
                    <Unlock className="mr-2 h-4 w-4" />
                    Public
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Private
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/note/${note.id}`);
                  toast({
                    title: "Link copied",
                    description: "Note link copied to clipboard",
                  });
                }}
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Share
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="bg-accent hover:bg-accent/90"
              >
                <Link href={`/note/${note.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Manage collaborators</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <History className="mr-2 h-4 w-4" />
                    <span>View history</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive"
                    onClick={handleDeleteNote}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete note</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-6 bg-card">
          <article className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent">
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }} />
          </article>
        </div>
        
        {note.sharedWith.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">Shared with</h3>
            <div className="flex flex-wrap gap-2">
              {note.sharedWith.map((email) => (
                <div key={email} className="flex items-center rounded-full bg-secondary/50 px-3 py-1 text-sm">
                  <span>{email}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">Version history</h3>
          <div className="border border-border rounded-lg divide-y divide-border overflow-hidden">
            {note.versions.map((version, index) => (
              <div key={version.id} className="flex items-center justify-between p-4 hover:bg-secondary/20">
                <div>
                  <p className="font-medium">
                    {index === note.versions.length - 1 ? "Current version" : `Version ${index + 1}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(version.timestamp)} by {version.editor}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

// Basic Markdown rendering helper (in a real app, use a proper Markdown library)
const renderMarkdown = (markdown: string) => {
  let html = markdown
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
    .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
    .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
    .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gm, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
    .replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" />')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.*$)/gm, '<ul><li>$1</li></ul>')
    .replace(/^[0-9]+\. (.*$)/gm, '<ol><li>$1</li></ol>')
    .replace(/^```([\s\S]*?)```$/gm, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/gm, '<code>$1</code>')
    .replace(/^---$/gm, '<hr />')
    .replace(/\n/gm, '<br />');
    
  // Handle task lists
  html = html.replace(/- \[ \] (.*$)/gm, '<div class="flex items-center space-x-2"><input type="checkbox" disabled /><span>$1</span></div>')
  html = html.replace(/- \[x\] (.*$)/gm, '<div class="flex items-center space-x-2"><input type="checkbox" checked disabled /><span>$1</span></div>')
    
  return html;
};

export default NotePage;
