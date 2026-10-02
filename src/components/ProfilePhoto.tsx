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
    </span>
  );
}
