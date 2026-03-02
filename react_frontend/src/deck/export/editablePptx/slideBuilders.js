import { PPTX_THEME } from "./theme";
import { getBodyBox, gridWithin, twoColWithin, SLIDE_W_IN } from "./geometry";
import { addBarChart, addCard, addMasterChrome, addSubtitle, addTitle, addTwoColTable } from "./primitives";
import { getInvestmentNumbers, getSvgDataPointValue } from "../../data/svgDataPoints";
import { getPriorityCounts, getUseCases } from "../../data/useCases";

/**
 * Each builder is responsible for the BODY content only.
 * Header/footer chrome is applied by the orchestration flow.
 */

function addDonutChart({ pptx, slide }, { x, y, w, h, title, labels, values, colors, centerLabel, centerSubLabel }) {
  // Best-effort chart support; if it fails at runtime, we still have the numbers in the text blocks elsewhere.
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    fill: { color: "FFFFFF" },
    line: { color: PPTX_THEME.colors.line, width: 1 },
    radius: 10
  });

  slide.addText(title, {
    x: x + 0.2,
    y: y + 0.15,
    w: w - 0.4,
    h: 0.25,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: 12,
    bold: true,
    color: PPTX_THEME.colors.navy
  });

  const chartX = x + 0.15;
  const chartY = y + 0.45;
  const chartW = Math.min(2.65, w * 0.48);
  const chartH = Math.min(2.15, h - 0.65);

  const dataSeries = [
    {
      name: "Series 1",
      labels,
      values
    }
  ];

  try {
    slide.addChart(pptx.ChartType.doughnut, dataSeries, {
      x: chartX,
      y: chartY,
      w: chartW,
      h: chartH,
      holeSize: 65,
      dataLabelPosition: "none",
      showLegend: false,
      chartColors: colors
    });

    // Center label overlay (editable text)
    slide.addText(centerLabel ?? "", {
      x: chartX,
      y: chartY + chartH / 2 - 0.25,
      w: chartW,
      h: 0.3,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 14,
      bold: true,
      color: PPTX_THEME.colors.navy,
      align: "center"
    });
    if (centerSubLabel) {
      slide.addText(centerSubLabel, {
        x: chartX,
        y: chartY + chartH / 2 + 0.05,
        w: chartW,
        h: 0.22,
        fontFace: PPTX_THEME.fonts.body,
        fontSize: 10,
        bold: true,
        color: PPTX_THEME.colors.muted,
        align: "center"
      });
    }
  } catch (e) {
    // If the environment does not support charts, don't fail the whole export.
    // eslint-disable-next-line no-console
    console.warn("[EditablePptxDeckFlow] Donut chart rendering failed; continuing without chart", e);
  }

  // Legend (editable)
  const legendX = x + chartW + 0.35;
  const legendY = chartY + 0.1;
  labels.forEach((lab, i) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: legendX,
      y: legendY + i * 0.3,
      w: 0.15,
      h: 0.15,
      fill: { color: (colors?.[i] ?? PPTX_THEME.colors.blue).replace("#", "") },
      line: { color: PPTX_THEME.colors.line, width: 1 },
      radius: 3
    });
    slide.addText(lab, {
      x: legendX + 0.22,
      y: legendY + i * 0.3 - 0.03,
      w: w - (legendX - x) - 0.4,
      h: 0.22,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 10,
      bold: true,
      color: PPTX_THEME.colors.text
    });
  });
}

function addStats2x2({ pptx, slide }, { x, y, w }) {
  const cellW = (w - 0.22) / 2;
  const cellH = 0.72;

  const inv = getInvestmentNumbers();
  const stats = [
    { v: `$${inv.totalMillions}M`, l: "Total Investment" },
    { v: getSvgDataPointValue("Population") ?? "~100,000", l: "Citizens" },
    { v: getSvgDataPointValue("Digital Projects Active") ?? "49", l: "Active Digital Projects" },
    { v: getSvgDataPointValue("Project Timeline") ?? "June 2020 - June 2026", l: "Project Timeline" }
  ];

  stats.forEach((s, idx) => {
    const cx = x + (idx % 2) * (cellW + 0.22);
    const cy = y + Math.floor(idx / 2) * (cellH + 0.18);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cx,
      y: cy,
      w: cellW,
      h: cellH,
      fill: { color: "F3F8FF" },
      line: { color: PPTX_THEME.colors.line, width: 1 },
      radius: 10
    });
    slide.addText(s.v, {
      x: cx + 0.2,
      y: cy + 0.15,
      w: cellW - 0.4,
      h: 0.3,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 18,
      bold: true,
      color: PPTX_THEME.colors.navy
    });
    slide.addText(s.l.toUpperCase(), {
      x: cx + 0.2,
      y: cy + 0.45,
      w: cellW - 0.4,
      h: 0.22,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 9,
      bold: true,
      color: PPTX_THEME.colors.muted,
      charSpacing: 1
    });
  });
}

function addTimelineSimple({ pptx, slide }, { x, y, w, items }) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: items.length * 0.45 + 0.25,
    fill: { color: "FFFFFF" },
    line: { color: PPTX_THEME.colors.line, width: 1 },
    radius: 10
  });

  items.forEach((it, idx) => {
    const ry = y + 0.15 + idx * 0.45;
    slide.addText(it.date, {
      x: x + 0.2,
      y: ry,
      w: 1.2,
      h: 0.25,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 12,
      bold: true,
      color: PPTX_THEME.colors.navy
    });
    slide.addText(it.title, {
      x: x + 1.5,
      y: ry,
      w: w - 1.7,
      h: 0.25,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 11,
      bold: true,
      color: PPTX_THEME.colors.text
    });
    if (it.note) {
      slide.addText(it.note, {
        x: x + 1.5,
        y: ry + 0.2,
        w: w - 1.7,
        h: 0.25,
        fontFace: PPTX_THEME.fonts.body,
        fontSize: 10,
        bold: true,
        color: PPTX_THEME.colors.muted
      });
    }
  });
}

function addGantt({ pptx, slide }, { x, y, w, h, phases }) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    fill: { color: "FFFFFF" },
    line: { color: PPTX_THEME.colors.line, width: 1 },
    radius: 10
  });

  slide.addText("12-Month Roadmap (Gantt View)", {
    x: x + 0.2,
    y: y + 0.15,
    w: w - 0.4,
    h: 0.25,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: 11,
    bold: true,
    color: PPTX_THEME.colors.navy
  });

  const padL = 1.7;
  const padR = 0.25;
  const padT = 0.55;
  const x0 = x + padL;
  const x1 = x + w - padR;
  const span = x1 - x0;

  const xForMonth = (m) => x0 + ((m - 1) / 12) * span;
  const wForRange = (s, e) => Math.max(0.15, xForMonth(e + 1) - xForMonth(s));

  // Month ticks
  for (let m = 1; m <= 12; m++) {
    const mx = xForMonth(m);
    slide.addShape(pptx.ShapeType.line, {
      x: mx,
      y: y + padT,
      w: 0,
      h: h - padT - 0.2,
      line: { color: "E6EBF2", width: 1 }
    });
    if (m % 2 === 1) {
      slide.addText(`M${m}`, {
        x: mx + 0.02,
        y: y + 0.35,
        w: 0.4,
        h: 0.2,
        fontFace: PPTX_THEME.fonts.body,
        fontSize: 8,
        bold: true,
        color: PPTX_THEME.colors.muted
      });
    }
  }

  phases.forEach((p, idx) => {
    const rowY = y + padT + 0.2 + idx * 0.55;
    slide.addText(p.label, {
      x: x + 0.2,
      y: rowY + 0.02,
      w: 0.6,
      h: 0.2,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 10,
      bold: true,
      color: PPTX_THEME.colors.navy
    });
    slide.addText(p.title, {
      x: x + 0.75,
      y: rowY + 0.02,
      w: padL - 0.95,
      h: 0.2,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 9,
      bold: true,
      color: PPTX_THEME.colors.muted
    });

    const barX = xForMonth(p.start);
    const barW = wForRange(p.start, p.end);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: barX,
      y: rowY,
      w: barW,
      h: 0.22,
      fill: { color: p.color },
      line: { color: "FFFFFF", width: 1 },
      radius: 10
    });
    slide.addText(p.range, {
      x: barX + 0.08,
      y: rowY + 0.04,
      w: barW - 0.16,
      h: 0.2,
      fontFace: PPTX_THEME.fonts.body,
      fontSize: 8,
      bold: true,
      color: "FFFFFF"
    });
  });
}

function bodyTitleY(body) {
  return body.y + 0.02;
}

export function getEditableSlideBuilders() {
  const body = getBodyBox();

  return {
    "01": ({ pptx, slide }) => {
      addTitle(slide, "Digital Identity Ecosystem", { x: body.x, y: body.y + 1.55, w: body.w });
      slide.addText("Enabling Seamless Public-Private-Citizen Transactions", {
        x: body.x,
        y: body.y + 2.2,
        w: body.w,
        h: 0.35,
        fontFace: PPTX_THEME.fonts.body,
        fontSize: 18,
        color: PPTX_THEME.colors.muted,
        bold: true
      });
      slide.addText("Klefki Solution by Vlinder Inc.", {
        x: body.x,
        y: body.y + 2.55,
        w: body.w,
        h: 0.3,
        fontFace: PPTX_THEME.fonts.body,
        fontSize: 14,
        color: PPTX_THEME.colors.text,
        bold: true
      });

      addCard(
        { pptx, slide },
        {
          x: body.x,
          y: body.y + 3.35,
          w: 7.6,
          h: 1.05,
          title: "Prepared for: Government of St. Vincent and the Grenadines",
          body: "Date: March 2026 • Confidential",
          fill: "FFFFFF"
        }
      );
    },

    "02": ({ pptx, slide }) => {
      const cols = twoColWithin(body, 0.52, 0.35);

      addTitle(slide, "SVG’s Digital Transformation Vision", { x: cols.left.x, y: bodyTitleY(body), w: cols.left.w });
      addCard(
        { pptx, slide },
        {
          x: cols.left.x,
          y: cols.left.y + 0.6,
          w: cols.left.w,
          h: 0.78,
          title: "Your Challenge",
          body: "How do you deliver world-class digital services with limited resources across dispersed island populations?",
          fill: "FFFFFF"
        }
      );
      addCard(
        { pptx, slide },
        {
          x: cols.left.x,
          y: cols.left.y + 1.48,
          w: cols.left.w,
          h: 0.78,
          title: "Our Answer",
          body: "Leverage open-source, interoperable platforms that work from day one—without reinventing the wheel.",
          fill: "FFFFFF",
          mode: "solution"
        }
      );

      addTimelineSimple({
        pptx,
        slide
      }, {
        x: cols.left.x,
        y: cols.left.y + 2.38,
        w: cols.left.w,
        items: [
          { date: "$81M", title: "Going Paperless Initiative", note: "Existing digital commitment" },
          { date: "$30M", title: "CARDTP World Bank Funding", note: "June 2020 – June 2026" }
        ]
      });

      // Right side: stats + donut + mini map (simple shapes)
      addStats2x2({ pptx, slide }, { x: cols.right.x, y: cols.right.y + 0.55, w: cols.right.w });

      const inv = getInvestmentNumbers();
      addDonutChart(
        { pptx, slide },
        {
          x: cols.right.x,
          y: cols.right.y + 2.15,
          w: cols.right.w,
          h: 1.95,
          title: "Investment Split ($111M)",
          labels: ["Going Paperless", "CARDTP (WB)"],
          values: [inv.digitalTransformMillions, inv.cardtpMillions],
          colors: [PPTX_THEME.colors.blue, PPTX_THEME.colors.turquoise],
          centerLabel: `$${inv.totalMillions}M`,
          centerSubLabel: "Total"
        }
      );

      addCard(
        { pptx, slide },
        {
          x: cols.right.x,
          y: cols.right.y + 4.25,
          w: cols.right.w,
          h: 1.45,
          title: "Geographic Reality (32 Islands)",
          body: "Dispersed population + connectivity gaps\nOffline-friendly credentials are critical.",
          fill: "FFFFFF"
        }
      );

      // Add small “islands” circles for visual balance (still editable shapes)
      const mapX = cols.right.x + 0.45;
      const mapY = cols.right.y + 4.75;
      const circles = [
        [0.0, 0.0, 0.12],
        [0.45, 0.18, 0.1],
        [0.75, 0.0, 0.08],
        [1.05, 0.22, 0.11],
        [1.35, 0.05, 0.08],
        [1.7, 0.2, 0.1]
      ];
      circles.forEach(([dx, dy, r], i) => {
        slide.addShape(pptx.ShapeType.ellipse, {
          x: mapX + dx,
          y: mapY + dy,
          w: r,
          h: r,
          fill: { color: "CCE7FF" },
          line: { color: "B7D9FF", width: 1 }
        });
        slide.addText("", { x: mapX + dx, y: mapY + dy, w: r, h: r, name: `island-${i}` });
      });
    },

    "03": ({ pptx, slide }) => {
      addTitle(slide, "The SVG Context — Why Digital Identity Matters", { x: body.x, y: bodyTitleY(body), w: body.w });

      const grid = gridWithin(
        { x: body.x, y: body.y + 0.75, w: body.w, h: body.h - 0.75 },
        2,
        2,
        0.25,
        0.25
      );

      const tourismGrowth = getSvgDataPointValue("Tourism Growth") ?? "83% growth (2022-2023)";
      const mobile = getSvgDataPointValue("Mobile Penetration") ?? "131.6%";
      const payments = getSvgDataPointValue("Digital Payment Adoption") ?? "68%";

      const cards = [
        {
          title: "1. Tourism Powerhouse",
          body: `• ${tourismGrowth}\n• Cruise arrivals up 120%\n• Leading OECS yachting destination`
        },
        {
          title: "2. Digital Readiness",
          body: `• Mobile penetration: ${mobile}\n• Digital payments: ${payments}\n• Strong eGovernment commitment`
        },
        {
          title: "3. Regional Integration Needs",
          body: "• OECS member state\n• CARICOM mobility requirements\n• Seasonal worker programs (Australia, Canada)"
        },
        {
          title: "4. The Gap",
          body: "Citizens need ONE digital identity that works for government services, banking, healthcare, education, tourism, and regional mobility.",
          mode: "problem"
        }
      ];

      grid.cells.forEach((c, idx) => {
        addCard(
          { pptx, slide },
          {
            x: c.x,
            y: c.y,
            w: c.w,
            h: c.h,
            title: cards[idx].title,
            body: cards[idx].body,
            mode: cards[idx].mode
          }
        );
      });
    },

    "04": ({ pptx, slide }) => {
      addTitle(slide, "Current Digital ID Implementation Challenges", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "The Fragmentation Problem", { x: body.x, y: body.y + 0.55, w: body.w });

      const top = { x: body.x, y: body.y + 0.9, w: body.w, h: 2.4 };
      const grid = gridWithin(top, 3, 1, 0.25, 0.2);

      const cards = [
        {
          title: "1. Fragmented Ecosystem",
          bullets: [
            "Separate apps for ID, health records, financial services",
            "Limited interoperability between systems",
            "No unified login across government services",
            "Citizens carry multiple physical cards"
          ],
          mode: "problem"
        },
        {
          title: "2. Infrastructure Limitations",
          bullets: [
            "Reliance on physical cards (cost, fraud risk)",
            "Limited offline capabilities for outer islands",
            "Complex integration requirements for small ministries",
            "Security vulnerabilities in siloed systems"
          ],
          mode: "problem"
        },
        {
          title: "3. Resource Constraints",
          bullets: ["Limited technical capacity", "High maintenance costs for multiple solutions", "Vendor lock-in risks", "Difficulty scaling across 32 islands"],
          mode: "problem"
        }
      ];

      grid.cells.forEach((c, idx) => {
        addCard({ pptx, slide }, { x: c.x, y: c.y, w: c.w, h: c.h, ...cards[idx] });
      });

      addCard(
        { pptx, slide },
        {
          x: body.x,
          y: body.y + 3.45,
          w: body.w,
          h: 0.95,
          title: "The Result",
          body:
            "Low citizen adoption, minimal ROI from digital ID investment, services remain paper-based, and regional mobility is hampered.",
          fill: "FFFFFF"
        }
      );
    },

    "05": ({ pptx, slide }) => {
      const cols = twoColWithin(body, 0.53, 0.35);
      addTitle(slide, "SVG’s MOSIP Journey — Where You Are Today", { x: cols.left.x, y: bodyTitleY(body), w: cols.left.w });
      addSubtitle(slide, "Building the foundation", { x: cols.left.x, y: cols.left.y + 0.55, w: cols.left.w });

      addTimelineSimple(
        { pptx, slide },
        {
          x: cols.left.x,
          y: cols.left.y + 0.95,
          w: cols.left.w,
          items: [
            { date: "Jun 2020", title: "CARDTP starts", note: "World Bank digital transformation program begins" },
            { date: "Q1 2024", title: "MOSIP pilot launched", note: "MOSIP platform + OpenCRVS integration" },
            { date: "Mar 2026", title: "YOU ARE HERE", note: "Window to activate use cases before close-out" },
            { date: "Jun 2026", title: "CARDTP ends", note: "Urgency: embed credential ecosystem before program completion" }
          ]
        }
      );

      addCard(
        { pptx, slide },
        {
          x: cols.right.x,
          y: cols.right.y + 0.85,
          w: cols.right.w,
          h: 1.35,
          title: "What’s Working",
          bullets: [
            "Strong World Bank partnership (CARDTP)",
            "OECS Commission technical support",
            "Legal and regulatory assessment completed",
            "Equipment delivered across rural/urban areas"
          ],
          mode: "solution"
        }
      );

      addCard(
        { pptx, slide },
        {
          x: cols.right.x,
          y: cols.right.y + 2.35,
          w: cols.right.w,
          h: 1.55,
          title: "The Missing Link",
          body:
            "MOSIP gives infrastructure, but citizens and providers ask: where do I store credentials, how do I share securely, and what services can I access?\n\nThis is where Klefki enters.",
          mode: "problem"
        }
      );
    },

    "06": ({ pptx, slide }) => {
      addTitle(slide, "Introducing Klefki — The Ecosystem Enabler", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "Klefki bridges the gap between MOSIP infrastructure and real-world citizen services.", {
        x: body.x,
        y: body.y + 0.55,
        w: body.w
      });

      const cols = twoColWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: body.h - 0.95 }, 0.52, 0.35);

      // Left “bullseye” circles as editable shapes
      slide.addShape(pptx.ShapeType.ellipse, {
        x: cols.left.x + 1.35,
        y: cols.left.y + 0.65,
        w: 2.4,
        h: 2.4,
        fill: { color: "EAF3FF" },
        line: { color: "D8E8FF", width: 1 }
      });
      slide.addShape(pptx.ShapeType.ellipse, {
        x: cols.left.x + 1.75,
        y: cols.left.y + 1.05,
        w: 1.6,
        h: 1.6,
        fill: { color: "DDEEFF" },
        line: { color: "C7E0FF", width: 1 }
      });
      slide.addText("KLEFKI", {
        x: cols.left.x + 1.75,
        y: cols.left.y + 1.55,
        w: 1.6,
        h: 0.35,
        fontFace: PPTX_THEME.fonts.body,
        fontSize: 18,
        bold: true,
        color: PPTX_THEME.colors.navy,
        align: "center"
      });
      slide.addText("Ecosystem Enabler", {
        x: cols.left.x + 1.75,
        y: cols.left.y + 1.9,
        w: 1.6,
        h: 0.25,
        fontFace: PPTX_THEME.fonts.body,
        fontSize: 9,
        bold: true,
        color: PPTX_THEME.colors.muted,
        align: "center"
      });

      addCard(
        { pptx, slide },
        {
          x: cols.left.x,
          y: cols.left.y + 3.15,
          w: cols.left.w,
          h: 0.85,
          title: "Value Proposition",
          body: "Open standards + MOSIP compatibility + Caribbean experience = fast time-to-value"
        }
      );

      const nodes = [
        {
          t: "1. Digital Wallet Layer",
          b: "Citizens store government-issued credentials securely. Mobile-first and offline-capable, interoperable with Inji and other W3C wallets."
        },
        { t: "2. Issuance Portal", b: "Government ministries and agencies issue verifiable credentials with minimal infrastructure and MOSIP integration." },
        { t: "3. Verification Ecosystem", b: "Banks, employers, and service providers verify credentials instantly via APIs and dashboards with privacy-preserving controls." },
        { t: "4. Use Case Activation", b: "Pre-built templates for common services enable rapid deployment in weeks, not years—proven implementations you can adapt." }
      ];

      nodes.forEach((n, i) => {
        addCard(
          { pptx, slide },
          {
            x: cols.right.x,
            y: cols.right.y + i * 1.15,
            w: cols.right.w,
            h: 1.03,
            title: n.t,
            body: n.b,
            mode: "solution"
          }
        );
      });
    },

    "07": ({ pptx, slide }) => {
      const cols = twoColWithin(body, 0.53, 0.35);
      addTitle(slide, "How Klefki Complements Your MOSIP Investment", { x: cols.left.x, y: bodyTitleY(body), w: cols.left.w });
      addSubtitle(slide, "Klefki doesn’t replace MOSIP—it activates it.", { x: cols.left.x, y: cols.left.y + 0.55, w: cols.left.w });

      addCard(
        { pptx, slide },
        {
          x: cols.left.x,
          y: cols.left.y + 1.05,
          w: cols.left.w,
          h: 1.1,
          title: "Key Point",
          body:
            "MOSIP provides the digital identity foundation. Klefki enables the ecosystem of issuers, wallets, and verifiers so citizens get real services from day one."
        }
      );

      const layers = [
        { t: "Citizen Experience Layer", b: "Klefki Wallet • Inji Wallet • Other W3C wallets (interoperable, citizen choice)" },
        { t: "Verification & Use Case Layer", b: "Banks • Hospitals • Schools • Tourism • Employers (Verification APIs + dashboard)" },
        { t: "Credential Issuance Layer", b: "Ministries • Agencies • Universities • Police (Issuance portal / templates)" },
        { t: "Digital Identity Foundation", b: "MOSIP Platform + OpenCRVS (UID creation • biometrics • authentication)" }
      ];

      layers.forEach((l, i) => {
        addCard(
          { pptx, slide },
          {
            x: cols.right.x,
            y: cols.right.y + 0.85 + i * 1.1,
            w: cols.right.w,
            h: 0.95,
            title: l.t,
            body: l.b,
            mode: i === 3 ? "neutral" : "solution"
          }
        );
      });
    },

    "08": ({ pptx, slide }) => {
      addTitle(slide, "Klefki Solution Architecture — SVG Implementation", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "Three-layer approach with a phased rollout.", { x: body.x, y: body.y + 0.55, w: body.w });

      const grid = gridWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: 2.2 }, 3, 1, 0.25, 0.2);
      const blocks = [
        {
          title: "Layer 1: Foundation (Underway) • 2024–2026",
          bullets: ["MOSIP: UID generation, biometrics, authentication", "OpenCRVS: birth/death/marriage registration", "Equipment distributed across islands"],
          mode: "neutral"
        },
        {
          title: "Layer 2: Credential Issuance (Enablement) • 3–4 months",
          bullets: ["Issuance portal for ministries", "Integration with MOSIP authentication", "Templates: birth, police, education, health", "Blockchain anchoring for tamper-proof verification"],
          mode: "solution"
        },
        {
          title: "Layer 3: Ecosystem Activation • 6–9 months",
          bullets: ["Wallet deployment + onboarding", "Verifier dashboard for service providers", "Integrations: banks, hospitals, tourism, employers", "Offline capability for outer islands"],
          mode: "solution"
        }
      ];
      grid.cells.forEach((c, idx) => addCard({ pptx, slide }, { x: c.x, y: c.y, w: c.w, h: c.h, ...blocks[idx] }));

      addCard(
        { pptx, slide },
        {
          x: body.x,
          y: body.y + 3.35,
          w: body.w,
          h: 1.25,
          title: "Technical Features",
          bullets: [
            "W3C Verifiable Credentials standard",
            "Blockchain-agnostic (Polygon for cost efficiency)",
            "Zero-knowledge proofs (privacy by design)",
            "API-first architecture • Available on Azure Marketplace"
          ],
          mode: "solution"
        }
      );
    },

    "09": ({ pptx, slide }) => {
      addTitle(slide, "Why SVG Should Choose Klefki", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "Five compelling reasons", { x: body.x, y: body.y + 0.55, w: body.w });

      const grid = gridWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: body.h - 0.95 }, 2, 3, 0.25, 0.2);
      const reasons = [
        {
          title: "1. Caribbean Experience",
          body: "Proven deployments in island contexts: Vanuatu (electronic police clearance), Jamaica (work permits) and active MOSIP contributions.",
          mode: "solution"
        },
        { title: "2. Rapid Deployment", body: "Pre-built templates and Azure Marketplace availability enable weeks—not years—time-to-value.", mode: "solution" },
        { title: "3. Lower Total Cost of Ownership", body: "Open standards, cloud-native delivery, reusable verification, and no vendor lock-in reduce long-term costs.", mode: "solution" },
        { title: "4. MOSIP Ecosystem Alignment", body: "Works seamlessly with MOSIP and Inji; interoperable with W3C-compliant wallets; aligns with open wallet principles.", mode: "solution" },
        { title: "5. Proven ROI", body: "Real outcomes: 5–7 days → 2 hours (police clearance), 30 days → 7 days (work permits), 3–5 days → instant (cert verification).", mode: "solution" }
      ];

      reasons.forEach((r, idx) => {
        const c = grid.cells[idx];
        addCard({ pptx, slide }, { x: c.x, y: c.y, w: c.w, h: c.h, title: r.title, body: r.body, mode: r.mode });
      });
    },

    "10": ({ pptx, slide }) => {
      addTitle(slide, "SVG Priority Use Cases — What to Build First", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "Recommended phased approach", { x: body.x, y: body.y + 0.55, w: body.w });

      const all = getUseCases();
      const counts = getPriorityCounts();
      const phase1 = all.filter((u) => u.phase.startsWith("Phase 1")).map((u) => `${u.useCase} — ${u.priority}`);
      const phase2 = all.filter((u) => u.phase.startsWith("Phase 2")).map((u) => `${u.useCase} — ${u.priority}`);
      const phase3 = all.filter((u) => u.phase.startsWith("Phase 3")).map((u) => `${u.useCase} — ${u.priority}`);
      const strategic = all.filter((u) => u.phase === "Strategic").map((u) => u.useCase).join(", ");

      const top = gridWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: 2.15 }, 3, 1, 0.25, 0.2);
      const phases = [
        { title: "Phase 1 (Months 1–4)", bullets: phase1 },
        { title: "Phase 2 (Months 5–9)", bullets: phase2 },
        { title: "Phase 3 (Months 10–15)", bullets: phase3 }
      ];
      top.cells.forEach((c, idx) => addCard({ pptx, slide }, { x: c.x, y: c.y, w: c.w, h: c.h, title: phases[idx].title, bullets: phases[idx].bullets, mode: "solution" }));

      const bottomCols = twoColWithin({ x: body.x, y: body.y + 3.25, w: body.w, h: body.h - 3.25 }, 0.54, 0.35);
      addCard(
        { pptx, slide },
        {
          x: bottomCols.left.x,
          y: bottomCols.left.y,
          w: bottomCols.left.w,
          h: 1.65,
          title: "Strategic",
          body: `${strategic}\n\nFocus after ecosystem foundations are in place.`,
          mode: "warn"
        }
      );

      addCard(
        { pptx, slide },
        {
          x: bottomCols.right.x,
          y: bottomCols.right.y,
          w: bottomCols.right.w,
          h: 1.65,
          title: "Priority Distribution",
          body: ""
        }
      );

      addBarChart(
        { pptx, slide },
        {
          x: bottomCols.right.x + 0.25,
          y: bottomCols.right.y + 0.55,
          w: bottomCols.right.w - 0.5,
          rows: [
            { key: "CRITICAL", label: "CRITICAL", value: counts.CRITICAL, note: String(counts.CRITICAL), color: PPTX_THEME.colors.problem },
            { key: "HIGH", label: "HIGH", value: counts.HIGH, note: String(counts.HIGH), color: PPTX_THEME.colors.warning },
            { key: "MEDIUM", label: "MEDIUM", value: counts.MEDIUM, note: String(counts.MEDIUM), color: "FBBF24" },
            { key: "LOW", label: "LOW", value: counts.LOW, note: String(counts.LOW), color: "94A3B8" },
            { key: "STRATEGIC", label: "STRATEGIC", value: counts.STRATEGIC, note: String(counts.STRATEGIC), color: "7C3AED" }
          ]
        }
      );
    },

    "11": ({ pptx, slide }) => {
      addTitle(slide, "The Klefki Wallet Experience — Citizen Journey", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "From Birth to Business", { x: body.x, y: body.y + 0.55, w: body.w });

      const steps = [
        {
          t: "1. Birth → Digital Birth Certificate",
          b: "OpenCRVS creates record → MOSIP generates UID → digital birth certificate issued to parent’s Klefki Wallet."
        },
        { t: "2. Education → Digital Diplomas", b: "Institutions issue diplomas via issuance portal; students share instantly via QR code or link." },
        {
          t: "3. Employment → Police Clearance & Work Permits",
          b: "Police clearance issued digitally with QR + blockchain verification; work permits added for regional mobility."
        },
        { t: "4. Financial Access → eKYC", b: "Bank verifies government-issued credentials in real time; account opened in under 2 hours." },
        { t: "5. Healthcare → Medical Records", b: "Consent-based sharing enables seamless care across islands, even with intermittent connectivity." },
        { t: "6. Tourism & Travel → Seamless Entry", b: "Selective disclosure supports hotel check-in and border verification without photocopying." }
      ];

      const startY = body.y + 0.95;
      steps.forEach((s, idx) => {
        addCard(
          { pptx, slide },
          { x: body.x, y: startY + idx * 0.78, w: body.w, h: 0.7, title: s.t, body: s.b, mode: "neutral" }
        );
      });
    },

    "12": ({ pptx, slide }) => {
      addTitle(slide, "Case Study Spotlight — Electronic Police Clearance (Vanuatu)", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "Proven success in a Pacific island context", { x: body.x, y: body.y + 0.55, w: body.w });

      const cols = twoColWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: body.h - 0.95 }, 0.5, 0.35);

      addCard(
        { pptx, slide },
        { x: cols.left.x, y: cols.left.y, w: cols.left.w, h: 1.55, title: "Before", bullets: ["Manual process took 5–7 days", "Required travel to capital; high cost", "Vulnerable to fraud"], mode: "problem" }
      );
      addCard(
        { pptx, slide },
        { x: cols.right.x, y: cols.right.y, w: cols.right.w, h: 1.55, title: "After", bullets: ["Citizens apply remotely via mobile", "Police HQ verifies digitally", "Certificate issued to wallet with QR + blockchain verification"], mode: "solution" }
      );

      addCard(
        { pptx, slide },
        {
          x: body.x,
          y: body.y + 2.75,
          w: body.w,
          h: 2.15,
          title: "Results",
          bullets: [
            "Processing time: 5–7 days → 2 hours",
            "Cost reduction: 70%",
            "Fraud elimination via tamper-proof verification",
            "95%+ citizen satisfaction; faster employment and remittances",
            "Funding: UN + Australian Aid"
          ],
          mode: "neutral"
        }
      );

      slide.addText("Video demo: QR code placeholder (add actual QR in final client version).", {
        x: body.x + 0.25,
        y: body.y + 4.65,
        w: body.w - 0.5,
        h: 0.25,
        fontFace: PPTX_THEME.fonts.body,
        fontSize: 10,
        bold: true,
        color: PPTX_THEME.colors.muted
      });
    },

    "13": ({ pptx, slide }) => {
      addTitle(slide, "Case Study — Jamaica Work Permits (CSME Integration)", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "Regional mobility made real", { x: body.x, y: body.y + 0.55, w: body.w });

      const cols = twoColWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: body.h - 0.95 }, 0.5, 0.35);
      addCard(
        { pptx, slide },
        { x: cols.left.x, y: cols.left.y, w: cols.left.w, h: 1.55, title: "Before", bullets: ["Manual processing — 30+ days", "Paper-heavy workflow", "Fraud risks and difficult compliance"], mode: "problem" }
      );
      addCard(
        { pptx, slide },
        { x: cols.right.x, y: cols.right.y, w: cols.right.w, h: 1.55, title: "After", bullets: ["Digital application + issuance", "Payment gateway and TRN integration", "Electronic permits with blockchain verification"], mode: "solution" }
      );

      addCard(
        { pptx, slide },
        {
          x: body.x,
          y: body.y + 2.75,
          w: body.w,
          h: 2.15,
          title: "Results",
          bullets: ["Processing time: 30 days → 7 days", "Paperwork reduction: 90%", "CSME compliance: seamless regional integration", "Employer satisfaction: streamlined hiring"],
          mode: "neutral"
        }
      );

      slide.addText(
        "Why this matters for SVG: As OECS and CARICOM member, SVG has regional mobility obligations—this model is turnkey for compliance.",
        {
          x: body.x + 0.25,
          y: body.y + 4.55,
          w: body.w - 0.5,
          h: 0.4,
          fontFace: PPTX_THEME.fonts.body,
          fontSize: 11,
          bold: true,
          color: PPTX_THEME.colors.blue
        }
      );
    },

    "14": ({ pptx, slide }) => {
      addTitle(slide, "Case Study — India Education Certificates (Scale Example)", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "From pilot to national scale", { x: body.x, y: body.y + 0.55, w: body.w });

      const cols = twoColWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: body.h - 0.95 }, 0.5, 0.35);
      addCard(
        { pptx, slide },
        { x: cols.left.x, y: cols.left.y, w: cols.left.w, h: 1.55, title: "Before", bullets: ["Verification took 3–5 days", "Hard to verify globally"], mode: "problem" }
      );
      addCard(
        { pptx, slide },
        { x: cols.right.x, y: cols.right.y, w: cols.right.w, h: 1.55, title: "After", bullets: ["Digital issuance with blockchain anchoring", "QR code scanning for instant verification", "Integration with national repositories (e.g., DigiLocker)"], mode: "solution" }
      );

      addCard(
        { pptx, slide },
        { x: body.x, y: body.y + 2.75, w: body.w, h: 1.3, title: "Why this matters for SVG", bullets: ["Shows Klefki scales from small island states to massive populations", "SVG’s ~100,000 population is ideal for rapid, complete coverage"], mode: "neutral" }
      );
    },

    "15": ({ pptx, slide }) => {
      addTitle(slide, "Security & Privacy — Built-In, Not Bolted-On", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "Trust through technology", { x: body.x, y: body.y + 0.55, w: body.w });

      const grid = gridWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: body.h - 0.95 }, 2, 3, 0.25, 0.22);
      const blocks = [
        { title: "1. Cryptographic Security", body: "Digital signatures and blockchain anchoring ensure authenticity and tamper-evidence through standard public-key cryptography." },
        { title: "2. Privacy by Design", body: "Zero-knowledge proofs and selective disclosure: prove ‘over 18’ without revealing birthdate; share only what’s needed." },
        { title: "3. Data Sovereignty", body: "Credentials live in personal wallets, not centralized databases—consent-based sharing with audit trails reduces risk." },
        { title: "4. Offline Capability", body: "QR code verification works without internet—critical for outer islands. Sync can occur when connectivity returns." },
        { title: "5. Regulatory Compliance", body: "W3C Verifiable Credentials + OpenID integration align with international identity assurance frameworks and accountability needs." },
        { title: "Azure Marketplace Verified", body: "Microsoft-vetted for enterprise security, reliability, and compliance.", mode: "solution" }
      ];

      grid.cells.forEach((c, idx) => addCard({ pptx, slide }, { x: c.x, y: c.y, w: c.w, h: c.h, ...blocks[idx] }));
    },

    "16": ({ pptx, slide }) => {
      const cols = twoColWithin(body, 0.53, 0.35);
      addTitle(slide, "Implementation Roadmap for SVG", { x: cols.left.x, y: bodyTitleY(body), w: cols.left.w });
      addSubtitle(slide, "Realistic timeline — 12-month deployment", { x: cols.left.x, y: cols.left.y + 0.55, w: cols.left.w });

      addCard(
        { pptx, slide },
        {
          x: cols.left.x,
          y: cols.left.y + 0.95,
          w: cols.left.w,
          h: 1.35,
          title: "Months 1–3: Foundation Phase",
          bullets: [
            "Platform setup on Azure",
            "Integration with SVG MOSIP infrastructure",
            "Issuance portal configured for ministries",
            "Training for teams and staff",
            "Pilot: Digital Birth Certificate + Electronic Police Clearance"
          ],
          mode: "solution"
        }
      );
      addCard(
        { pptx, slide },
        {
          x: cols.left.x,
          y: cols.left.y + 2.45,
          w: cols.left.w,
          h: 1.35,
          title: "Months 4–6: Wallet Launch & Early Adopters",
          bullets: [
            "Wallet app launch + citizen onboarding (carrier partnerships)",
            "Issuance begins: birth, police, education",
            "Early verifiers: 2–3 banks, 1–2 hospitals, key employers",
            "Measurement and iteration"
          ],
          mode: "solution"
        }
      );

      addGantt({
        pptx,
        slide
      }, {
        x: cols.right.x,
        y: cols.right.y + 0.95,
        w: cols.right.w,
        h: 2.3,
        phases: [
          { label: "1–3", title: "Foundation", start: 1, end: 3, range: "M1–M3", color: PPTX_THEME.colors.blue },
          { label: "4–6", title: "Wallet Launch", start: 4, end: 6, range: "M4–M6", color: PPTX_THEME.colors.turquoise },
          { label: "7–9", title: "Ecosystem Expansion", start: 7, end: 9, range: "M7–M9", color: PPTX_THEME.colors.success },
          { label: "10–12", title: "Scale & Optimization", start: 10, end: 12, range: "M10–M12", color: PPTX_THEME.colors.navy }
        ]
      });

      addCard(
        { pptx, slide },
        {
          x: cols.right.x,
          y: cols.right.y + 3.4,
          w: cols.right.w,
          h: 1.45,
          title: "Success Metrics",
          bullets: [
            "30% wallet adoption in 12 months",
            "10+ government services",
            "5+ private sector verifiers",
            "80%+ reduction in physical processing time",
            "50%+ cost savings in issuance & verification"
          ],
          mode: "solution"
        }
      );
    },

    "17": ({ pptx, slide }) => {
      addTitle(slide, "Governance & Capacity Building", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "Ensuring long-term sustainability", { x: body.x, y: body.y + 0.55, w: body.w });

      const grid = gridWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: 2.4 }, 2, 2, 0.25, 0.22);
      const quads = [
        { title: "Technical Capacity Building", body: "Train IT staff, run credential design workshops for ministries, API integration training for private sector, and security best practices." },
        { title: "Policy & Legal Framework", body: "Support e-transactions legislation, data protection regulations, credential standards, and cross-border recognition agreements." },
        { title: "Change Management", body: "Citizen awareness campaigns, ministry champions program, private sector engagement, and feedback loops for iterative improvement." },
        { title: "Governance Structure", body: "Steering committee, technical working groups per use case, PPP framework, and regional OECS coordination." }
      ];
      grid.cells.forEach((c, idx) => addCard({ pptx, slide }, { x: c.x, y: c.y, w: c.w, h: c.h, title: quads[idx].title, body: quads[idx].body }));

      addCard(
        { pptx, slide },
        {
          x: body.x,
          y: body.y + 3.55,
          w: body.w,
          h: 1.25,
          title: "Open-Source Contribution",
          body: "SVG becomes a Caribbean reference implementation—sharing knowledge via MOSIP community and strengthening regional digital public infrastructure.",
          mode: "solution"
        }
      );
    },

    "18": ({ pptx, slide }) => {
      const cols = twoColWithin(body, 0.53, 0.35);
      addTitle(slide, "Investment & Funding Options", { x: cols.left.x, y: bodyTitleY(body), w: cols.left.w });
      addSubtitle(slide, "Making this affordable", { x: cols.left.x, y: cols.left.y + 0.55, w: cols.left.w });

      addCard(
        { pptx, slide },
        {
          x: cols.left.x,
          y: cols.left.y + 0.95,
          w: cols.left.w,
          h: 2.15,
          title: "Total Investment Estimate (12-Month Implementation)",
          bullets: [
            "Platform & Infrastructure: $150K – $200K",
            "Integration & Customization: $100K – $150K",
            "Training & Capacity Building: $50K – $75K",
            "Marketing & Adoption: $50K – $75K",
            "Contingency & Support (20%): $70K – $100K",
            "Total Range: $420K – $600K USD"
          ],
          mode: "neutral"
        }
      );

      addCard(
        { pptx, slide },
        {
          x: cols.left.x,
          y: cols.left.y + 3.2,
          w: cols.left.w,
          h: 1.45,
          title: "Return on Investment",
          bullets: ["Year 1 efficiency savings: $200K – $300K", "Reduced fraud + faster service delivery", "Improved inclusion and citizen satisfaction", "Regional leadership positioning"],
          mode: "solution"
        }
      );

      addDonutChart(
        { pptx, slide },
        {
          x: cols.right.x,
          y: cols.right.y + 0.95,
          w: cols.right.w,
          h: 1.9,
          title: "Investment Breakdown (Target Mix)",
          labels: ["Platform & Infra", "Integration", "Training", "Adoption", "Contingency"],
          values: [35, 25, 15, 15, 20],
          colors: [PPTX_THEME.colors.blue, PPTX_THEME.colors.turquoise, PPTX_THEME.colors.success, PPTX_THEME.colors.warning, PPTX_THEME.colors.navy],
          centerLabel: "$420–$600K",
          centerSubLabel: "Year 1"
        }
      );

      addCard(
        { pptx, slide },
        {
          x: cols.right.x,
          y: cols.right.y + 2.95,
          w: cols.right.w,
          h: 1.2,
          title: "Funding Strategy",
          bullets: [
            "CARDTP Allocation: propose $400K – $500K from the $30M program",
            "Development partner co-funding (UNDP, ITU, Australian Aid, Commonwealth, OECS)",
            "Public-private partnership (banks, tourism operators, telcos)",
            "Regional coordination (OECS multi-country economies of scale)"
          ],
          mode: "solution"
        }
      );

      addCard({ pptx, slide }, { x: cols.right.x, y: cols.right.y + 4.25, w: cols.right.w, h: 1.45, title: "Funding Sources (Illustrative)", body: "" });

      addBarChart(
        { pptx, slide },
        {
          x: cols.right.x + 0.25,
          y: cols.right.y + 4.75,
          w: cols.right.w - 0.5,
          rows: [
            { key: "CARDTP", label: "CARDTP", value: 450, note: "$400K–$500K", color: PPTX_THEME.colors.blue },
            { key: "Partners", label: "Dev Partners", value: 180, note: "TBD", color: PPTX_THEME.colors.turquoise },
            { key: "PPP", label: "PPP", value: 120, note: "TBD", color: PPTX_THEME.colors.success },
            { key: "Regional", label: "Regional", value: 80, note: "TBD", color: PPTX_THEME.colors.navy }
          ]
        }
      );
    },

    "19": ({ pptx, slide }) => {
      addTitle(slide, "Risk Mitigation & Success Factors", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "How we ensure this works", { x: body.x, y: body.y + 0.55, w: body.w });

      addTwoColTable(
        { pptx, slide },
        {
          x: body.x,
          y: body.y + 0.95,
          w: body.w,
          h: 3.05,
          headerLeft: "Risk",
          headerRight: "Mitigation Strategy",
          rows: [
            { left: "Low citizen adoption", right: "Start with high-value use cases; carrier partnerships; community engagement" },
            { left: "Technical integration challenges", right: "Proven MOSIP compatibility; phased rollout; expert support" },
            { left: "Private sector resistance", right: "Early verifier partnerships; demonstrate savings; API ease-of-use; workshops" },
            { left: "Connectivity issues (outer islands)", right: "Offline QR verification; periodic sync model" },
            { left: "Cybersecurity threats", right: "Azure-hosted security; audits; W3C standards; cryptographic protection" },
            { left: "Budget overruns", right: "Fixed-scope initial phase; open-source foundation; cloud cost management" },
            { left: "Vendor lock-in concerns", right: "Open standards; interoperable with Inji; blockchain-agnostic; API-first" },
            { left: "Regulatory gaps", right: "Policy support from day 1; legal assessment; regional harmonization" }
          ]
        }
      );

      addCard(
        { pptx, slide },
        {
          x: body.x,
          y: body.y + 4.15,
          w: body.w,
          h: 1.35,
          title: "Critical Success Factors",
          bullets: [
            "Strong government champion",
            "Citizen-centric design and quick wins in first 90 days",
            "Private sector buy-in to create network effects",
            "Regional collaboration (OECS/CARICOM alignment)",
            "Transparent progress reporting and iterative scaling"
          ],
          mode: "solution"
        }
      );
    },

    "20": ({ pptx, slide }) => {
      const cols = twoColWithin(body, 0.53, 0.35);
      addTitle(slide, "Why Vlinder / Klefki — Our Commitment to SVG", { x: cols.left.x, y: bodyTitleY(body), w: cols.left.w });
      addSubtitle(slide, "Partnership, not just a product", { x: cols.left.x, y: cols.left.y + 0.55, w: cols.left.w });

      addCard(
        { pptx, slide },
        {
          x: cols.left.x,
          y: cols.left.y + 0.95,
          w: cols.left.w,
          h: 1.75,
          title: "Who We Are",
          bullets: [
            "Vlinder Inc. — digital credentials specialists",
            "Proven island deployments (Vanuatu, Jamaica)",
            "Open-source champions (no proprietary lock-in)",
            "Global reach, local focus for small island realities"
          ]
        }
      );

      addCard(
        { pptx, slide },
        { x: cols.right.x, y: cols.right.y + 0.95, w: cols.right.w, h: 1.35, title: "What Sets Us Apart", body: "" , mode: "solution"}
      );

      // Badges (editable pills)
      const badges = ["Island Contexts", "Fast Time-to-Value", "Open Standards", "Ecosystem Focus", "Capacity Building", "Aligned Incentives"];
      let bx = cols.right.x + 0.25;
      let by = cols.right.y + 1.5;
      const maxW = cols.right.w - 0.5;
      const pillH = 0.28;
      const pillPad = 0.12;

      badges.forEach((t) => {
        const pillW = Math.min(2.1, 0.14 * t.length + 0.7);
        if (bx + pillW > cols.right.x + maxW) {
          bx = cols.right.x + 0.25;
          by += pillH + 0.14;
        }
        slide.addShape(pptx.ShapeType.roundRect, {
          x: bx,
          y: by,
          w: pillW,
          h: pillH,
          fill: { color: "FFFFFF" },
          line: { color: PPTX_THEME.colors.line, width: 1 },
          radius: 14
        });
        slide.addText(t, {
          x: bx + pillPad,
          y: by + 0.05,
          w: pillW - pillPad * 2,
          h: pillH,
          fontFace: PPTX_THEME.fonts.body,
          fontSize: 10,
          bold: true,
          color: PPTX_THEME.colors.navy
        });
        bx += pillW + 0.12;
      });

      addCard(
        { pptx, slide },
        {
          x: cols.right.x,
          y: cols.right.y + 2.55,
          w: cols.right.w,
          h: 1.25,
          title: "Mindset",
          body: "We measure success by adoption and impact—not just deployment. The goal is a sustainable SVG-led ecosystem."
        }
      );
    },

    "21": ({ pptx, slide }) => {
      addTitle(slide, "Regional Vision — SVG as Caribbean Digital Identity Leader", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "Beyond national benefits", { x: body.x, y: body.y + 0.55, w: body.w });

      const grid = gridWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: body.h - 0.95 }, 2, 3, 0.25, 0.22);
      const items = [
        { title: "1. OECS Digital Identity Hub", body: "Reference implementation, shared services, and regional credential interoperability." },
        { title: "2. CARICOM Mobility Leader", body: "Seamless work permits and professional credential portability across the region." },
        { title: "3. Small Island State Innovator", body: "Knowledge sharing with Pacific + Caribbean small states; a model for development partners." },
        { title: "4. Tourism Credential Standard-Setter", body: "Digital tourism and health credentials to streamline travel and improve visitor experience." },
        { title: "5. Financial Inclusion Pioneer", body: "Model for digital KYC and readiness for regional digital payment ecosystems." },
        {
          title: "The Narrative",
          body: "“St. Vincent and the Grenadines — 100,000 citizens leading digital transformation for 44 million Caribbean residents.”",
          mode: "solution"
        }
      ];
      grid.cells.forEach((c, idx) => addCard({ pptx, slide }, { x: c.x, y: c.y, w: c.w, h: c.h, ...items[idx] }));
    },

    "22": ({ pptx, slide }) => {
      addTitle(slide, "Next Steps — How to Get Started", { x: body.x, y: bodyTitleY(body), w: body.w });
      addSubtitle(slide, "Recommended action plan", { x: body.x, y: body.y + 0.55, w: body.w });

      const top = gridWithin({ x: body.x, y: body.y + 0.95, w: body.w, h: body.h - 0.95 }, 3, 1, 0.25, 0.2);
      const cols = [
        {
          title: "Immediate (Next 30 Days)",
          bullets: [
            "Form Digital Identity Steering Committee (ministries + private sector + OECS liaison)",
            "Conduct discovery workshop in Kingstown",
            "Secure funding commitment (CARDTP + partners + PPP)",
            "Legal & policy assessment for e-transactions and data protection"
          ]
        },
        {
          title: "Short-Term (90 Days)",
          bullets: [
            "Pilot: Digital Birth Certificate + Electronic Police Clearance",
            "Target: 100 credentials issued; 5 verifiers onboarded",
            "Recruit early adopters (2–3 banks, employers, tourism operator)",
            "Launch public awareness campaign (carrier partnerships)"
          ]
        },
        {
          title: "Medium-Term (6–12 Months)",
          bullets: [
            "Scale to 10+ government services and 5+ private verifiers",
            "Reach 30% wallet adoption and outer islands deployment",
            "Regional integration pilots (OECS interoperability, CARICOM mobility)",
            "Sustainability planning: revenue + capacity transfer + governance institutionalization"
          ]
        }
      ];
      top.cells.forEach((c, idx) => addCard({ pptx, slide }, { x: c.x, y: c.y, w: c.w, h: c.h, title: cols[idx].title, bullets: cols[idx].bullets, mode: "solution" }));
    },

    "23": ({ pptx, slide }) => {
      addTitle(slide, "Let’s Build SVG’s Digital Future Together", { x: body.x, y: bodyTitleY(body), w: body.w });

      const grid = gridWithin({ x: body.x, y: body.y + 0.75, w: body.w, h: 1.55 }, 3, 1, 0.25, 0.2);
      const blocks = [
        {
          title: "The Opportunity",
          body: "SVG has momentum: $111M investment, MOSIP foundation underway, 49 active projects, World Bank partnership, OECS support."
        },
        {
          title: "The Missing Piece",
          body: "Activate the ecosystem so citizens experience tangible benefits and digital identity infrastructure delivers ROI.",
          mode: "problem"
        },
        {
          title: "The Ask",
          body: "Schedule a discovery workshop in Kingstown to align technical integration, co-design the roadmap, and launch a pilot within 90 days.",
          mode: "solution"
        }
      ];

      grid.cells.forEach((c, idx) => addCard({ pptx, slide }, { x: c.x, y: c.y, w: c.w, h: c.h, ...blocks[idx] }));

      addCard(
        { pptx, slide },
        {
          x: body.x,
          y: body.y + 2.5,
          w: body.w,
          h: 1.0,
          title: "Urgency",
          body: "CARDTP ends June 2026. This is the window to embed credential infrastructure and launch pilots before project close-out.",
          mode: "warn"
        }
      );

      addCard(
        { pptx, slide },
        {
          x: body.x,
          y: body.y + 3.65,
          w: body.w,
          h: 0.95,
          title: "Contact",
          body: "Vlinder Inc. • Email: [contact information] • Website: vlinder.io • Klefki: vlinder.io/product/klefki"
        }
      );
    },

    "24": ({ pptx, slide }) => {
      // Centered thank-you
      const centerY = body.y + 1.55;
      slide.addText("Thank You", {
        x: body.x,
        y: centerY,
        w: body.w,
        h: 0.6,
        fontFace: PPTX_THEME.fonts.heading,
        fontSize: 42,
        bold: true,
        color: PPTX_THEME.colors.navy,
        align: "center"
      });
      slide.addText("Questions & Discussion", {
        x: body.x,
        y: centerY + 0.75,
        w: body.w,
        h: 0.3,
        fontFace: PPTX_THEME.fonts.body,
        fontSize: 18,
        bold: true,
        color: PPTX_THEME.colors.muted,
        align: "center"
      });

      addCard(
        { pptx, slide },
        {
          x: body.x + 1.1,
          y: centerY + 1.35,
          w: body.w - 2.2,
          h: 1.1,
          title: "St. Vincent and the Grenadines: From Digital Infrastructure to Digital Ecosystem",
          body: "“Let’s make digital identity work for every Vincentian, from every island.”",
          mode: "solution"
        }
      );

      slide.addText("QR code placeholder • vlinder.io • [contact information]", {
        x: body.x,
        y: centerY + 2.65,
        w: body.w,
        h: 0.3,
        fontFace: PPTX_THEME.fonts.body,
        fontSize: 12,
        bold: true,
        color: PPTX_THEME.colors.muted,
        align: "center"
      });
    }
  };
}

export function getSectionLabelById(id) {
  const map = {
    "01": "Opening",
    "02": "Opening",
    "03": "Opening",
    "04": "Problem Framing",
    "05": "Problem Framing",
    "06": "Solution Introduction",
    "07": "Solution Introduction",
    "08": "Solution Introduction",
    "09": "Differentiation",
    "10": "Differentiation",
    "11": "Proof",
    "12": "Proof",
    "13": "Proof",
    "14": "Proof",
    "15": "Trust & Security",
    "16": "Implementation",
    "17": "Implementation",
    "18": "Investment",
    "19": "Risk Management",
    "20": "Partnership",
    "21": "Vision",
    "22": "Action",
    "23": "Action",
    "24": "Action"
  };
  return map[id] ?? "";
}

export function getTitleById(id) {
  const titles = {
    "01": "Title",
    "02": "SVG’s Digital Transformation Vision",
    "03": "The SVG Context",
    "04": "Current Challenges",
    "05": "SVG’s MOSIP Journey",
    "06": "Introducing Klefki",
    "07": "Technology Stack",
    "08": "Solution Architecture",
    "09": "Why Choose Klefki",
    "10": "Priority Use Cases",
    "11": "Citizen Journey",
    "12": "Case Study: Vanuatu (Police Clearance)",
    "13": "Case Study: Jamaica (Work Permits)",
    "14": "Case Study: India (Certificates)",
    "15": "Security & Privacy",
    "16": "Implementation Roadmap",
    "17": "Governance",
    "18": "Investment",
    "19": "Risk Mitigation",
    "20": "Vlinder Commitment",
    "21": "Regional Vision",
    "22": "Next Steps",
    "23": "Call to Action",
    "24": "Thank You"
  };
  return titles[id] ?? `Slide ${id}`;
}

export function getAllSlideIds() {
  return Array.from({ length: 24 }, (_, i) => String(i + 1).padStart(2, "0"));
}

export function assertAllSlidesCovered(builders) {
  const ids = getAllSlideIds();
  const missing = ids.filter((id) => typeof builders[id] !== "function");
  if (missing.length) {
    throw new Error(`[EditablePptxDeckFlow] Missing slide builders for: ${missing.join(", ")}`);
  }
  return true;
}

export function addDebugWatermark(slide, id) {
  // Keep this disabled by default; useful when iterating on layouts.
  if (process.env.REACT_APP_NODE_ENV === "production") return;
  slide.addText(`ID ${id}`, {
    x: SLIDE_W_IN - 1.2,
    y: 0.02,
    w: 1.1,
    h: 0.2,
    fontFace: PPTX_THEME.fonts.body,
    fontSize: 8,
    color: "CBD5E1",
    align: "right"
  });
}

export function addChromeForSlide({ pptx, slide, id, slideNumber }) {
  addMasterChrome({ pptx, slide, slideNumber, sectionLabel: getSectionLabelById(id) });
  addDebugWatermark(slide, id);
}
