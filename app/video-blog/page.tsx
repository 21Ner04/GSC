"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ALL_VIDEOS = [
  {
    title: "3-2-1 SPECIAL MORTGAGE PROGRAM 2023",
    desc: "How the 3-2-1 buydown can structure your early-year mortgage payments.",
    videoId: "QMJeFhBU2Ic",
  },
  {
    title: "Meet Ruslan Kushnir: Your Trusted Guide in the World of Mortgages",
    desc: "Get to know our team and how we guide borrowers from application to closing.",
    videoId: "U1R4kBZepqY",
  },
  {
    title: "Don't buy a house until you watch this video!",
    desc: "Important perspective before you make one of the largest purchases of your life.",
    videoId: "CaGjyUlpQ8w",
  },
];

const YOUTUBE_CHANNEL_VIDEOS = "https://www.youtube.com/@GSC.MORTGAGE/videos";

export default function VideoBlogPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Video Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert guidance, market updates, and valuable resources for your home buying journey
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {ALL_VIDEOS.map((video, i) => (
              <motion.div
                key={video.videoId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative aspect-video overflow-hidden bg-black rounded-2xl shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {video.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href={YOUTUBE_CHANNEL_VIDEOS}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                View All Videos on YouTube <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-6">
            Ready to Start Your Mortgage Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our team is here to guide you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              Apply Now
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
