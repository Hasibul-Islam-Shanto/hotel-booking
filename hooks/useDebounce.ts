import { useEffect, useState } from "react";

const useDebounce = (value: string, delay = 400) => {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);
  return debounceValue;
};

export default useDebounce;
