"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, FOCUS_REVEAL, VIEWPORT } from "@/lib/motion";

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
          <figure
            className={`d1-experience-photo-figure ${experience.className}`}
            key={experience.name}
          >
            <div className="d1-experience-photo-frame">
              <m.div
                data-motion-reveal="focus"
                initial={reduceMotion ? false : { ...FOCUS_REVEAL.hidden, scale: 1 }}
                whileInView={reduceMotion ? undefined : FOCUS_REVEAL.show}
                viewport={VIEWPORT}
                transition={{ ...FOCUS_REVEAL.transition, delay: index * 0.12 }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={experience.src}
                  alt={experience.alt}
                  fill
                  sizes={experience.sizes}
                />
              </m.div>
            </div>
            <m.figcaption
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.entrance, delay: index * 0.12 + 0.3, ease: EASE_OUT }}
            >
              <span>{experience.name}</span>
            </m.figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
