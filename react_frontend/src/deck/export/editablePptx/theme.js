/**
 * Shared theme tokens for the editable PPTX export.
 * Keep this file small and stable: it is referenced by all slide builders.
 */

export const PPTX_THEME = Object.freeze({
  fonts: Object.freeze({
    heading: "Aptos Display",
    body: "Aptos"
  }),
  colors: Object.freeze({
    white: "FFFFFF",
    navy: "1A2745",
    blue: "0066CC",
    turquoise: "06B6D4",
    success: "10B981",
    warning: "F59E0B",
    problem: "EF4444",
    text: "2D3748",
    muted: "6B7280",
    line: "D7DCE3",
    bgSoft: "F8FAFC"
  }),
  fontSizes: Object.freeze({
    kicker: 10,
    title: 32,
    subtitle: 16,
    body: 13,
    small: 11
  }),
  radius: Object.freeze({
    card: 10,
    pill: 14
  })
});
