"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink, Volume2 } from "lucide-react";
import Image from "next/image";

interface VideoPitchProps {
  videoData?: {
    title: string;
    description: string;
    youtubeUrl: string;
    duration: string;
    topics: string[];
  };
}

export function VideoPitch({ videoData }: VideoPitchProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = videoData?.youtubeUrl
    ? getYouTubeId(videoData.youtubeUrl)
    : null;

  const handlePlayVideo = () => {
    setIsLoading(true);
    setShowVideo(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative group">
      {/* Video Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative aspect-[16/10] bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
      >
        {!showVideo ? (
          <>
            {/* Video Thumbnail */}
            <div
              className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center cursor-pointer group/thumb"
              onClick={handlePlayVideo}
            >
              {/* Custom Thumbnail Design */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF471A]/20 to-transparent" />

              {/* YouTube Thumbnail (if available) */}
              {videoId && (
                <Image
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to medium quality thumbnail
                    e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                  }}
                />
              )}

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover/thumb:bg-black/40 transition-colors">
                <motion.button
                  onClick={handlePlayVideo}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-colors group"
                >
                  <Play className="w-8 h-8 text-gray-900 ml-1 group-hover:text-[#FF471A] transition-colors" />
                </motion.button>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
                  <h3 className="font-medium mb-1">
                    {videoData?.title || "Personal Introduction"}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {videoData?.description ||
                      "A brief look into my approach to software engineering"}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Volume2 className="w-3 h-3" />
                    <span>{videoData?.duration || "2:15"}</span>
                    <span>•</span>
                    <span>HD Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <p className="text-white text-sm">Loading video...</p>
                </div>
              </div>
            )}

            {/* YouTube Embed */}
            {videoId && (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={videoData?.title || "Personal Introduction"}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
              />
            )}
          </>
        )}
      </motion.div>

      {/* Video Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium text-gray-900">
              {videoData?.title || "Personal Introduction"}
            </h3>
            <p className="text-sm text-gray-600">
              {videoData?.description ||
                "A brief look into my approach to software engineering"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {videoData?.duration || "2:15"}
            </div>
            {videoData?.youtubeUrl && (
              <a
                href={videoData.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                YouTube
              </a>
            )}
          </div>
        </div>

        {/* Video Topics */}
        <div className="flex flex-wrap gap-2">
          {(
            videoData?.topics || [
              "My Philosophy",
              "Technical Approach",
              "Team Collaboration",
              "Problem Solving",
            ]
          ).map((topic, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-mono"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Call to Action */}
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            This video showcases my communication style and technical approach.
            {!showVideo && " Click play to get to know me better."}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
