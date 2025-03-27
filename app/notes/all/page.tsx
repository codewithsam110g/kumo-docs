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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { BookOpen, Plus, Search, MoreVertical, Edit, Eye } from "lucide-react";
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
  {
    id: "6",
    title: "Interview Questions for Frontend Developers",
    content: "A compilation of common interview questions for frontend developer positions.",
    createdAt: "2023-03-15T09:00:00Z",
    updatedAt: "2023-03-25T14:30:00Z",
    tags: ["career", "interview"],
    isPublic: true,
  },
  {
    id: "7",
    title: "Design System Guidelines",
    content: "Guidelines and principles for our company's design system.",
    createdAt: "2023-03-10T11:20:00Z",
    updatedAt: "2023-03-18T16:45:00Z",
    tags: ["design", "work"],
    isPublic: false,
  },
  {
    id: "8",
    title: "Travel Itinerary - Japan 2023",
    content: "Detailed itinerary for the upcoming Japan trip including accommodations and activities.",
    createdAt: "2023-03-05T14:10:00Z",
    updatedAt: "2023-03-12T19:20:00Z",
    tags: ["travel", "personal"],
    isPublic: false,
  },
];

type SortOption = "updated-desc" | "updated-asc" | "created-desc" | "created-asc" | "title-asc" | "title-desc";

const AllNotes = () => {
  const [notes] = useState(MOCK_NOTES);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("updated-desc");
  const router = useRouter();

  // Filter and sort notes
  const filteredAndSortedNotes = [...notes]
    .filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "updated-desc":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case "updated-asc":
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case "created-desc":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "created-asc":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const handleDeleteNote = (id: string) => {
    toast({
      title: "Note deleted: " + id,
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
            <h1 className="text-3xl font-bold tracking-tight mb-4 sm:mb-0">All Notes</h1>
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
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value as SortOption)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated-desc">Latest Updated</SelectItem>
                  <SelectItem value="updated-asc">Oldest Updated</SelectItem>
                  <SelectItem value="created-desc">Latest Created</SelectItem>
                  <SelectItem value="created-asc">Oldest Created</SelectItem>
                  <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant={"outline"}
                onClick={() => router.push("/note/new/edit")}
                className="bg-accent hover:bg-accent/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </div>
          </div>
        </div>

        {filteredAndSortedNotes.length === 0 ? (
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
                onClick={() => router.push("/note/new/edit")}
                className="mt-6 bg-accent hover:bg-accent/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {filteredAndSortedNotes.map((note) => (
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
    </AppLayout>
  );
};

export default AllNotes;
