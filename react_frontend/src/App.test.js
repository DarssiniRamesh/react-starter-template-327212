import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders deck top bar title", () => {
  render(<App />);
  expect(screen.getByText(/SVG Klefki Deck/i)).toBeInTheDocument();
});
