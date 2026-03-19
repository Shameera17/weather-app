import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../input";

describe("Input", () => {
  it("renders input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText("Enter text");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });

  it("can be disabled", () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText("Disabled input");
    expect(input).toBeDisabled();
  });

  it("accepts different input types", () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute(
      "type",
      "email",
    );

    rerender(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" placeholder="Styled input" />);
    const input = screen.getByPlaceholderText("Styled input");
    expect(input).toHaveClass("custom-class");
  });
});
