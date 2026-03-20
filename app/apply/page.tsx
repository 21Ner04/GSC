import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

export const metadata = { title: "Apply Now | Green Street Capital" };

export default function Apply() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-muted py-24">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center border border-gray-100 mx-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-primary" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-4">Apply Now</h1>
        <p className="text-muted-foreground mb-8">
          You are being redirected to our secure borrower portal to complete your application and upload documents safely.
        </p>
        <div className="space-y-4">
          <a href="https://www.greenstreetcapitalgroup.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full">
              Continue to Application <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <Link href="/">
            <Button variant="ghost" className="w-full text-muted-foreground">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
