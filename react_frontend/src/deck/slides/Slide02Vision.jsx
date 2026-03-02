import React, { useMemo } from "react";
import SlideFrame from "../components/SlideFrame";
import DonutChart from "../components/DonutChart";
import { getInvestmentNumbers, getSvgDataPointValue } from "../data/svgDataPoints";
import "../deck.css";

function StatCard({ value, label }) {
  return (
    <div className="statCard">
      <div className="statValue">{value}</div>
      <div className="statLabel">{label}</div>
    </div>
  );
}

function MiniSvgMap() {
  // Decorative mini “islands” cluster (SVG has 32 islands). Not geographically accurate; used as a visual cue.
  return (
    <div className="sectionBlock" style={{ background: "linear-gradient(180deg, rgba(6,182,212,0.10), white)" }}>
      <p className="sectionBlockTitle" style={{ marginBottom: 10 }}>
        Geographic Reality (32 Islands)
      </p>
      <svg width="100%" height="110" viewBox="0 0 520 110" role="img" aria-label="Stylized island cluster map">
        <defs>
          <linearGradient id="isleGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(0,102,204,0.30)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.24)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="520" height="110" rx="14" fill="rgba(26,39,69,0.03)" />
        {/* “Main island” */}
        <path
          d="M110 58c16-22 38-30 64-22 18 6 32 18 34 31 2 12-8 26-26 34-26 12-58 6-72-10-10-12-10-22 0-33Z"
          fill="url(#isleGrad)"
          stroke="rgba(0,102,204,0.28)"
        />
        {/* Smaller islands */}
        {[
          [205, 34, 10],
          [230, 56, 8],
          [255, 36, 7],
          [280, 62, 9],
          [305, 40, 6],
          [330, 58, 8],
          [355, 44, 6],
          [380, 66, 10],
          [420, 50, 7],
          [448, 70, 6]
        ].map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="rgba(0,102,204,0.18)" stroke="rgba(6,182,212,0.22)" />
        ))}

        <text x="24" y="30" fontSize="12" fontWeight="800" fill="rgba(45,55,72,0.78)">
          Dispersed population + connectivity gaps
        </text>
        <text x="24" y="50" fontSize="12" fontWeight="700" fill="rgba(45,55,72,0.62)">
          Offline-friendly credentials are critical.
        </text>
      </svg>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide02Vision({ slideNumber, slideMeta }) {
  /** Slide 2: SVG’s Digital Transformation Vision. */
  const inv = getInvestmentNumbers();

  const investmentSegments = useMemo(
    () => [
      { label: "Going Paperless", value: inv.digitalTransformMillions, color: "rgba(0,102,204,0.82)" },
      { label: "CARDTP (WB)", value: inv.cardtpMillions, color: "rgba(6,182,212,0.82)" }
    ],
    [inv.cardtpMillions, inv.digitalTransformMillions]
  );

  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Opening">
      <div className="twoCol">
        <div style={{ textAlign: "left" }} className="slideTightStack">
          <h2 className="slideTitle" style={{ fontSize: 34 }}>
            SVG’s Digital Transformation Vision
          </h2>

          <div className="sectionBlock">
            <p className="sectionBlockTitle">Your Challenge</p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45 }}>
              How do you deliver world-class digital services with limited resources across dispersed island populations?
            </p>
          </div>

          <div className="sectionBlock">
            <p className="sectionBlockTitle">Our Answer</p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45, fontWeight: 800, color: "var(--deck-klefki-blue)" }}>
              Leverage open-source, interoperable platforms that work from day one—without reinventing the wheel.
            </p>
          </div>

          <div className="timeline" aria-label="Investment timeline highlights">
            <div className="timelineRow">
              <div className="timelineDate">$81M</div>
              <div>
                <div className="timelineItemTitle">Going Paperless Initiative</div>
                <div className="timelineItemNote">Existing digital commitment</div>
              </div>
            </div>
            <div className="timelineRow">
              <div className="timelineDate">$30M</div>
              <div>
                <div className="timelineItemTitle">CARDTP World Bank Funding</div>
                <div className="timelineItemNote">June 2020 – June 2026</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "left" }} className="slideTightStack">
          <div className="cardGrid2x2">
            <StatCard value={`$${inv.totalMillions}M`} label="Total Investment" />
            <StatCard value={getSvgDataPointValue("Population") ?? "~100,000"} label="Citizens" />
            <StatCard value={getSvgDataPointValue("Digital Projects Active") ?? "49"} label="Active Digital Projects" />
            <StatCard value={getSvgDataPointValue("Project Timeline") ?? "June 2020 - June 2026"} label="Project Timeline" />
          </div>

          <DonutChart
            title="Investment Split ($111M)"
            ariaLabel="Donut chart showing investment split between going paperless and CARDTP funding"
            segments={investmentSegments}
            centerLabel={`$${inv.totalMillions}M`}
            centerSubLabel="Total"
          />

          <MiniSvgMap />
        </div>
      </div>
    </SlideFrame>
  );
}
