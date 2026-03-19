import { render, screen } from "@testing-library/react";
import Typography from "../typography";

describe("Typography", () => {
  it("renders text content", () => {
    render(<Typography variant="textPreset1">Hello World</Typography>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies correct variant class for textPreset1", () => {
    render(<Typography variant="textPreset1">Hero Text</Typography>);
    const element = screen.getByText("Hero Text");
    expect(element).toHaveClass("text-hero");
  });

  it("applies correct variant class for textPreset2", () => {
    render(<Typography variant="textPreset2">Display Text</Typography>);
    const element = screen.getByText("Display Text");
    expect(element).toHaveClass("text-display");
  });

  it("applies correct variant class for textPreset3", () => {
    render(<Typography variant="textPreset3">H1 Text</Typography>);
    const element = screen.getByText("H1 Text");
    expect(element).toHaveClass("text-h1");
  });

  it("applies correct variant class for textPreset4", () => {
    render(<Typography variant="textPreset4">H2 Text</Typography>);
    const element = screen.getByText("H2 Text");
    expect(element).toHaveClass("text-h2");
  });

  it("applies correct variant class for textPreset5", () => {
    render(<Typography variant="textPreset5">Body Large</Typography>);
    const element = screen.getByText("Body Large");
    expect(element).toHaveClass("text-body-lg");
  });

  it("applies correct variant class for textPreset6", () => {
    render(<Typography variant="textPreset6">Body Text</Typography>);
    const element = screen.getByText("Body Text");
    expect(element).toHaveClass("text-body");
  });

  it("applies correct variant class for textPreset7", () => {
    render(<Typography variant="textPreset7">Small Text</Typography>);
    const element = screen.getByText("Small Text");
    expect(element).toHaveClass("text-small");
  });

  it("applies correct variant class for textPreset8", () => {
    render(<Typography variant="textPreset8">Caption</Typography>);
    const element = screen.getByText("Caption");
    expect(element).toHaveClass("text-caption");
  });

  it("applies custom className alongside variant class", () => {
    render(
      <Typography variant="textPreset1" className="custom-class">
        Custom Text
      </Typography>,
    );
    const element = screen.getByText("Custom Text");
    expect(element).toHaveClass("text-hero", "custom-class");
  });

  it("renders children correctly", () => {
    render(
      <Typography variant="textPreset1">
        <span>Nested content</span>
      </Typography>,
    );
    expect(screen.getByText("Nested content")).toBeInTheDocument();
  });
});
