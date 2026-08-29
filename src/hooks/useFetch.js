import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";

export default function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  const fetchData = useCallback(async () => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formattedEndpoint = endpoint.startsWith("/")
        ? endpoint
        : `/${endpoint}`;

      const response = await api.get(formattedEndpoint);
      setData(response.data);
    } catch (err) {
      if (err.response?.status === 401 && typeof logout === "function") {
        logout();
      }

      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [endpoint, logout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
