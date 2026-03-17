"use client";
// This hook is responsible for getting the user's geolocation coordinates (latitude and longitude) using the browser's Geolocation API. It manages the state of the coordinates, loading status, and any potential errors that may occur during the geolocation retrieval process.
import { useEffect, useState } from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export function useGeolocation() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError("Permission denied");
        // TODO:UI Fallback when user denies geolocation permission
        setLoading(false);
      },
    );
  }, []);

  return { coords, loading, error };
}
