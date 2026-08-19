import Image from "next/image";

// Logos vary from square crests to 4:1 wordmarks, so they share a height and keep
// their own width. Renders nothing for entries with no logo file.
export default function CompanyLogo({ src, company }: { src: string; company: string }) {
  if (!src) return null;

  return (
    <span className="company-logo">
      <Image src={src} alt={`${company} logo`} width={120} height={28} style={{ height: "1.4rem", width: "auto" }} />
    </span>
  );
}
