import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Users } from "lucide-react";

export const metadata = { title: "Apply Now | Green Street Capital" };

const APPLY_PORTAL = "https://www.greenstreetcapitalgroup.com";

export default function Apply() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-muted py-24">
      <div className="mx-4 w-full max-w-md rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mb-4 font-montserrat text-3xl font-bold">Apply</h1>
        <p className="mb-8 text-muted-foreground">
          Start by choosing a loan officer, or continue to the company application
          portal if you are already working with our team.
        </p>
        <div className="space-y-4">
          <Link href="/team">
            <Button size="lg" className="w-full gap-2">
              <Users className="h-5 w-5" />
              Select Loan Officer
            </Button>
          </Link>
          <a
            href={APPLY_PORTAL}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button size="lg" variant="outline" className="w-full">
              Continue to application{" "}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <Link href="/">
            <Button variant="ghost" className="w-full text-muted-foreground">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
