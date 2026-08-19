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
          sizes="(max-width: 860px) 80vw, 520px"
          style={{ objectFit: "cover" }}
        />
      </div>
      {profile.photoCaption && <figcaption>{profile.photoCaption}</figcaption>}
    </figure>
  );
}
