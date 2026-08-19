import Image from "next/image";
import profile from "@/content/profile.json";

// Renders nothing until a photo path is set in content/profile.json, so the page
// stays correct while the photo is still missing.
export default function ProfilePhoto() {
  if (!profile.photo) return null;

  return (
    <figure className="profile-photo">
      <Image
        src={profile.photo}
        alt={profile.photoAlt}
        width={168}
        height={168}
        priority
        style={{ objectFit: "cover" }}
      />
      {profile.photoCaption && <figcaption>{profile.photoCaption}</figcaption>}
    </figure>
  );
}
