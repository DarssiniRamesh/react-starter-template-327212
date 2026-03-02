import React from "react";
import SlideFrame from "../components/SlideFrame";
import { getPriorityCounts, getUseCases } from "../data/useCases";
import "../deck.css";

function PhaseColumn({ title, items }) {
  return (
    <div className="sectionBlock">
      <p className="sectionBlockTitle" style={{ color: "var(--deck-klefki-blue)" }}>
        {title}
      </p>
      <ul className="bullets">
        {items.map((u) => (
          <li key={u.useCase}>
            <strong>{u.useCase}</strong>
            <div style={{ color: "var(--deck-text-muted)", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{u.priority}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide10UseCases({ slideNumber, slideMeta }) {
  /** Slide 10: SVG Priority Use Cases - What to Build First. */
  const all = getUseCases();
  const counts = getPriorityCounts();

  const phase1 = all.filter((u) => u.phase.startsWith("Phase 1"));
  const phase2 = all.filter((u) => u.phase.startsWith("Phase 2"));
  const phase3 = all.filter((u) => u.phase.startsWith("Phase 3"));
  const strategic = all.filter((u) => u.phase === "Strategic");

  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Differentiation">
      <div style={{ height: "100%", textAlign: "left" }}>
        <h2 className="slideTitle" style={{ fontSize: 34 }}>
          SVG Priority Use Cases — What to Build First
        </h2>
        <p className="slideSubTitle">Recommended phased approach</p>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          <PhaseColumn title="Phase 1 (Months 1–4)" items={phase1} />
          <PhaseColumn title="Phase 2 (Months 5–9)" items={phase2} />
          <PhaseColumn title="Phase 3 (Months 10–15)" items={phase3} />
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 14, alignItems: "stretch" }}>
          <div className="sectionBlock" style={{ background: "linear-gradient(180deg, rgba(245,158,11,0.12), white)" }}>
            <p className="sectionBlockTitle" style={{ color: "#92400E" }}>
              Strategic
            </p>
            <p style={{ margin: 0, fontWeight: 800 }}>{strategic.map((u) => u.useCase).join(", ")}</p>
            <p style={{ margin: "8px 0 0", color: "var(--deck-text-muted)", fontWeight: 700 }}>
              Focus after ecosystem foundations are in place.
            </p>
          </div>

          <div className="sectionBlock">
            <p className="sectionBlockTitle">Priority Distribution</p>
            <ul className="bullets">
              <li>CRITICAL: {counts.CRITICAL}</li>
              <li>HIGH: {counts.HIGH}</li>
              <li>MEDIUM: {counts.MEDIUM}</li>
              <li>LOW: {counts.LOW}</li>
              <li>STRATEGIC: {counts.STRATEGIC}</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
