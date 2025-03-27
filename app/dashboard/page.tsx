'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { BookOpen, Plus, Search , MoreVertical, Edit, Eye } from "lucide-react";
import AppLayout from "@/components/AppLayout";

// Mock data for notes
const MOCK_NOTES = [
  {
    id: "1",
    title: "Meeting Notes - Project Kickoff",
    content: "Key points from the kickoff meeting including project timeline and resource allocation.",
    createdAt: "2023-04-12T10:30:00Z",
    updatedAt: "2023-04-12T14:45:00Z",
    tags: ["work", "meetings"],
    isPublic: false,
  },
  {
    id: "2",
    title: "Research on Neural Networks",
    content: "Notes on advanced neural network architectures and their applications in image recognition.",
    createdAt: "2023-04-10T09:15:00Z",
    updatedAt: "2023-04-11T17:20:00Z",
    tags: ["research", "ai"],
    isPublic: true,
  },
  {
    id: "3",
    title: "Weekly Planning - April 2023",
    content: "Weekly goals, tasks, and priorities for April 2023.",
    createdAt: "2023-04-02T08:00:00Z",
    updatedAt: "2023-04-09T19:10:00Z",
    tags: ["planning", "personal"],
    isPublic: false,
  },
  {
    id: "4",
    title: "Book Notes: Atomic Habits",
    content: "Key insights and quotes from James Clear's Atomic Habits.",
    createdAt: "2023-03-28T15:45:00Z",
    updatedAt: "2023-04-05T11:30:00Z",
    tags: ["books", "personal-development"],
    isPublic: true,
  },
  {
    id: "5",
    title: "Product Features Brainstorm",
    content: "Ideas for new features and improvements for our product roadmap.",
    createdAt: "2023-03-20T13:20:00Z",
    updatedAt: "2023-04-01T10:15:00Z",
    tags: ["work", "brainstorming"],
    isPublic: false,
  },
];

const Dashboard = () => {
  const [notes, setNotes] = useState(MOCK_NOTES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const router = useRouter();

  // Sort notes by updatedAt date to show the most recent first
  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const filteredNotes = sortedNotes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) {
      toast({
        title: "Error",
        description: "Note title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      isPublic: false,
    };

    setNotes([newNote, ...notes]);
    setIsCreatingNote(false);
    setNewNoteTitle("");
    
    toast({
      title: "Note created",
      description: "Your new note has been created successfully",
    });

    // Navigate to the edit page of the new note
    router.push(`/note/${newNote.id}/edit`);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: "Note deleted",
      description: "Your note has been deleted successfully",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Sticky header */}
        <div className="sticky top-0 bg-background z-10 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4 sm:mb-0">Recent Notes</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search notes..."
                  className="pl-9 bg-secondary/50 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => setIsCreatingNote(true)}
                variant={"outline"}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </div>
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-secondary/30 rounded-full p-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-xl font-medium">No notes found</h3>
            <p className="mt-2 text-muted-foreground text-center max-w-sm">
              {searchTerm ? "Try adjusting your search term or clear the filter." : "Create your first note to get started."}
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => setIsCreatingNote(true)}
                className="mt-6 bg-accent hover:bg-accent/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="flex flex-col hover:border-accent/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold line-clamp-2 mr-8">{note.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/note/${note.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/note/${note.id}`);
                            toast({
                              title: "Link copied",
                              description: "Note link copied to clipboard",
                            });
                          }}
                        >
                          Copy link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-xs text-muted-foreground">
                    Updated {formatDate(note.updatedAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {note.content || "No content"}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3 pt-2">
                  {/* Tags row */}
                  <div className="flex flex-wrap gap-1 w-full">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center rounded-full bg-secondary/50 px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 3 && (
                      <span className="inline-flex items-center rounded-full bg-secondary/50 px-2 py-1 text-xs">
                        +{note.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Buttons row */}
                  <div className="flex gap-2 w-full justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs h-8"
                    >
                      <Link href={`/note/${note.id}`}>
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs h-8"
                    >
                      <Link href={`/note/${note.id}/edit`}>
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isCreatingNote} onOpenChange={setIsCreatingNote}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create new note</DialogTitle>
            <DialogDescription>
              Give your note a title to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="note-title">Note title</Label>
              <Input
                id="note-title"
                placeholder="Enter a title for your note"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingNote(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNote} variant={"outline"} className="bg-accent hover:bg-accent/90">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Dashboard;
