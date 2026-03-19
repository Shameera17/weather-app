import { render, screen } from "@testing-library/react";
import { Card } from "../card";

describe("Card", () => {
  it("renders card component", () => {
    render(<Card />);
    expect(screen.getByText("Card")).toBeInTheDocument();
  });
});
