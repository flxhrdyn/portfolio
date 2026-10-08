"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { m, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, VIEWPORT } from "@/lib/motion";
import { alignPhotoCaptions } from "@/lib/alignPhotoCaptions";
import "./photo-break.css";

type Photo = {
  src: string;
  alt: string;
  name: string;
  index: string;
};

const TUNAS: Photo = {
  src: "/about/tunas.webp",
  alt: "Felix standing at the Tunas office reception",
  name: "Tunas",
  index: "01",
};

const ASTRA: Photo = {
  src: "/felix_avi.webp",
  alt: "Felix at Astra Visteon Indonesia beside a display of certificates",
  name: "Astra Visteon",
  index: "02",
};

const DGX: Photo = {
  src: "/felix_dgx.webp",
  alt: "Felix standing beside an NVIDIA DGX A100 system",
  name: "NVIDIA DGX A100",
  index: "03",
};

const HPC_DGX: Photo = { ...DGX, name: "HPC Universitas Gunadarma" };

type MotionStyle = "rise" | "focus" | "settle";

function PhotoFigure({
  photo,
  className,
  motionStyle = "rise",
  delay = 0,
  indexFirst = false,
  sizes = "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 550px",
}: {
  photo: Photo;
  className: string;
  motionStyle?: MotionStyle;
  delay?: number;
  indexFirst?: boolean;
  sizes?: string;
}) {
  const reduceMotion = useReducedMotion();
  const initial =
    motionStyle === "focus"
      ? { opacity: 0, filter: "blur(12px)", scale: 1.02 }
      : motionStyle === "settle"
        ? { opacity: 0, y: 18, scale: 0.985 }
        : { opacity: 0, y: 14 };

  return (
    <m.figure
      className={`photo-study__figure ${className}`}
      initial={reduceMotion ? false : initial}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: motionStyle === "focus" ? DUR.entrance : DUR.transition, delay, ease: EASE_OUT }}
    >
      <div className="photo-study__frame">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} />
      </div>
      <figcaption className={`photo-study__caption${indexFirst ? " photo-study__caption--index-first" : ""}`}>
        {indexFirst && <span className="photo-study__caption-index">{photo.index}</span>}
        <span>{photo.name}</span>
        {!indexFirst && <span className="photo-study__caption-index">{photo.index}</span>}
      </figcaption>
    </m.figure>
  );
}

function DirectionHeading({
  id,
  number,
  title,
  note,
  reference,
  href,
}: {
  id: string;
  number: string;
  title: string;
  note: string;
  reference: string;
  href: string;
}) {
  return (
    <header className="photo-study__direction-head">
      <span className="photo-study__direction-number">{number}</span>
      <div className="photo-study__direction-title">
        <h2 id={id}>{title}</h2>
        <p>{note}</p>
      </div>
      <a href={href} target="_blank" rel="noreferrer" className="photo-study__reference">
        {reference} <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export default function PhotoBreakLabPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    return alignPhotoCaptions(grid);
  }, []);

  return (
    <main className="photo-study">
      <div className="photo-study__topline">
        <Link href="/lab" className="photo-study__back">
          <span aria-hidden="true">←</span> Design lab
        </Link>
        <span>Portfolio / visual study</span>
      </div>

      <div className="photo-study__container">
        <header className="photo-study__intro">
          <p className="photo-study__eyebrow">EXPERIENCE &amp; EDUCATION&nbsp; /&nbsp; SKILLS</p>
          <h1>Photo interlude</h1>
          <p className="photo-study__intro-note">Three visual directions for the pause between sections.</p>
          <nav className="photo-study__index" aria-label="Photo interlude design directions">
            <a href="#contact-sheet"><span>01</span> Contact sheet</a>
            <a href="#architectural-grid"><span>02</span> Architectural grid</a>
            <a href="#layered-prints"><span>03</span> Layered prints</a>
          </nav>
        </header>

        <section className="photo-study__direction" aria-labelledby="contact-sheet">
          <DirectionHeading
            id="contact-sheet"
            number="01"
            title="Contact sheet"
            note="Three original frames, held in one archive"
            reference="Archive / Hans Sleutelaar"
            href="https://sleutelaar.xyz/"
          />
          <div className="photo-study__contact-sheet">
            <PhotoFigure photo={TUNAS} className="photo-study__contact-tunas" motionStyle="focus" delay={0} indexFirst />
            <PhotoFigure photo={ASTRA} className="photo-study__contact-astra" motionStyle="focus" delay={0.1} indexFirst />
            <PhotoFigure photo={HPC_DGX} className="photo-study__contact-dgx" motionStyle="focus" delay={0.2} indexFirst />
          </div>
        </section>

        <section className="photo-study__direction" aria-labelledby="architectural-grid">
          <DirectionHeading
            id="architectural-grid"
            number="02"
            title="Architectural grid"
            note="A modular composition shaped by negative space"
            reference="Obys"
            href="https://obys.agency/"
          />
          <div className="photo-study__grid-layout" ref={gridRef}>
            <PhotoFigure
              photo={TUNAS}
              className="photo-study__grid-tunas"
              motionStyle="focus"
              sizes="(max-width: 700px) 70vw, 34vw"
              indexFirst
            />
            <PhotoFigure
              photo={ASTRA}
              className="photo-study__grid-astra"
              motionStyle="focus"
              delay={0.1}
              sizes="(max-width: 700px) 46vw, 28vw"
              indexFirst
            />
            <PhotoFigure
              photo={HPC_DGX}
              className="photo-study__grid-dgx"
              motionStyle="focus"
              delay={0.2}
              sizes="(max-width: 700px) 46vw, 38vw"
              indexFirst
            />
          </div>
        </section>

        <section className="photo-study__direction" aria-labelledby="layered-prints">
          <DirectionHeading
            id="layered-prints"
            number="03"
            title="Layered prints"
            note="Overlap held by generous whitespace"
            reference="Avec Anni"
            href="https://avecanni.studio/"
          />
          <div className="photo-study__collage photo-study__collage--layers">
            <PhotoFigure photo={ASTRA} className="photo-study__layer-tunas" motionStyle="settle" delay={0} indexFirst />
            <PhotoFigure photo={TUNAS} className="photo-study__layer-astra" motionStyle="settle" delay={0.1} indexFirst />
            <PhotoFigure photo={HPC_DGX} className="photo-study__layer-dgx" motionStyle="settle" delay={0.2} indexFirst />
          </div>
        </section>

        <footer className="photo-study__footer">
          <span>Three studies · one placement</span>
          <Link href="/">Back to portfolio <span aria-hidden="true">↗</span></Link>
        </footer>
      </div>
    </main>
  );
}
