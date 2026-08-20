"use client";

import Reveal from "./Reveal";

interface MetricItem {
  value: string;
  label: string;
  sublabel: string;
}

const METRICS: MetricItem[] = [
  {
    value: "2+ Yrs",
    label: "AI/ML Experience",
    sublabel: "Industry & research lab track record",
  },
  {
    value: "10+",
    label: "AI Projects Built",
    sublabel: "GenAI, RAG, Vision & Predictive ML",
  },
  {
    value: "BNSP",
    label: "Certified Data Scientist",
    sublabel: "National professional certification",
  },
];

export default function TelemetryStrip() {
  return (
    <section className="telemetry-section" aria-label="Engineering telemetry and verified metrics">
      <div className="container">
        <Reveal>
          <div className="telemetry-grid">
            {METRICS.map((metric, index) => (
              <div key={metric.label} className="telemetry-cell">
                <div className="telemetry-index">
                  <span>HIGHLIGHT 0{index + 1}</span>
                  <span className="telemetry-status-dot" aria-hidden="true" />
                </div>
                <div className="telemetry-value">{metric.value}</div>
                <div className="telemetry-label">{metric.label}</div>
                <div className="telemetry-sublabel">{metric.sublabel}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
