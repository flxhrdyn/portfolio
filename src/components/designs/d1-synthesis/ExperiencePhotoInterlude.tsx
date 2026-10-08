"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, VIEWPORT } from "@/lib/motion";

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
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="d1-experience-photo-break"
      aria-label="Experience and education photo break"
    >
      <div className="d1-experience-photo-grid">
        <div className="d1-experience-photo-note">
          <p className="d1-experience-photo-note-title">A few places where my work took shape.</p>
          <p className="d1-experience-photo-note-detail">From office floors to computing labs.</p>
        </div>
        {experiences.map((experience, index) => (
          <m.figure
            className={`d1-experience-photo-figure ${experience.className}`}
            key={experience.name}
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(12px)" }}
            whileInView={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)" }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.entrance, delay: index * 0.1, ease: EASE_OUT }}
          >
            <div className="d1-experience-photo-frame">
              <Image
                src={experience.src}
                alt={experience.alt}
                fill
                sizes={experience.sizes}
              />
            </div>
            <figcaption>
              <span>{experience.name}</span>
            </figcaption>
          </m.figure>
        ))}
      </div>
    </section>
  );
}
