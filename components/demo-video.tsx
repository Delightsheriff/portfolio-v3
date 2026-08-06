const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
];
const VIMEO_PATTERN = /vimeo\.com\/(\d+)/;
const DIRECT_VIDEO_PATTERN = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;

type VideoKind =
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string }
  | { type: "file"; url: string }
  | null;

export function detectVideoKind(url: string): VideoKind {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match) return { type: "youtube", id: match[1] };
  }
  const vimeoMatch = url.match(VIMEO_PATTERN);
  if (vimeoMatch) return { type: "vimeo", id: vimeoMatch[1] };
  if (DIRECT_VIDEO_PATTERN.test(url)) return { type: "file", url };
  return null;
}

export function DemoVideo({ url, title }: { url: string; title: string }) {
  const kind = detectVideoKind(url);
  if (!kind) return null;

  if (kind.type === "youtube") {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${kind.id}`}
          title={`${title} demo video`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (kind.type === "vimeo") {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
        <iframe
          src={`https://player.vimeo.com/video/${kind.id}`}
          title={`${title} demo video`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
      <video
        src={kind.url}
        controls
        playsInline
        className="absolute inset-0 h-full w-full object-contain"
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
