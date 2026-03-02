import React, { useMemo } from "react";
import SlideFrame from "../components/SlideFrame";
import DonutChart from "../components/DonutChart";
import "../deck.css";

function FundingBars() {
  const max = 500; // visual scale in $K (so 500K ~ full width)
  const rows = [
    { key: "CARDTP", value: 450, label: "CARDTP", note: "$400K–$500K", color: "rgba(0,102,204,0.82)" },
    { key: "Partners", value: 180, label: "Dev Partners", note: "TBD", color: "rgba(6,182,212,0.70)" },
    { key: "PPP", value: 120, label: "PPP", note: "TBD", color: "rgba(16,185,129,0.70)" },
    { key: "Regional", value: 80, label: "Regional", note: "TBD", color: "rgba(26,39,69,0.55)" }
  ];

  return (
    <div className="sectionBlock">
      <p className="sectionBlockTitle">Funding Sources (Illustrative)</p>
      <div className="barChart" aria-label="Funding sources bar chart">
        {rows.map((r) => {
          const pct = Math.round((r.value / max) * 100);
          return (
            <div className="barRow" key={r.key}>
              <div className="barLabel">{r.label}</div>
              <div className="barTrack" aria-hidden="true">
                <div className="barFill" style={{ width: `${pct}%`, background: r.color }} />
              </div>
              <div className="barValue">{r.note}</div>
            </div>
          );
        })}
      </div>
      <p style={{ margin: "10px 0 0", color: "var(--deck-text-muted)", fontWeight: 800, fontSize: 12, lineHeight: 1.35 }}>
        The intent is to anchor most of Year-1 funding inside CARDTP, then scale via partners/PPP once early wins are proven.
      </p>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Slide18Investment({ slideNumber, slideMeta }) {
  /** Slide 18: Investment & Funding Options. */
  const breakdown = useMemo(
    () => [
      // Percentages sourced from the visual guide; normalized in the chart renderer.
      { label: "Platform & Infra", value: 35, color: "rgba(0,102,204,0.82)" },
      { label: "Integration", value: 25, color: "rgba(6,182,212,0.82)" },
      { label: "Training", value: 15, color: "rgba(16,185,129,0.82)" },
      { label: "Adoption", value: 15, color: "rgba(245,158,11,0.80)" },
      { label: "Contingency", value: 20, color: "rgba(26,39,69,0.65)" }
    ],
    []
  );

  return (
    <SlideFrame slideNumber={slideNumber} slideTitle={slideMeta.title} sectionLabel="Investment">
      <div className="twoCol" style={{ textAlign: "left" }}>
        <div className="slideTightStack">
          <h2 className="slideTitle" style={{ fontSize: 34 }}>
            Investment & Funding Options
          </h2>
          <p className="slideSubTitle">Making this affordable</p>

          <div className="sectionBlock">
            <p className="sectionBlockTitle">Total Investment Estimate (12-Month Implementation)</p>
            <ul className="bullets">
              <li>Platform & Infrastructure: $150K – $200K</li>
              <li>Integration & Customization: $100K – $150K</li>
              <li>Training & Capacity Building: $50K – $75K</li>
              <li>Marketing & Adoption: $50K – $75K</li>
              <li>Contingency & Support (20%): $70K – $100K</li>
            </ul>

            <p style={{ margin: "12px 0 0", fontWeight: 900, color: "var(--deck-navy)", fontSize: 20 }}>
              Total Range: $420K – $600K USD
            </p>
            <p style={{ margin: "6px 0 0", color: "var(--deck-text-muted)", fontWeight: 800 }}>
              Structured to deliver visible citizen value in the first 90 days.
            </p>
          </div>

          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">Return on Investment</p>
            <ul className="bullets">
              <li>Year 1 efficiency savings: $200K – $300K</li>
              <li>Reduced fraud + faster service delivery</li>
              <li>Improved inclusion and citizen satisfaction</li>
              <li>Regional leadership positioning</li>
            </ul>
          </div>
        </div>

        <div className="slideTightStack" style={{ alignContent: "start" }}>
          <DonutChart
            title="Investment Breakdown (Target Mix)"
            ariaLabel="Donut chart showing investment breakdown"
            segments={breakdown}
            centerLabel="$420–$600K"
            centerSubLabel="Year 1"
          />

          <div className="sectionBlock solutionMode">
            <p className="sectionBlockTitle">Funding Strategy</p>
            <ul className="bullets">
              <li>
                <strong>CARDTP Allocation:</strong> propose $400K – $500K from the $30M program
              </li>
              <li>Development partner co-funding (UNDP, ITU, Australian Aid, Commonwealth, OECS)</li>
              <li>Public-private partnership (banks, tourism operators, telcos)</li>
              <li>Regional coordination (OECS multi-country economies of scale)</li>
            </ul>
          </div>

          <FundingBars />
        </div>
      </div>
    </SlideFrame>
  );
}
