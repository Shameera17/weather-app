import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../search-bar";

describe("SearchBar", () => {
  it("renders search input and button", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("uses custom placeholder text", () => {
    render(<SearchBar placeholder="Find location..." />);
    expect(screen.getByPlaceholderText("Find location...")).toBeInTheDocument();
  });

  it("uses custom button text", () => {
    render(<SearchBar buttonText="Find" />);
    expect(screen.getByRole("button", { name: /find/i })).toBeInTheDocument();
  });

  it("calls onSearch when button is clicked", async () => {
    const handleSearch = jest.fn();
    const user = userEvent.setup();

    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText("Search...");
    const button = screen.getByRole("button");

    await user.type(input, "London");
    await user.click(button);

    expect(handleSearch).toHaveBeenCalledWith("London");
  });

  it("calls onSearch when Enter key is pressed", async () => {
    const handleSearch = jest.fn();
    const user = userEvent.setup();

    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "Paris");
    await user.keyboard("{Enter}");

    expect(handleSearch).toHaveBeenCalledWith("Paris");
  });

  it("updates input value as user types", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "New York");

    expect(input).toHaveValue("New York");
  });

  it("applies custom className", () => {
    const { container } = render(<SearchBar className="custom-search-bar" />);
    expect(container.firstChild).toHaveClass("custom-search-bar");
  });
});
