import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="mb-4 font-montserrat text-4xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for does not exist or was moved.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
        <Link href="/contact">
          <Button size="lg" variant="outline">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  );
}
