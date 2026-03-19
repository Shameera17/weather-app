import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "../search-input";

describe("SearchInput", () => {
  it("renders search input with icon", () => {
    render(<SearchInput placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<SearchInput placeholder="Search..." />);

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "test query");

    expect(input).toHaveValue("test query");
  });

  it("can be disabled", () => {
    render(<SearchInput disabled placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<SearchInput className="test-class" placeholder="Search..." />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toHaveClass("test-class");
  });

  it("forwards onChange handler", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<SearchInput onChange={handleChange} placeholder="Search..." />);

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "test");

    expect(handleChange).toHaveBeenCalled();
  });
});
