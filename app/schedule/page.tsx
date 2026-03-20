import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

export const metadata = { title: "Schedule Time | Green Street Capital" };

export default function Schedule() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-muted py-24">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center border border-gray-100 mx-4">
        <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-4">Schedule a Call</h1>
        <p className="text-muted-foreground mb-8">
          Select a convenient time for a brief consultation with one of our mortgage advisors.
        </p>
        <div className="bg-muted p-6 rounded-2xl text-left mb-8 space-y-4">
          <div className="flex items-center text-sm font-medium text-foreground">
            <Clock className="w-5 h-5 text-secondary mr-3" /> 15 Min Intro Call
          </div>
          <div className="flex items-center text-sm font-medium text-foreground">
            <Video className="w-5 h-5 text-secondary mr-3" /> Phone or Video Meeting
          </div>
        </div>
        <div className="space-y-4">
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="w-full">Open Scheduling Calendar</Button>
          </a>
          <Link href="/"><Button variant="ghost" className="w-full text-muted-foreground">Cancel</Button></Link>
        </div>
      </div>
    </div>
  );
}
