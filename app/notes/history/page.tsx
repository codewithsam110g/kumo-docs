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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { History, Search, Clock, RotateCcw, Eye, Calendar } from "lucide-react";
import AppLayout from "@/components/AppLayout";

// Mock data for note history
const MOCK_HISTORY = [
  {
    id: "1",
    noteId: "101",
    title: "Project Kickoff Meeting Notes",
    versions: [
      {
        id: "v1-101",
        timestamp: "2023-04-20T14:35:00Z",
        changeDescription: "Initial creation",
      },
      {
        id: "v2-101",
        timestamp: "2023-04-20T15:10:00Z",
        changeDescription: "Added attendee list and action items",
      },
      {
        id: "v3-101",
        timestamp: "2023-04-21T09:45:00Z",
        changeDescription: "Added meeting outcomes and next steps",
      },
    ],
  },
  {
    id: "2",
    noteId: "102",
    title: "Product Roadmap 2023",
    versions: [
      {
        id: "v1-102",
        timestamp: "2023-04-15T10:20:00Z",
        changeDescription: "Initial draft",
      },
      {
        id: "v2-102",
        timestamp: "2023-04-16T11:05:00Z",
        changeDescription: "Updated Q2 milestones",
      },
      {
        id: "v3-102",
        timestamp: "2023-04-18T13:30:00Z",
        changeDescription: "Added resource allocation section",
      },
      {
        id: "v4-102",
        timestamp: "2023-04-19T16:45:00Z",
        changeDescription: "Incorporated feedback from leadership team",
      },
    ],
  },
  {
    id: "3",
    noteId: "103",
    title: "User Interview Findings",
    versions: [
      {
        id: "v1-103",
        timestamp: "2023-04-10T09:15:00Z",
        changeDescription: "Initial summary of interviews",
      },
      {
        id: "v2-103",
        timestamp: "2023-04-12T14:20:00Z",
        changeDescription: "Added key insights and quotes",
      },
    ],
  },
  {
    id: "4",
    noteId: "104",
    title: "Marketing Campaign Strategy",
    versions: [
      {
        id: "v1-104",
        timestamp: "2023-04-05T11:30:00Z",
        changeDescription: "Initial strategy outline",
      },
      {
        id: "v2-104",
        timestamp: "2023-04-07T13:45:00Z",
        changeDescription: "Added budget breakdown",
      },
      {
        id: "v3-104",
        timestamp: "2023-04-09T15:10:00Z",
        changeDescription: "Updated timeline and deliverables",
      },
    ],
  },
];

// Utility function to get time passed
const getTimePassed = (timestamp: string) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) {
    return diffDay === 1 ? "1 day ago" : `${diffDay} days ago`;
  }
  if (diffHour > 0) {
    return diffHour === 1 ? "1 hour ago" : `${diffHour} hours ago`;
  }
  if (diffMin > 0) {
    return diffMin === 1 ? "1 minute ago" : `${diffMin} minutes ago`;
  }
  return diffSec === 1 ? "1 second ago" : `${diffSec} seconds ago`;
};

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const VersionHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "recent">("recent");

  // Filter history based on search term
  const filteredHistory = MOCK_HISTORY.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // For "recent" view, get the most recent version for each note
  const recentVersions = filteredHistory.map((item) => ({
    ...item,
    latestVersion: item.versions[item.versions.length - 1],
  }));

  const handleRestoreVersion = (noteId: string, versionId: string) => {
    toast({
      title: "Version " + versionId + " restored for note: " + noteId,
      description: "The selected version has been restored",
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Sticky header */}
        <div className="sticky top-0 bg-background z-10 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="text-3xl font-bold tracking-tight mb-4 sm:mb-0">
              Version History
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by note title..."
                  className="pl-9 bg-secondary/50 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="recent"
            className="w-full"
            onValueChange={(value) => setViewMode(value as "all" | "recent")}
          >
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="recent">Recent Changes</TabsTrigger>
              <TabsTrigger value="all">All Versions</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-secondary/30 rounded-full p-4">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-xl font-medium">
              No version history found
            </h3>
            <p className="mt-2 text-muted-foreground text-center max-w-sm">
              {searchTerm
                ? "Try adjusting your search term or clear the filter."
                : "Your document version history will appear here."}
            </p>
          </div>
        ) : viewMode === "recent" ? (
          <div className="space-y-6 pb-6">
            {recentVersions.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">
                      {item.title}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      {getTimePassed(item.latestVersion.timestamp)}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    Latest change: {item.latestVersion.changeDescription}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 justify-between">
                  <div className="text-xs text-muted-foreground">
                    Updated on {formatDate(item.latestVersion.timestamp)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() =>
                        handleRestoreVersion(item.noteId, item.latestVersion.id)
                      }
                    >
                      <RotateCcw className="h-3.5 w-3.5 mr-1" />
                      Restore
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-xs"
                    >
                      <Link href={`/note/${item.noteId}`}>
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-8 pb-6">
            {filteredHistory.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {item.versions.length}{" "}
                    {item.versions.length === 1 ? "version" : "versions"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {item.versions.map((version, index) => (
                      <div key={version.id} className="relative pl-6 pb-4">
                        {/* Timeline indicator */}
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                        </div>
                        {/* Timeline connector line */}
                        {index < item.versions.length - 1 && (
                          <div className="absolute left-2 top-5 bottom-0 w-[1px] bg-accent/20"></div>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="font-medium">
                              {version.changeDescription}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(version.timestamp)}
                            </div>
                          </div>
                          <div className="flex gap-2 sm:self-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() =>
                                handleRestoreVersion(item.noteId, version.id)
                              }
                            >
                              <RotateCcw className="h-3.5 w-3.5 mr-1" />
                              Restore
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="text-xs"
                            >
                              <Link
                                href={`/note/${item.noteId}?version=${version.id}`}
                              >
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default VersionHistory;
