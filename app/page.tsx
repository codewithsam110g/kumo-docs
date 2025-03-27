import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  BookOpen,
  UploadCloud,
  Mic,
  Users,
  History,
  Lock,
  Search,
  Star,
  Tag,
  ArrowRight,
  FileText,
} from "lucide-react";
import PricingSection from "@/components/section/pricing_section";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navbar */}
      <header className="w-full backdrop-blur-md bg-background/80 fixed top-0 z-50 border-b border-border">
        <div className="container mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-semibold tracking-tight">
              NoteNova
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#preview"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Preview
            </a>
            <a
              href="#testimonials"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/signin">
              <Button variant="ghost" size="sm" className="text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="default" size="sm" className="text-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-6">
            <span>Introducing NoteNova</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mb-6">
            Capture your thoughts with{" "}
            <span className="text-primary">unmatched elegance</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            The next-generation notes app designed for creatives, professionals,
            and thinkers. Experience the perfect balance of beauty and
            functionality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button className="w-full sm:w-auto">
                Start for free
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#preview">
              <Button variant="outline" className="w-full sm:w-auto">
                See it in action
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section
        id="preview"
        className="container mx-auto px-4 sm:px-6 pb-16 md:pb-24"
      >
        <div className="w-full max-w-6xl mx-auto border rounded-xl overflow-hidden shadow-lg">
          <div className="bg-secondary p-2 flex items-center gap-2 border-b border-border">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-primary/50"></div>
              <div className="w-3 h-3 rounded-full bg-muted"></div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-3 py-1 text-xs bg-background/20 rounded-md text-muted-foreground">
                My workspace — NoteNova Editor
              </div>
            </div>
          </div>
          <div className="flex h-[500px]">
            {/* Sidebar mockup */}
            <div className="hidden md:block w-64 bg-secondary border-r border-border py-2 px-3">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-medium">NoteNova</span>
              </div>
              <div className="bg-background/10 p-2 rounded-md mb-2 flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Search...</span>
              </div>
              <div className="py-2">
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <span>RECENT NOTES</span>
                </div>
                {["Project ideas", "Meeting notes", "Learning resources"].map(
                  (note, i) => (
                    <div
                      key={i}
                      className={`px-2 py-1.5 rounded-md text-sm mb-1 flex items-center ${i === 0 ? "bg-primary/20 text-primary" : "hover:bg-background/10"}`}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {note}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Editor mockup */}
            <div className="flex-1 bg-background overflow-hidden">
              <div className="p-6 h-full">
                <div className="w-full mb-6">
                  <h1 className="text-3xl font-bold mb-2">Project ideas ✨</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Last edited 2 minutes ago</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Tag className="h-3 w-3 mr-1" />
                      <span>work</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-lg mb-4">
                    Here are some project ideas we should consider for Q3:
                  </p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">
                    1. Mobile App Redesign
                  </h2>
                  <p className="mb-3">
                    Our mobile app needs a fresh look to match our new brand
                    guidelines. We should focus on improving the user experience
                    and simplifying navigation.
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Update color scheme and typography</li>
                    <li>Streamline the onboarding process</li>
                    <li>Add dark mode support</li>
                    <li>Implement new animation patterns</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">
                    2. AI-Powered Recommendations
                  </h2>
                  <p className="mb-3">
                    Use machine learning to provide personalized content
                    recommendations based on user behavior and preferences.
                  </p>

                  <div className="bg-secondary rounded-md p-4 mb-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Mic className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Voice Note</span>
                    </div>
                    <div className="w-full bg-background/50 rounded-md h-12 flex items-center justify-center">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                          <div
                            key={i}
                            className="w-0.5 h-3 rounded-full bg-primary animate-pulse"
                            style={{ animationDelay: `${i * 100}ms` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mt-6 mb-3">
                    3. Community Platform
                  </h2>
                  <p>
                    Create a dedicated space for our users to share ideas, ask
                    questions, and collaborate on projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="container mx-auto px-4 sm:px-6 py-16 md:py-24"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for modern note-taking, beautifully designed and
            thoughtfully crafted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="h-6 w-6 text-primary" />,
              title: "Rich Text & Markdown",
              description:
                "Write in plain text or format with markdown for beautiful, structured notes.",
            },
            {
              icon: <UploadCloud className="h-6 w-6 text-primary" />,
              title: "Multimedia Attachments",
              description:
                "Embed images, videos, audio, and files directly in your notes.",
            },
            {
              icon: <Mic className="h-6 w-6 text-primary" />,
              title: "Speech to Text",
              description:
                "Capture your thoughts by speaking and watch them transform into text instantly.",
            },
            {
              icon: <Users className="h-6 w-6 text-primary" />,
              title: "Real-time Collaboration",
              description:
                "Work together with teammates on shared notes with live editing.",
            },
            {
              icon: <History className="h-6 w-6 text-primary" />,
              title: "Version History",
              description:
                "Track changes over time and restore previous versions when needed.",
            },
            {
              icon: <Lock className="h-6 w-6 text-primary" />,
              title: "Privacy Controls",
              description:
                "Keep notes private or share them securely with specific people.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-6 border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="rounded-lg bg-background w-10 h-10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="container mx-auto px-4 sm:px-6 py-16 md:py-24 bg-gradient-to-b from-background to-background/80"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What People Are Saying
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who&#39;ve transformed their
            note-taking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "NoteNova has completely transformed how I organize my thoughts and ideas. The interface is beautiful and intuitive.",
              author: "Alex Chen",
              role: "Product Designer",
            },
            {
              quote:
                "As a researcher, version history and multimedia support has been game-changing. I can't imagine going back to my old notes app.",
              author: "Sarah Johnson",
              role: "Academic Researcher",
            },
            {
              quote:
                "The collaborative features make team meetings so much more productive. We can all contribute in real-time.",
              author: "Michael Rodriguez",
              role: "Team Lead",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-6 border border-border"
            >
              <div className="flex mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-primary"
                      fill="currentColor"
                    />
                  ))}
              </div>
              <p className="mb-4 text-foreground/90">
                &#34;{testimonial.quote}&#34;
              </p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your note-taking?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who&#39;ve elevated their creativity and
              productivity with NoteNova.
            </p>
            <Link href="/signup">
              <Button size="lg" className="group">
                Get started for free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background mt-auto">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen className="h-5 w-5 text-primary mr-2" />
              <span className="text-lg font-medium">NoteNova</span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} NoteNova. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
