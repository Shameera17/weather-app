import { render, screen } from "@testing-library/react";
import { HomePage } from "../home";

// Mock the hooks
jest.mock("@/hooks/useGeoLocation", () => ({
  useGeolocation: jest.fn(),
}));

jest.mock("@/hooks/useWeather", () => ({
  useWeather: jest.fn(),
}));

// Mock child components
jest.mock("../metric-selection", () => ({
  MetricSelection: ({ unit, setUnit }: any) => (
    <div data-testid="metric-selection">Metric Selection - {unit.type}</div>
  ),
}));

jest.mock("@/components/ui/search-bar", () => ({
  SearchBar: () => <div data-testid="search-bar">Search Bar</div>,
}));

jest.mock("@/components/ui/icon", () => ({
  __esModule: true,
  default: ({ src, size }: any) => <div data-testid="icon">{src}</div>,
}));

jest.mock("@/components/ui/typography", () => ({
  __esModule: true,
  default: ({ children, variant }: any) => (
    <div data-testid={`typography-${variant}`}>{children}</div>
  ),
}));

jest.mock("@/lib/assets", () => ({
  images: {
    logo: "/logo.svg",
  },
}));

import { useGeolocation } from "@/hooks/useGeoLocation";
import { useWeather } from "@/hooks/useWeather";

const mockUseGeolocation = useGeolocation as jest.MockedFunction<
  typeof useGeolocation
>;
const mockUseWeather = useWeather as jest.MockedFunction<typeof useWeather>;

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state when geolocation is loading", () => {
    mockUseGeolocation.mockReturnValue({
      coords: null,
      loading: true,
      error: null,
    });
    mockUseWeather.mockReturnValue({
      weather: undefined,
      isLoading: false,
      isError: null,
    });

    render(<HomePage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows loading state when weather data is loading", () => {
    mockUseGeolocation.mockReturnValue({
      coords: { latitude: 51.5074, longitude: -0.1278 },
      loading: false,
      error: null,
    });
    mockUseWeather.mockReturnValue({
      weather: undefined,
      isLoading: true,
      isError: null,
    });

    render(<HomePage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state when geolocation fails", () => {
    mockUseGeolocation.mockReturnValue({
      coords: null,
      loading: false,
      error: "Permission denied",
    });
    mockUseWeather.mockReturnValue({
      weather: undefined,
      isLoading: false,
      isError: null,
    });

    render(<HomePage />);
    expect(screen.getByText("Error: Permission denied")).toBeInTheDocument();
  });

  it("shows error state when weather fetch fails", () => {
    mockUseGeolocation.mockReturnValue({
      coords: { latitude: 51.5074, longitude: -0.1278 },
      loading: false,
      error: null,
    });
    mockUseWeather.mockReturnValue({
      weather: undefined,
      isLoading: false,
      isError: new Error("Failed to fetch"),
    });

    render(<HomePage />);
    expect(
      screen.getByText("Error: Failed to fetch weather data"),
    ).toBeInTheDocument();
  });

  it("renders all sections when data is loaded successfully", () => {
    mockUseGeolocation.mockReturnValue({
      coords: { latitude: 51.5074, longitude: -0.1278 },
      loading: false,
      error: null,
    });
    mockUseWeather.mockReturnValue({
      weather: {
        location: "London",
        temperature: 20,
      } as any,
      isLoading: false,
      isError: null,
    });

    render(<HomePage />);

    // Check for logo
    expect(screen.getByTestId("icon")).toBeInTheDocument();

    // Check for metric selection
    expect(screen.getByTestId("metric-selection")).toBeInTheDocument();

    // Check for hero text
    expect(
      screen.getByText("How’s the sky looking today?"),
    ).toBeInTheDocument();

    // Check for search bar
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it("calls useWeather with correct coordinates and unit type", () => {
    const coords = { latitude: 40.7128, longitude: -74.006 };

    mockUseGeolocation.mockReturnValue({
      coords,
      loading: false,
      error: null,
    });
    mockUseWeather.mockReturnValue({
      weather: {} as any,
      isLoading: false,
      isError: null,
    });

    render(<HomePage />);

    expect(mockUseWeather).toHaveBeenCalledWith(
      coords.latitude,
      coords.longitude,
      "metric",
    );
  });

  it("initializes with metric units", () => {
    mockUseGeolocation.mockReturnValue({
      coords: { latitude: 51.5074, longitude: -0.1278 },
      loading: false,
      error: null,
    });
    mockUseWeather.mockReturnValue({
      weather: {} as any,
      isLoading: false,
      isError: null,
    });

    render(<HomePage />);

    expect(screen.getByText(/Metric Selection - metric/)).toBeInTheDocument();
  });
});
