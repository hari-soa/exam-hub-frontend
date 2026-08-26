import { useEffect, useState } from 'react';
import api from '../api/axiosClient';

export default function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    let mounted = true;
    setLoading(true);
    api
      .get(url)
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps.length ? deps : [url]);

  return { data, loading, error };
}
