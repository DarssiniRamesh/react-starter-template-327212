import React, { useMemo } from "react";
import SlideFrame from "../components/SlideFrame";
import "../deck.css";

function Phase({ title, bullets }) {
  return (
    <div className="sectionBlock">
      <p className="sectionBlockTitle" style={{ color: "var(--deck-klefki-blue)" }}>
        {title}
      </p>
      <ul className="bullets">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function RoadmapGantt({ phases }) {
  const w = 560;
  const h = 308;
  const padL = 120;
  const padR = 18;
  const padT = 34;
  const rowH = 56;

  // 12 months
  const x0 = padL;
  const x1 = w - padR;
  const span = x1 - x0;

  const xForMonth = (m) => x0 + ((m - 1) / 12) * span;
  const wForRange = (startM, endM) => Math.max(8, xForMonth(endM + 1) - xForMonth(startM));

  return (
    <div className="chartCard" role="group" aria-label="Implementation roadmap Gantt chart">
      <div className="chartCardTitle" style={{ marginBottom: 10 }}>
        12-Month Roadmap (Gantt View)
      </div>

      <svg width="100%" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Roadmap chart">
        {/* Month ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const m = i + 1;
          const x = xForMonth(m);
          return (
            <g key={m}>
              <line x1={x} y1={padT} x2={x} y2={h - 12} stroke="rgba(45,55,72,0.08)" />
              {m % 2 === 1 ? (
                <text x={x + 2} y={22} fontSize="11" fontWeight="800" fill="rgba(45,55,72,0.70)">
                  M{m}
                </text>
              ) : null}
            </g>
          );
        })}
        <line x1={x0} y1={padT} x2={x1} y2={padT} stroke="rgba(45,55,72,0.14)" />

        {phases.map((p, idx) => {
          const y = padT + 16 + idx * rowH;
          const barX = xForMonth(p.start);
          const barW = wForRange(p.start, p.end);
          return (
            <g key={p.title}>
              <text x={18} y={y + 18} fontSize="12" fontWeight="900" fill="#1a2745">
                {p.label}
              </text>
              <text x={18} y={y + 36} fontSize="11" fontWeight="800" fill="rgba(45,55,72,0.65)">
                {p.title}
              </text>
              <rect
                x={barX}
                y={y}
                width={barW}
                height="20"
                rx="10"
                fill={p.color}
                stroke="rgba(255,255,255,0.85)"
              />
              <text x={barX + 10} y={y + 14} fontSize="10" fontWeight="900" fill="rgba(255,255,255,0.92)">
                {p.range}
              </text>
            </g>
          );
        })}

        <rect x={xForMonth(3)} y={h - 36} width={xForMonth(4) - xForMonth(3)} height="16" rx="8" fill="rgba(0,102,204,0.10)" />
        <text x={xForMonth(3) + 6} y={h - 24} fontSize="10" fontWeight="900" fill="rgba(0,102,204,0.95)">
          Pilot milestone
        </text>
      </svg>

      <div style={{ marginTop: 10, color: "var(--deck-text-muted)", fontWeight: 800, fontSize: 12, lineHeight: 1.35 }}>
        Designed for fast early wins (first 90 days) while building a sustainable issuer/verifier ecosystem.
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide16Roadmap({ slideNumber, slideMeta }) {
  /** Slide 16: Implementation Roadmap for SVG. */
  const ganttPhases = useMemo(
    () => [
      {
        label: "1–3",
        title: "Foundation",
        start: 1,
        end: 3,
        range: "M1–M3",
        color: "rgba(0,102,204,0.82)"
      },
      {
        label: "4–6",
        title: "Wallet Launch",
        start: 4,
        end: 6,
        range: "M4–M6",
        color: "rgba(6,182,212,0.82)"
      },
      {
        label: "7–9",
        title: "Ecosystem Expansion",
        start: 7,
        end: 9,
        range: "M7–M9",
        color: "rgba(16,185,129,0.82)"
      },
      {
        label: "10–12",
        title: "Scale & Optimization",
        start: 10,
        end: 12,
        range: "M10–M12",
        color: "rgba(26,39,69,0.72)"
      }
    ],
    []
  );

  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Implementation">
      <div className="twoCol" style={{ textAlign: "left" }}>
        <div className="slideTightStack">
          <h2 className="slideTitle" style={{ fontSize: 34 }}>
            Implementation Roadmap for SVG
          </h2>
          <p className="slideSubTitle">Realistic timeline — 12-month deployment</p>

          <Phase
            title="Months 1–3: Foundation Phase"
            bullets={[
              "Platform setup on Azure",
              "Integration with SVG MOSIP infrastructure",
              "Issuance portal configured for ministries",
              "Training for teams and staff",
              "Pilot: Digital Birth Certificate + Electronic Police Clearance"
            ]}
          />
          <Phase
            title="Months 4–6: Wallet Launch & Early Adopters"
            bullets={[
              "Wallet app launch + citizen onboarding (carrier partnerships)",
              "Issuance begins: birth, police, education",
              "Early verifiers: 2–3 banks, 1–2 hospitals, key employers",
              "Measurement and iteration"
            ]}
          />
        </div>

        <div className="slideTightStack">
          <RoadmapGantt phases={ganttPhases} />

          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">Success Metrics</p>
            <ul className="bullets">
              <li>30% wallet adoption in 12 months</li>
              <li>10+ government services</li>
              <li>5+ private sector verifiers</li>
              <li>80%+ reduction in physical processing time</li>
              <li>50%+ cost savings in issuance & verification</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
