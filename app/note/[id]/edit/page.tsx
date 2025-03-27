'use client';
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Save,
  ChevronLeft,
  Mic,
  MicOff,
  Image,
  Paperclip,
  Video,
  Plus,
  X,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";

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
  tags: ["work", "meetings"],
  isPublic: false,
};

const NoteEditor = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const isNew = id === "new";
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachmentDialogOpen, setAttachmentDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      // Load note data
      setTitle(MOCK_NOTE.title);
      setContent(MOCK_NOTE.content);
      setTags(MOCK_NOTE.tags);
    }
  }, [isNew, id]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      setIsTagDialogOpen(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "Your speech has been transcribed to text",
      });
      // In a real app, you would add the transcribed text to the content
    } else {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly to transcribe your speech to text",
      });
    }
  };

  const handleAttachment = (type: string) => {
    setAttachmentDialogOpen(false);
    // In a real app, you would open a file picker
    toast({
      title: `Adding ${type}`,
      description: `Select a ${type} to attach to your note`,
    });
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your note",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Note saved",
        description: "Your note has been saved successfully",
      });
      router.push(`/note/${isNew ? "new" : id}`);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="container mx-auto max-w-5xl py-8 px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.back()}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleRecording}
              className={isRecording ? "animate-pulse border-destructive text-destructive" : ""}
            >
              {isRecording ? (
                <>
                  <MicOff className="mr-2 h-4 w-4" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" />
                  Record Audio
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setAttachmentDialogOpen(true)}
            >
              <Paperclip className="mr-2 h-4 w-4" />
              Attach
            </Button>
            
            <Button 
              onClick={handleSave}
              className="bg-accent hover:bg-accent/90"
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="rounded-full hover:bg-secondary/80 flex items-center justify-center w-4 h-4"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-muted-foreground"
              onClick={() => setIsTagDialogOpen(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Tag
            </Button>
          </div>
          
          <Textarea
            placeholder="Write your note content here... Supports Markdown formatting."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[50vh] text-base bg-secondary/20 resize-none focus-visible:ring-accent"
          />
        </div>
      </div>
      
      {/* Add Tag Dialog */}
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add tag</DialogTitle>
            <DialogDescription>
              Add a tag to help organize your notes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter tag name"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTag();
                  }
                }}
                className="bg-secondary/50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTagDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTag} className="bg-accent hover:bg-accent/90">
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Attachment Dialog */}
      <Dialog open={attachmentDialogOpen} onOpenChange={setAttachmentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add attachment</DialogTitle>
            <DialogDescription>
              Select the type of attachment to add to your note.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col h-24 py-4"
              onClick={() => handleAttachment("image")}
            >
              <Image className="h-8 w-8 mb-2"/>
              <span>Image</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-24 py-4"
              onClick={() => handleAttachment("video")}
            >
              <Video className="h-8 w-8 mb-2" />
              <span>Video</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-24 py-4"
              onClick={() => handleAttachment("file")}
            >
              <Paperclip className="h-8 w-8 mb-2" />
              <span>File</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-24 py-4"
              onClick={() => handleAttachment("audio")}
            >
              <Mic className="h-8 w-8 mb-2" />
              <span>Audio</span>
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAttachmentDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default NoteEditor;
