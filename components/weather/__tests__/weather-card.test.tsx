import { render, screen } from "@testing-library/react";
import WeatherCard from "../weather-card";

// Mock the hooks
jest.mock("@/hooks/useGeoLocation", () => ({
  useGeolocation: jest.fn(),
}));

jest.mock("@/hooks/useWeather", () => ({
  useWeather: jest.fn(),
}));

import { useGeolocation } from "@/hooks/useGeoLocation";
import { useWeather } from "@/hooks/useWeather";

const mockUseGeolocation = useGeolocation as jest.MockedFunction<
  typeof useGeolocation
>;
const mockUseWeather = useWeather as jest.MockedFunction<typeof useWeather>;

describe("WeatherCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Suppress console.log for cleaner test output
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders WeatherCard component", () => {
    mockUseGeolocation.mockReturnValue({
      coords: null,
      loading: false,
      error: null,
    });

    mockUseWeather.mockReturnValue({
      weather: undefined,
      isLoading: false,
      isError: null,
    });

    render(<WeatherCard />);
    expect(screen.getByText("WeatherCard")).toBeInTheDocument();
  });

  it("calls useGeolocation hook", () => {
    mockUseGeolocation.mockReturnValue({
      coords: { latitude: 51.5074, longitude: -0.1278 },
      loading: false,
      error: null,
    });

    mockUseWeather.mockReturnValue({
      weather: undefined,
      isLoading: false,
      isError: null,
    });

    render(<WeatherCard />);
    expect(mockUseGeolocation).toHaveBeenCalled();
  });

  it("calls useWeather with coordinates when available", () => {
    const coords = { latitude: 40.7128, longitude: -74.006 };

    mockUseGeolocation.mockReturnValue({
      coords,
      loading: false,
      error: null,
    });

    mockUseWeather.mockReturnValue({
      weather: undefined,
      isLoading: false,
      isError: null,
    });

    render(<WeatherCard />);

    expect(mockUseWeather).toHaveBeenCalledWith(
      coords.latitude,
      coords.longitude,
      "metric",
    );
  });

  it("calls useWeather with undefined when coords are null", () => {
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

    render(<WeatherCard />);

    expect(mockUseWeather).toHaveBeenCalledWith(undefined, undefined, "metric");
  });

  it("logs weather data and loading state to console", () => {
    const mockWeather = {
      location: "London",
      temperature: 20,
    };

    mockUseGeolocation.mockReturnValue({
      coords: { latitude: 51.5074, longitude: -0.1278 },
      loading: false,
      error: null,
    });

    mockUseWeather.mockReturnValue({
      weather: mockWeather as any,
      isLoading: false,
      isError: null,
    });

    render(<WeatherCard />);

    expect(console.log).toHaveBeenCalledWith(mockWeather, false);
  });

  it("handles loading state from geolocation", () => {
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

    render(<WeatherCard />);

    expect(console.log).toHaveBeenCalledWith(undefined, true);
  });
});
