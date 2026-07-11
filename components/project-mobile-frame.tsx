import Image from "next/image";

export function ProjectMobileFrame({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="rounded-[2rem] bg-gradient-to-b from-muted/85 via-muted/65 to-transparent px-6 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-[320px] lg:max-w-[380px]">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] border border-border/40 bg-background shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 320px, 380px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
