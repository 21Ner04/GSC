import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center flex-col p-4 text-center">
      <h1 className="font-montserrat text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-foreground mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link href="/"><Button size="lg">Return to Homepage</Button></Link>
    </div>
  );
}
