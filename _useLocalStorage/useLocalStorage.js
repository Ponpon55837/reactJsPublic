import { useState, useEffect, useCallback } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialValue);

  const setItem = newValue => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  const removeItem = () => {
    localStorage.removeItem(key);
    setValue(initialValue);
  };

  useEffect(() => {
    const newValue = window.localStorage.getItem(key);
    if (value !== newValue) {
      setValue(newValue || initialValue);
    }
  });

  const handleStorage = useCallback(
    event => {
      if (event.key === key && event.newValue !== value) {
        setValue(event.newValue || initialValue);
      }
      if (event.key === null) {
        setValue(localStorage.getItem(key) || initialValue);
      }
    },
    [value]
  );

  useEffect(() => {
    addEventListener('storage', handleStorage);
    return () => removeEventListener('storage', handleStorage);
  }, [handleStorage]);

  return [value, setItem, removeItem];
};

export default useLocalStorage;
