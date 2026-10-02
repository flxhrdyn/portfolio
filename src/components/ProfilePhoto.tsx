import Image from "next/image";
import profile from "@/content/profile.json";

export default function ProfilePhoto() {
  if (!profile.photo) return null;

  return (
    <span className="hero-portrait">
      <Image
        src={profile.photo}
        alt={profile.photoAlt}
        fill
        priority
        unoptimized
        sizes="240px"
        className="hero-portrait-img"
      />
      <span className="reticle-corner reticle-tl" aria-hidden="true" />
      <span className="reticle-corner reticle-tr" aria-hidden="true" />
      <span className="reticle-corner reticle-bl" aria-hidden="true" />
      <span className="reticle-corner reticle-br" aria-hidden="true" />
    </span>
  );
}
