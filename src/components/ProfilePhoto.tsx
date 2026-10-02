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
          sizes="(max-width: 860px) 100vw, 400px"
          className="hero-portrait-img"
        />

        {/* Position tracks the subject in the photo; re-tune if the image or crop changes. */}
        <div className="hero-detect-box" aria-hidden="true">
          <span className="reticle-corner reticle-tl" />
          <span className="reticle-corner reticle-tr" />
          <span className="reticle-corner reticle-bl" />
          <span className="reticle-corner reticle-br" />
          <span className="hero-detect-tag">AI ENGINEER // 0.98</span>
        </div>
      </div>
      <figcaption className="hero-portrait-caption">AI Engineer &amp; Data Scientist</figcaption>
    </figure>
  );
}
