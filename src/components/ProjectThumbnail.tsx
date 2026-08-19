import Image from "next/image";

interface ProjectThumbnailProps {
  src: string;
  alt: string;
  /** Featured card renders the thumbnail larger, so it gets a wider sizes hint. */
  variant?: "card" | "featured";
  priority?: boolean;
}

// Renders nothing when the project has no screenshot yet, so a project can ship
// text-only and gain its image later without touching the card layout.
export default function ProjectThumbnail({ src, alt, variant = "card", priority = false }: ProjectThumbnailProps) {
  if (!src) return null;

  return (
    <div className={`project-thumb project-thumb-${variant}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={variant === "featured" ? "(max-width: 860px) 100vw, 560px" : "(max-width: 860px) 100vw, 380px"}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
