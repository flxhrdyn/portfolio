"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "../Reveal";

const experiences = [
  {
    name: "PT Tunas Ridean Tbk (Tunas Group)",
    src: "/about/tunas.webp",
    alt: "Felix standing at the Tunas office reception",
    className: "d1-experience-photo-tunas",
    sizes: "(max-width: 760px) 80vw, 30vw",
  },
  {
    name: "PT Astra Visteon Indonesia",
    src: "/felix_avi.webp",
    alt: "Felix at Astra Visteon Indonesia beside a display of certificates",
    className: "d1-experience-photo-astra",
    sizes: "(max-width: 760px) 48vw, 24vw",
  },
  {
    name: "HPC Universitas Gunadarma",
    src: "/felix_dgx.webp",
    alt: "Felix standing beside an NVIDIA DGX A100 system",
    className: "d1-experience-photo-hpc",
    sizes: "(max-width: 760px) 48vw, 40vw",
  },
];

export function ExperiencePhotoInterlude() {
  return (
    <section
      className="d1-experience-photo-break"
      aria-label="Experience and education photo break"
    >
      <div className="d1-experience-photo-grid">
        <Reveal className="d1-experience-photo-note">
          <p className="d1-experience-photo-note-title" data-r="rise">A few places where my work took shape.</p>
          <p className="d1-experience-photo-note-detail" data-r="rise" style={{ "--i": 1 } as CSSProperties}>From office floors to computing labs.</p>
        </Reveal>
        {experiences.map((experience, index) => (
          <Reveal
            as="figure"
            className={`d1-experience-photo-figure ${experience.className}`}
            key={experience.name}
            style={{ "--i": index * 1.3 } as CSSProperties}
          >
            <div className="d1-experience-photo-frame">
              <div data-motion-reveal="focus" data-r="focus" style={{ position: "absolute", inset: 0 }}>
                <Image
                  src={experience.src}
                  alt={experience.alt}
                  fill
                  sizes={experience.sizes}
                />
              </div>
            </div>
            <figcaption data-r="fade" style={{ "--d": ".3s" } as CSSProperties}>
              <span>{experience.name}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
