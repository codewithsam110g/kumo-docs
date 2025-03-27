"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Search, MoreVertical, Users, Eye, Edit } from "lucide-react";
import AppLayout from "@/components/AppLayout";

// Mock data for shared notes
const MOCK_SHARED_NOTES = [
  {
    id: "10",
    title: "Team Project Roadmap Q2 2023",
    content: "Detailed roadmap for our team's Q2 projects and deliverables.",
    createdAt: "2023-04-10T09:30:00Z",
    updatedAt: "2023-04-15T16:20:00Z",
    tags: ["work", "planning", "roadmap"],
    isPublic: true,
    sharedBy: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "",
      initials: "SJ",
    },
    permissions: "edit", // "view" or "edit"
  },
  {
    id: "11",
    title: "Marketing Campaign Strategy",
    content:
      "Strategy document for the upcoming product launch marketing campaign.",
    createdAt: "2023-04-05T11:15:00Z",
    updatedAt: "2023-04-12T13:40:00Z",
    tags: ["marketing", "strategy"],
    isPublic: true,
    sharedBy: {
      id: "user2",
      name: "Michael Brown",
      avatar: "",
      initials: "MB",
    },
    permissions: "view",
  },
  {
    id: "12",
    title: "UI/UX Design Guidelines",
    content: "Official design guidelines and best practices for our products.",
    createdAt: "2023-03-28T10:00:00Z",
    updatedAt: "2023-04-08T15:30:00Z",
    tags: ["design", "guidelines"],
    isPublic: true,
    sharedBy: {
      id: "user3",
      name: "Emily Davis",
      avatar: "",
      initials: "ED",
    },
    permissions: "edit",
  },
  {
    id: "13",
    title: "Product Feedback Summary",
    content:
      "Compiled feedback from user testing sessions and customer interviews.",
    createdAt: "2023-03-20T14:25:00Z",
    updatedAt: "2023-04-02T09:15:00Z",
    tags: ["feedback", "user-research"],
    isPublic: true,
    sharedBy: {
      id: "user4",
      name: "David Wilson",
      avatar: "",
      initials: "DW",
    },
    permissions: "view",
  },
];

const SharedNotes = () => {
  const [notes] = useState(MOCK_SHARED_NOTES);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter notes based on search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      note.sharedBy.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
            <h1 className="text-3xl font-bold tracking-tight mb-4 sm:mb-0">
              Shared Notes
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search shared notes..."
                  className="pl-9 bg-secondary/50 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-secondary/30 rounded-full p-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-xl font-medium">No shared notes found</h3>
            <p className="mt-2 text-muted-foreground text-center max-w-sm">
              {searchTerm
                ? "Try adjusting your search term or clear the filter."
                : "No one has shared any notes with you yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                className="flex flex-col hover:border-accent/50 transition-colors"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold line-clamp-2 mr-8">
                      {note.title}
                    </CardTitle>
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
                            navigator.clipboard.writeText(
                              `${window.location.origin}/note/${note.id}`,
                            );
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
                          //onClick={() => handleDeleteNote(note.id)}
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

export default SharedNotes;
