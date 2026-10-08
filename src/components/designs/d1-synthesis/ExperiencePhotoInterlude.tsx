"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { m, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, VIEWPORT } from "@/lib/motion";
import { alignPhotoCaptions } from "@/lib/alignPhotoCaptions";

const experiences = [
  {
    index: "01",
    name: "Tunas",
    src: "/about/tunas.webp",
    alt: "Felix standing at the Tunas office reception",
    className: "d1-experience-photo-tunas",
    sizes: "(max-width: 760px) 80vw, 30vw",
  },
  {
    index: "02",
    name: "Astra Visteon",
    src: "/felix_avi.webp",
    alt: "Felix at Astra Visteon Indonesia beside a display of certificates",
    className: "d1-experience-photo-astra",
    sizes: "(max-width: 760px) 48vw, 24vw",
  },
  {
    index: "03",
    name: "HPC Universitas Gunadarma",
    src: "/felix_dgx.webp",
    alt: "Felix standing beside an NVIDIA DGX A100 system",
    className: "d1-experience-photo-hpc",
    sizes: "(max-width: 760px) 48vw, 40vw",
  },
];

export function ExperiencePhotoInterlude() {
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    return alignPhotoCaptions(grid);
  }, []);

  return (
    <section
      className="d1-experience-photo-break"
      aria-label="Experience and education photo break"
    >
      <div className="d1-experience-photo-grid" ref={gridRef}>
        {experiences.map((experience, index) => (
          <m.figure
            className={`d1-experience-photo-figure ${experience.className}`}
            key={experience.index}
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(12px)", scale: 1.02 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)", scale: 1 }}
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
              <span className="d1-experience-photo-index">{experience.index}</span>
              {" "}
              <span>{experience.name}</span>
            </figcaption>
          </m.figure>
        ))}
      </div>
    </section>
  );
}
