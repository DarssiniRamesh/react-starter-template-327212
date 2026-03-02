import React, { useMemo } from "react";

/**
 * Small utility helpers for generating SVG arc paths.
 */
function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad)
  };
}

function describeArc(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const startOuter = polarToCartesian(cx, cy, rOuter, endAngle);
  const endOuter = polarToCartesian(cx, cy, rOuter, startAngle);

  const startInner = polarToCartesian(cx, cy, rInner, startAngle);
  const endInner = polarToCartesian(cx, cy, rInner, endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  // Donut segment path: outer arc -> inner arc (reverse) -> close.
  return [
    "M",
    startOuter.x,
    startOuter.y,
    "A",
    rOuter,
    rOuter,
    0,
    largeArcFlag,
    0,
    endOuter.x,
    endOuter.y,
    "L",
    startInner.x,
    startInner.y,
    "A",
    rInner,
    rInner,
    0,
    largeArcFlag,
    1,
    endInner.x,
    endInner.y,
    "Z"
  ].join(" ");
}

// PUBLIC_INTERFACE
export default function DonutChart({
  title,
  ariaLabel,
  segments,
  width = 240,
  height = 240,
  innerRadius = 72,
  outerRadius = 104,
  centerLabel,
  centerSubLabel
}) {
  /**
   * A minimal SVG donut chart (no external deps) for slide visuals.
   *
   * Contract:
   * - segments: Array<{ label: string, value: number, color: string }>
   * - Values are normalized to total; zero/negative values are ignored.
   */
  const normalized = useMemo(() => {
    const safe = (segments || [])
      .map((s) => ({ ...s, value: Number(s.value) }))
      .filter((s) => Number.isFinite(s.value) && s.value > 0);

    const total = safe.reduce((acc, s) => acc + s.value, 0);
    return { safe, total };
  }, [segments]);

  const cx = width / 2;
  const cy = height / 2;

  let cursor = 0;

  return (
    <div className="chartCard" role="group" aria-label={ariaLabel || title || "Donut chart"}>
      {title ? (
        <div className="chartCardTitle" style={{ marginBottom: 10 }}>
          {title}
        </div>
      ) : null}

      <div className="donutWrap">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel || title}>
          {/* Track ring */}
          <circle cx={cx} cy={cy} r={outerRadius} fill="rgba(26,39,69,0.04)" />
          <circle cx={cx} cy={cy} r={innerRadius} fill="white" />

          {normalized.safe.map((s) => {
            const startAngle = cursor;
            const sliceAngle = (s.value / Math.max(normalized.total, 1)) * 360;
            const endAngle = cursor + sliceAngle;
            cursor = endAngle;

            return (
              <path
                key={s.label}
                d={describeArc(cx, cy, outerRadius, innerRadius, startAngle, endAngle)}
                fill={s.color}
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="2"
              />
            );
          })}

          {/* Center labels */}
          {centerLabel ? (
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontSize="22"
              fontWeight="900"
              fill="#1a2745"
            >
              {centerLabel}
            </text>
          ) : null}
          {centerSubLabel ? (
            <text
              x={cx}
              y={cy + 18}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontSize="12"
              fontWeight="800"
              fill="rgba(45,55,72,0.70)"
            >
              {centerSubLabel}
            </text>
          ) : null}
        </svg>

        <div className="donutLegend" aria-label="Legend">
          {normalized.safe.map((s) => (
            <div className="donutLegendRow" key={s.label}>
              <div className="donutSwatch" style={{ background: s.color }} aria-hidden="true" />
              <div className="donutLegendLabel">{s.label}</div>
              <div className="donutLegendValue">
                {normalized.total > 0 ? Math.round((s.value / normalized.total) * 100) : 0}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
