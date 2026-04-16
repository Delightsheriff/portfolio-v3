"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink, Clock } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface VideoPitchProps {
  videoData?: {
    title: string;
    description: string;
    youtubeUrl: string;
    duration: string;
    topics: string[];
  };
}

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^#&?]*)/,
    /youtube\.com\/shorts\/([^#&?]*)/,
    /m\.youtube\.com\/watch\?v=([^#&?]*)/,
    /youtube\.com\/watch\?.*v=([^#&?]*)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m?.[1]?.length === 11) return m[1];
  }
  return null;
}

export function VideoPitch({ videoData }: VideoPitchProps) {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const videoId = videoData?.youtubeUrl ? getYouTubeId(videoData.youtubeUrl) : null;
  const isShorts = videoData?.youtubeUrl?.includes("/shorts/");

  return (
    <div className="relative" aria-label="Video introduction">
      {/* Video container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className={`relative ${
          isShorts ? "aspect-[9/16] max-w-[280px] mx-auto" : "aspect-video"
        } rounded-xl overflow-hidden bg-muted shadow-2xl ring-1 ring-border/30`}
      >
        {!playing ? (
          <button
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full flex items-end"
            aria-label="Play introduction video"
          >
            {/* Thumbnail */}
            {videoId && (
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                }}
              />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" aria-hidden="true" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl ring-1 ring-border/30 group-hover:ring-highlight/40 group-hover:bg-background transition-all"
              >
                <Play
                  className="w-7 h-7 text-foreground ml-1 group-hover:text-highlight transition-colors"
                  aria-hidden="true"
                />
              </motion.div>
            </div>

            {/* Duration badge */}
            <div className="absolute top-3 right-3" aria-hidden="true">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-mono text-muted-foreground ring-1 ring-border/30">
                <Clock className="w-3 h-3" />
                {videoData?.duration ?? "—"}
              </span>
            </div>
          </button>
        ) : (
          <>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-card z-10" aria-live="polite">
                <div
                  className="w-8 h-8 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin"
                  role="status"
                  aria-label="Loading video"
                />
              </div>
            )}
            {videoId && (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1${
                  isShorts ? `&loop=1&playlist=${videoId}` : ""
                }`}
                title={videoData?.title ?? "Personal introduction video"}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setLoaded(true)}
              />
            )}
          </>
        )}
      </motion.div>

      {/* Below-video meta */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-5 space-y-3"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-muted-foreground leading-snug max-w-sm">
            {videoData?.description ?? "A brief look into my approach to software engineering."}
          </p>
          {videoData?.youtubeUrl && (
            <a
              href={videoData.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch on YouTube"
              className="shrink-0 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
              YouTube
            </a>
          )}
        </div>

        {/* Topics */}
        {videoData?.topics && videoData.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Topics covered">
            {videoData.topics.map((topic, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-xs font-mono"
              >
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
