import { useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            }

            if (defaultValue !== undefined) {
                window.localStorage.setItem(key, JSON.stringify(defaultValue));
            }
            return defaultValue;
        } catch (err: unknown) {
            console.log("failed to read localStorage", err);
            return defaultValue;
        }
    });

    const setValue = (newValue: T) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(newValue));
        } catch (err) {
            console.log("failed to set localStorage:", err);
        }
        setStoredValue(newValue);
    };

    const clearValue = () => {
        setStoredValue(defaultValue);
        window.localStorage.removeItem(key);
    };

    return { storedValue, setValue, clearValue };
}
