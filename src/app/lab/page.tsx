"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./lab.css";
import { V4Computation, V5Inline, V6Synthesis, V7Synthesis } from "./versions";

const VERSIONS = [
  { key: "V0", name: "Current site", ref: "flxhrdyn.vercel.app" },
  { key: "V4", name: "Computation", ref: "2xa.studio" },
  { key: "V5", name: "Inline Name", ref: "matthieugivelet.com" },
  { key: "V6", name: "Synthesis", ref: "all five, cherry-picked" },
  { key: "V7", name: "Synthesis II", ref: "V4 + V5 + V6" },
];

const VIEWS = [null, V4Computation, V5Inline, V6Synthesis, V7Synthesis];

export default function LabPage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const fromHash = VERSIONS.findIndex((v) => `#${v.key.toLowerCase()}` === window.location.hash);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fromHash >= 0) setActive(fromHash);
    const onKey = (event: KeyboardEvent) => {
      const index = VERSIONS.findIndex((v) => v.key === `V${event.key}`);
      if (index >= 0) setActive(index);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active]);

  const View = VIEWS[active];

  return (
    <div className="lab">
      <nav className="lab-bar" aria-label="Design directions">
        <span className="lab-brand">flxhrdyn <em>5 directions</em></span>
        {VERSIONS.map((v, i) => (
          <button key={v.key} type="button" className="lab-tab" aria-pressed={active === i} onClick={() => setActive(i)}>
            <b>{v.key}</b>
            <span>{v.name}</span>
          </button>
        ))}
        <Link className="lab-tab lab-photo-tab" href="/lab/photo-break" aria-label="Open photo interlude design studies">
          <b>PHOTO</b>
          <span>Interlude study</span>
        </Link>
        <span className="lab-ref">ref: {VERSIONS[active].ref}</span>
        <span className="lab-keys">keys 0, 4-7</span>
      </nav>
      <div className="lab-stage">
        {View ? <View /> : <iframe className="lab-frame" src="/" title="Current site" />}
      </div>
    </div>
  );
}
