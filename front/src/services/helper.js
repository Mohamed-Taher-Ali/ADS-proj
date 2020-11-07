import {useState} from "react"

export const getDateTimeFromIso = (iso) => {
    let date = new Date(iso);

    date = date.getFullYear() + '-' +
        (date.getMonth() + 1) +
        '-' + date.getDate();

    let time = iso.match(/\d\d:\d\d/)

    return {
        date,
        time
    }
}

export const countries = [
    "Egypt",
    "Algeria",
    "Sudan",
    "Iraq",
    "Morocco",
    "Saudi",
    "Yemen",
    "Syria",
    "Tunisia",
    "Jordan",
    "United",
    "Lebanon",
    "Djibouti",
    "Comoro",
]

export const parseParams = (params = "") => {
  const rawParams = params.replace("?", "").split("&");
  const extractedParams = {};
  rawParams.forEach((item) => {
    item = item.split("=");
    extractedParams[item[0]] = item[1];
  });
  return extractedParams;
};


export const useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
  
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
  
    return [storedValue, setValue];
  }