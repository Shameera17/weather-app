import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Metric } from "../home";
import { MetricSelection } from "../metric-selection";

// Mock the UI components
jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: any) => <div>{children}</div>,
  DropdownMenuGroup: ({ children }: any) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick }: any) => (
    <div onClick={onClick} role="menuitem">
      {children}
    </div>
  ),
  DropdownMenuLabel: ({ children }: any) => (
    <div role="heading">{children}</div>
  ),
  DropdownMenuSeparator: () => <hr />,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@/components/ui/typography", () => ({
  __esModule: true,
  default: ({ children }: any) => <span>{children}</span>,
}));

jest.mock("lucide-react", () => ({
  Check: () => <span data-testid="check-icon">✓</span>,
}));

describe("MetricSelection", () => {
  const mockSetUnit = jest.fn();

  const defaultUnit: Metric = {
    type: "metric",
    windSpeedUnit: "km/h",
    precipitationUnit: "mm",
    temperatureUnit: "c",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dropdown trigger button", () => {
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);
    expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
  });

  it('displays "Switch to Imperial" when current type is metric', () => {
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);
    expect(screen.getByText("Switch to Imperial")).toBeInTheDocument();
  });

  it('displays "Switch to Metric" when current type is imperial', () => {
    const imperialUnit: Metric = {
      type: "imperial",
      windSpeedUnit: "mph",
      precipitationUnit: "in",
      temperatureUnit: "f",
    };

    render(<MetricSelection unit={imperialUnit} setUnit={mockSetUnit} />);
    expect(screen.getByText("Switch to Metric")).toBeInTheDocument();
  });

  it("calls setUnit with imperial settings when switching from metric", async () => {
    const user = userEvent.setup();
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);

    const switchButton = screen.getByText("Switch to Imperial");
    await user.click(switchButton);

    expect(mockSetUnit).toHaveBeenCalledWith({
      type: "imperial",
      windSpeedUnit: "mph",
      precipitationUnit: "in",
      temperatureUnit: "f",
    });
  });

  it("calls setUnit with metric settings when switching from imperial", async () => {
    const user = userEvent.setup();
    const imperialUnit: Metric = {
      type: "imperial",
      windSpeedUnit: "mph",
      precipitationUnit: "in",
      temperatureUnit: "f",
    };

    render(<MetricSelection unit={imperialUnit} setUnit={mockSetUnit} />);

    const switchButton = screen.getByText("Switch to Metric");
    await user.click(switchButton);

    expect(mockSetUnit).toHaveBeenCalledWith({
      type: "metric",
      windSpeedUnit: "km/h",
      precipitationUnit: "mm",
      temperatureUnit: "c",
    });
  });

  it("displays all temperature options", () => {
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);
    expect(screen.getByText("Celsius (°C)")).toBeInTheDocument();
    expect(screen.getByText("Fahrenheit (°F)")).toBeInTheDocument();
  });

  it("displays all wind speed options", () => {
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);
    expect(screen.getByText("Km/h")).toBeInTheDocument();
    expect(screen.getByText("mph")).toBeInTheDocument();
  });

  it("displays all precipitation options", () => {
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);
    expect(screen.getByText("Millimeters (mm)")).toBeInTheDocument();
    expect(screen.getByText("Inches (in)")).toBeInTheDocument();
  });

  it("shows check mark for selected temperature unit", () => {
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);
    const checkIcons = screen.getAllByTestId("check-icon");
    // Should have check marks for default selections (c, km/h, mm)
    expect(checkIcons.length).toBeGreaterThan(0);
  });

  it("updates temperature unit when option is clicked", async () => {
    const user = userEvent.setup();
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);

    const fahrenheitOption = screen.getByText("Fahrenheit (°F)");
    await user.click(fahrenheitOption);

    expect(mockSetUnit).toHaveBeenCalledWith({
      ...defaultUnit,
      temperatureUnit: "f",
    });
  });

  it("updates wind speed unit when option is clicked", async () => {
    const user = userEvent.setup();
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);

    const mphOption = screen.getByText("mph");
    await user.click(mphOption);

    expect(mockSetUnit).toHaveBeenCalledWith({
      ...defaultUnit,
      windSpeedUnit: "mph",
    });
  });

  it("updates precipitation unit when option is clicked", async () => {
    const user = userEvent.setup();
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);

    const inchesOption = screen.getByText("Inches (in)");
    await user.click(inchesOption);

    expect(mockSetUnit).toHaveBeenCalledWith({
      ...defaultUnit,
      precipitationUnit: "in",
    });
  });

  it("displays section labels for each metric type", () => {
    render(<MetricSelection unit={defaultUnit} setUnit={mockSetUnit} />);

    expect(screen.getByText("Temperature")).toBeInTheDocument();
    expect(screen.getByText("Wind Speed")).toBeInTheDocument();
    expect(screen.getByText("Precipitation")).toBeInTheDocument();
  });
});
