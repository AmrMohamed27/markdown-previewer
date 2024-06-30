import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  // State variable for the localStorage value
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (!value) {
        localStorage.setItem(key, JSON.stringify(initialValue));
      }
      //   if value is present in local storage return it, else return initial value
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // this method update our localStorage and our state
  const setValue = (valueOrFn) => {
    const newValue =
      typeof valueOrFn === "function"
        ? valueOrFn(localStorageValue)
        : valueOrFn;
    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setValue];
};

export default useLocalStorage;
