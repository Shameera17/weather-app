import { render, screen } from "@testing-library/react";
import Icon from "../icon";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe("Icon", () => {
  it("renders icon with default size", () => {
    render(<Icon name="sun" />);
    const icon = screen.getByAltText("sun");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("width", "24");
    expect(icon).toHaveAttribute("height", "24");
  });

  it("uses icon name to build src path", () => {
    render(<Icon name="cloud" />);
    const icon = screen.getByAltText("cloud");
    expect(icon).toHaveAttribute("src", "/icons/cloud.svg");
  });

  it("accepts custom src", () => {
    render(<Icon src="/custom/path.svg" name="custom" />);
    const icon = screen.getByAltText("custom");
    expect(icon).toHaveAttribute("src", "/custom/path.svg");
  });

  it("renders with custom size as number", () => {
    render(<Icon name="rain" size={48} />);
    const icon = screen.getByAltText("rain");
    expect(icon).toHaveAttribute("width", "48");
    expect(icon).toHaveAttribute("height", "48");
  });

  it("renders with custom size as object", () => {
    render(<Icon name="snow" size={{ width: 32, height: 64 }} />);
    const icon = screen.getByAltText("snow");
    expect(icon).toHaveAttribute("width", "32");
    expect(icon).toHaveAttribute("height", "64");
  });

  it("uses custom alt text", () => {
    render(<Icon name="wind" alt="Wind icon" />);
    expect(screen.getByAltText("Wind icon")).toBeInTheDocument();
  });

  it("falls back to name for alt text", () => {
    render(<Icon name="thunder" />);
    expect(screen.getByAltText("thunder")).toBeInTheDocument();
  });

  it('uses "icon" as fallback alt text when no name', () => {
    render(<Icon src="/test.svg" />);
    expect(screen.getByAltText("icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Icon name="fog" className="custom-icon-class" />);
    const icon = screen.getByAltText("fog");
    expect(icon).toHaveClass("custom-icon-class");
  });
});
