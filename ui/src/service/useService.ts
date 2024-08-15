import { useEffect, useState } from "react";

export function useService<T>(service: () => Promise<T>) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!service) return;

    async function execute() {
      try {
        const result = await service();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }

    execute();
  }, [service]);

  return {
    loading,
    error,
    data,
  };
}
