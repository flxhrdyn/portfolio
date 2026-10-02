import Image from "next/image";
import profile from "@/content/profile.json";

export default function ProfilePhoto() {
  if (!profile.photo) return null;

  return (
    <figure className="hero-portrait">
      <div className="hero-portrait-frame">
        <Image
          src={profile.photo}
          alt={profile.photoAlt}
          fill
          priority
          unoptimized
          sizes="(max-width: 860px) 60vw, 300px"
          className="hero-portrait-img"
        />
      </div>
      <figcaption className="hero-portrait-caption">
        <span>AI Engineer &amp; Data Scientist</span>
        <span>Indonesia (UTC+7)</span>
      </figcaption>
    </figure>
  );
}
