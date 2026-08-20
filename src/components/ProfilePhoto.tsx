import Image from "next/image";
import profile from "@/content/profile.json";

// Renders nothing until a photo path is set in content/profile.json, so the page
// stays correct while the photo is still missing.
export default function ProfilePhoto() {
  if (!profile.photo) return null;

  return (
    <figure className="profile-photo">
      <div className="profile-photo-frame">
        <Image
          src={profile.photo}
          alt={profile.photoAlt}
          fill
          priority
          unoptimized
          quality={100}
          sizes="(max-width: 860px) 100vw, 1200px"
          style={{ objectFit: "cover" }}
        />
      </div>
      {profile.photoCaption && <figcaption>{profile.photoCaption}</figcaption>}
    </figure>
  );
}
