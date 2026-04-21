import { render, screen } from "@testing-library/react";
import Icon from "../icon";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,

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
    const wrapper = icon.parentElement;
    expect(wrapper).toHaveClass("custom-icon-class");
  });
});
